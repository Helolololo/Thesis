/* Created 07.10.2022 */
/*! Author: Mai Khanh Isabelle Wilhelm */

import { State, AgvPosition, Velocity, AgvClient, AgvId, Topic, OperatingMode, EStop, Headerless, Order, NodePosition, Action } from "vda-5050-lib";
import { InternalLanguageModel, Pos, Robot } from "./InternalLangageModel";

// Initialization of required state information
const currentState: State = {
    actionStates: [],
    batteryState: { batteryCharge: 0, charging: false },
    driving: false,
    edgeStates: [],
    errors: [],
    headerId: 0,
    lastNodeId: "",
    lastNodeSequenceId: 0,
    manufacturer: "mir",
    nodeStates: [],
    operatingMode: OperatingMode.Manual,
    orderId: "",
    orderUpdateId: 0,
    safetyState: { eStop: EStop.None, fieldViolation: false },
    serialNumber: "001",
    timestamp: "2022-10-11T11:40:03.12Z",
    version: "0.0.1"
};
const currentPosition = {} as AgvPosition;
const currentVelocity = {} as Velocity;

// The target AGV.
const middlewareClient: AgvId = { manufacturer: "mir", serialNumber: "001" };

// Create instance of AGV Client "001" with minimal options: communication namespace and broker endpoint address.
const agvClient = new AgvClient(middlewareClient, { interfaceName: "middleware", transport: { brokerUrl: "mqtt://localhost:1883" } });

// global variable to be acced by InternalLanguage model
const messageToLanguageModel = new InternalLanguageModel();

/**
 * FUNCTIONS
 */

function decodeOrderToMoveCommand(robot: Robot, startNode: NodePosition, nextNode: NodePosition, startNodeName: string, nextNodeName: string) {
    //console.log("-- decode Order to move command --");

    let moveCommand: boolean = false;
    let startPosition = new Pos;            // start position of the order sent to the internal language model  
    let endPosition = new Pos;              // end position of the order sent to the internal language model

    startPosition.name = startNodeName;
    endPosition.name = nextNodeName;

    //console.log(startNode);
    //console.log(nextNode);

    if (startPosition.name !== endPosition.name) {
        moveCommand = true;
    }

    // check whether start (first) node and next (second) node are defined
    if (startNode !== undefined && nextNode !== undefined) {

        // add start x/y coordinates and destination x/y coordinates into attributes of the position class for the internal language model
        startPosition.x = startNode.x;
        startPosition.y = startNode.y;
        endPosition.x = nextNode.x;
        endPosition.y = nextNode.y;

        // if position is defined, robot shall move when x-position or y-position changes
        if ((startNode.x !== nextNode.x) || (startNode.y !== nextNode.y)) {
            moveCommand = true;
        }

        // check whether start (first) theta and next (second) theta are defined
        if (startNode.theta !== undefined && nextNode.theta !== undefined) {
            // add start theta and destination theta into attributes of the position class for the internal language model
            startPosition.theta = startNode.theta;
            endPosition.theta = nextNode.theta;

            // if theta in position is defined, robot shall move when theta changes
            if (startNode.theta !== nextNode.theta) {
                moveCommand = true;
            }
        }
    }

    console.log("move command:");
    console.log(moveCommand);

    // if position is different, robot shall move
    if (moveCommand) {

        // send out move command     
        messageToLanguageModel.move(robot, endPosition, startPosition);
    }
}

function decodeOrderToOtherCommand(robot: Robot, otherCommands: Action[]) {

    //console.log("-- decode Order to other command --");

    // find out what action to perform (is in nodes which is an array of objects)
    if (otherCommands.length !== 0) {
        //console.log("Further actions to perform");

        while (otherCommands.length >= 1) {
            let command: Action = otherCommands[0];

            // DROP
            if (command.actionType === "drop") {
                decodeOrderToDropCommand(robot);
            }

            // PICK
            else if (command.actionType === "pick") {
                decodeOrderToPickCommand(robot);
            }

            // CHARGE
            else if (command.actionType === "startCharging" || command.actionType === "stopCharging") {
                decodeOrderToChargeCommand(robot);
            }

            // remove the first element of actions
            otherCommands = otherCommands.splice(1);
        }
    }
}

