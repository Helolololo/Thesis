/* Created 07.10.2022 */
/*! Author: Mai Khanh Isabelle Wilhelm */

import { State, AgvPosition, Velocity, AgvClient, AgvId, Topic, OperatingMode, EStop } from "vda-5050-lib";
import { InternalLanguageModel } from "./InternalLangageModel";

// Initialization of required state information
const currentState: State = {
    actionStates: [],
    batteryState: {batteryCharge: 0, charging: false},
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
    safetyState: {eStop: EStop.None, fieldViolation: false},
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
    await agvClient.subscribe(Topic.Order, order => {
        console.log("Order object received: %o", order);

        messageToLanguageModel.processOrder(order);

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
