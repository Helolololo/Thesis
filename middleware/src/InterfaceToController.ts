/* Created 07.10.2022 */
/*! Author: Mai Khanh Isabelle Wilhelm */

import { State, AgvPosition, Velocity, AgvClient, AgvId, Topic, OperatingMode, EStop, Headerless, Order } from "vda-5050-lib";
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
    manufacturer: "RobotCompany",
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
const middlewareClient: AgvId = { manufacturer: "RobotCompany", serialNumber: "001" };

// Create instance of AGV Client "001" with minimal options: communication namespace and broker endpoint address.
const agvClient = new AgvClient(middlewareClient, { interfaceName: "middleware", transport: { brokerUrl: "mqtt://localhost:1883" } });

// global variable to be acced by InternalLanguage model
const messageToLanguageModel = new InternalLanguageModel();

async function main() {
    // Start client interaction, connect to MQTT broker.
    await agvClient.start();

    // SUB ORDER
    // Observe Order objects emitted by the Master Control Client.
    await agvClient.subscribe(Topic.Order, originalOrder => {
        console.log("Order object received: %o", originalOrder);

        let order: Headerless<Order> = originalOrder;       // copy the original order in another array

        let robot = new Robot(middlewareClient.manufacturer, middlewareClient.serialNumber);  // TODO maybe inside the loop?
        // find out whether it is move action
        let moveExpression: boolean = true;

        while (order.nodes.length > 1) {
            let startPosition = new Pos;
            let endPosition = new Pos;

            // if theta in position is defined, robot shall move when theta changes
            if (order.nodes[0].nodePosition !== undefined && order.nodes[1].nodePosition !== undefined) {
                // add start x/y coordinates and destination x/y coordinates into attributes of the position class for the internal language model
                // TODO change node[0] and [1] to firstNode and nextNode
                startPosition.x = order.nodes[0].nodePosition.x;
                startPosition.y = order.nodes[0].nodePosition.y;
                endPosition.x = order.nodes[1].nodePosition.x;
                endPosition.y = order.nodes[1].nodePosition.y;

                if (order.nodes[0].nodePosition.theta !== undefined && order.nodes[1].nodePosition.theta !== undefined) {
                    // add start theta and destination theta into attributes of the position class for the internal language model
                    startPosition.theta = order.nodes[0].nodePosition.theta;
                    endPosition.theta = order.nodes[1].nodePosition.theta;

                    if (order.nodes[0].nodePosition.theta === order.nodes[1].nodePosition.theta) {
                        moveExpression = false;
                    }
                }

                // if position is defined, robot shall move when x-position or y-position changes
                if (!((order.nodes[0].nodePosition.x === order.nodes[1].nodePosition.x) ||
                    !(order.nodes[0].nodePosition.y === order.nodes[1].nodePosition.y))) {
                    moveExpression = true;
                }

                else {
                    moveExpression = false;
                }
            }

            // if position changes, robot shall move
            if (!(order.nodes[0].nodeId === order.nodes[1].nodeId) && moveExpression) {
                startPosition.name = order.nodes[0].nodeId;
                endPosition.name = order.nodes[1].nodeId;

                // send out move command     
                messageToLanguageModel.move(robot, endPosition, startPosition);
            }

            // remove the first element of nodes and edges of the order
            order.nodes = order.nodes.splice(1);
            order.edges = order.edges.splice(1);

            console.log(order);

            // find out what action to perform (is in nodes which is an array of objects)
            if (!(order.nodes[0].actions.length === 0)) {
                console.log("Further actions to perform");

                while (order.nodes[0].actions.length >= 1) {
                    // DROP
                    if (order.nodes[0].actions[0].actionType === "drop") {
                        messageToLanguageModel.drop(robot);
                    }

                    // PICK
                    else if (order.nodes[0].actions[0].actionType === "pick") {
                        messageToLanguageModel.drop(robot);
                    }

                    // CHARGE
                    else if (order.nodes[0].actions[0].actionType === "startCharging" ||
                        order.nodes[0].actions[0].actionType === "stopCharging") {
                        messageToLanguageModel.charge(robot);
                    }
                    // remove the first element of nodes and edges of the order
                    order.nodes[0].actions = order.nodes[0].actions.splice(1);
                }
            } // TODO is that in the correct order of the queue? and is the order spliced out correctly before and after? what if move and drop action together
        }





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