function decodeOrderToDropCommand(robot: Robot) {
    messageToLanguageModel.drop(robot);
}

function decodeOrderToPickCommand(robot: Robot) {
    messageToLanguageModel.pick(robot);
}

function decodeOrderToChargeCommand(robot: Robot) {
    messageToLanguageModel.charge(robot);
}

function decodeOrder(robot: Robot, order: Headerless<Order>) {
    /**
     * VDA 5050 Orders consist of nodes (positions) and edges (path connecting positions).
     * A VDA 5050 Order starts with the expected start position of the robot.
     * 
     * This order has to be decoded into commands the middleware understands:
     * - Nodes are positions the robots has to drive to and describe therefore, a move command
     * - Actions inside of the nodes describer any other command such as drop, pick and charge,...
     * 
     * It needs to be checked whether at the start position is another action command.
     * Then, it will be checked whether the next node's position changes (move command)
     * and whether, it includes an action (drop, pick and charge,... command).
     */
    let startNode: NodePosition;        // name first position startNode
    let nextNode: NodePosition;         // name second position nextNode
    let startNodeName: string;
    let nextNodeName: string;
    let otherCommands: Action[];

    console.log("-- decode Order --");

    // checks whether there is an action at the first node (start position) --> other command (drop, pick, charge command,...)?
    otherCommands = order.nodes[0].actions;
    decodeOrderToOtherCommand(robot, otherCommands);

    // loop through all nodes and actions
    while (order.nodes.length > 1) {

        startNode = order.nodes[0].nodePosition;
        nextNode = order.nodes[1].nodePosition;
        startNodeName = order.nodes[0].nodeId;
        nextNodeName = order.nodes[1].nodeId;
        otherCommands = order.nodes[1].actions;

        // check whether current node and the next node differ --> move command ?
        decodeOrderToMoveCommand(robot, startNode, nextNode, startNodeName, nextNodeName);

        // checks whether there is an action at the next node --> other command (drop, pick, charge command,...)?
        decodeOrderToOtherCommand(robot, otherCommands);

        // remove the first element of nodes and edges of the order
        order.nodes = order.nodes.splice(1);
        order.edges = order.edges.splice(1);

        console.log(order);
    }
}

async function main() {
    // Start client interaction, connect to MQTT broker.
    await agvClient.start();

    // SUB ORDER
    // Observe Order objects emitted by the Master Control Client.
    await agvClient.subscribe(Topic.Order, originalOrder => {
        console.log("Order object received: %o", originalOrder);

        let robot = new Robot(middlewareClient.manufacturer, middlewareClient.serialNumber);  // TODO maybe inside the loop?

        decodeOrder(robot, originalOrder);

        // Start order handling according to VDA 5050 specification and
        // report order state changes by publishing State objects.
        agvClient.publish(Topic.State, currentState);
    });

    // SUB INSTANT ACTIONS
    // Observe InstantActions objects emitted by the Master Control Client.
    await agvClient.subscribe(Topic.InstantActions, instantActions => {
        console.log("InstantAction object received: %o", instantActions);

        // Start order handling according to VDA 5050 specification and
        // report order state changes by publishing State objects.
        agvClient.publish(Topic.State, currentState);

        // CANCEL ORDER
    });

    // PUB STATE
    // Periodically publish state of AGV, even without changes
    setInterval(
        () => agvClient.publish(Topic.State, currentState),
        1000);      // 1 second, to increase later on

    // PUB VISUALIZATION
    /* // Periodically publish Visualization messages with AgvPosition and Velocity.
    setInterval(
        () => agvClient.publish(Topic.Visualization,
            { agvPosition: currentPosition, velocity: currentVelocity },
            { dropIfOffline: true }),
        1000); */

    // PUB CONNECTION
    // ?    
}

main();
