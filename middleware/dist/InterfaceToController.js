"use strict";
/*! Author: Mai Khanh Isabelle Wilhelm */
Object.defineProperty(exports, "__esModule", { value: true });
const vda_5050_lib_1 = require("vda-5050-lib");
const currentState = {
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
    operatingMode: vda_5050_lib_1.OperatingMode.Manual,
    orderId: "",
    orderUpdateId: 0,
    safetyState: { eStop: vda_5050_lib_1.EStop.None, fieldViolation: false },
    serialNumber: "001",
    timestamp: "2022-04-15T11:40:03.12Z",
    version: "0.0.1"
};
const currentPosition = {};
const currentVelocity = {};
const middlewareClient = { manufacturer: "RobotCompany", serialNumber: "001" };
const agvClient = new vda_5050_lib_1.AgvClient(middlewareClient, { interfaceName: "middleware", transport: { brokerUrl: "mqtt://localhost:1883" } });
async function main() {
    await agvClient.start();
    await agvClient.subscribe(vda_5050_lib_1.Topic.Order, order => {
        console.log("Order object received: %o", order);
        agvClient.publish(vda_5050_lib_1.Topic.State, currentState);
    });
    await agvClient.subscribe(vda_5050_lib_1.Topic.InstantActions, instantActions => {
        console.log("InstantAction object received: %o", instantActions);
        agvClient.publish(vda_5050_lib_1.Topic.State, currentState);
    });
    setInterval(() => agvClient.publish(vda_5050_lib_1.Topic.State, currentState), 1000);
}
main();
//# sourceMappingURL=InterfaceToController.js.map