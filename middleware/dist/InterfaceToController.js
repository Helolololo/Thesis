"use strict";
/*! Author: Mai Khanh Isabelle Wilhelm */
Object.defineProperty(exports, "__esModule", { value: true });
const vda_5050_lib_1 = require("vda-5050-lib");
const InternalLangageModel_1 = require("./InternalLangageModel");
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
    timestamp: "2022-10-11T11:40:03.12Z",
    version: "0.0.1"
};
const currentPosition = {};
const currentVelocity = {};
const middlewareClient = { manufacturer: "RobotCompany", serialNumber: "001" };
const agvClient = new vda_5050_lib_1.AgvClient(middlewareClient, { interfaceName: "middleware", transport: { brokerUrl: "mqtt://localhost:1883" } });
const messageToLanguageModel = new InternalLangageModel_1.InternalLanguageModel();
async function main() {
    await agvClient.start();
    await agvClient.subscribe(vda_5050_lib_1.Topic.Order, originalOrder => {
        console.log("Order object received: %o", originalOrder);
        let order = originalOrder;
        let startPosition = new InternalLangageModel_1.Pos;
        let endPosition = new InternalLangageModel_1.Pos;
        let robot = new InternalLangageModel_1.Robot;
        robot.manufacturer = middlewareClient.manufacturer;
        robot.robotId = middlewareClient.serialNumber;
        let moveExpression = true;
        while (order.nodes.length > 1) {
            if (order.nodes[0].nodePosition !== undefined && order.nodes[1].nodePosition !== undefined) {
                startPosition.x = order.nodes[0].nodePosition.x;
                startPosition.y = order.nodes[0].nodePosition.y;
                endPosition.x = order.nodes[1].nodePosition.x;
                endPosition.y = order.nodes[1].nodePosition.y;
                if (order.nodes[0].nodePosition.theta !== undefined && order.nodes[1].nodePosition.theta !== undefined) {
                    startPosition.theta = order.nodes[0].nodePosition.theta;
                    endPosition.theta = order.nodes[1].nodePosition.theta;
                    if (order.nodes[0].nodePosition.theta === order.nodes[1].nodePosition.theta) {
                        moveExpression = false;
                    }
                }
                if (!((order.nodes[0].nodePosition.x === order.nodes[1].nodePosition.x) ||
                    !(order.nodes[0].nodePosition.y === order.nodes[1].nodePosition.y))) {
                    moveExpression = true;
                }
                else {
                    moveExpression = false;
                }
            }
            if (!(order.nodes[0].nodeId === order.nodes[1].nodeId) && moveExpression) {
                startPosition.name = order.nodes[0].nodeId;
                endPosition.name = order.nodes[1].nodeId;
                messageToLanguageModel.move(robot, endPosition, startPosition);
            }
            order.nodes = order.nodes.splice(1);
            order.edges = order.edges.splice(1);
            console.log(order);
            if (!(order.nodes[0].actions.length === 0)) {
                console.log("Further actions to perform");
                while (order.nodes[0].actions.length >= 1) {
                    if (order.nodes[0].actions[0].actionType === "drop") {
                        messageToLanguageModel.drop(robot);
                    }
                    else if (order.nodes[0].actions[0].actionType === "pick") {
                        messageToLanguageModel.drop(robot);
                    }
                    else if (order.nodes[0].actions[0].actionType === "startCharging" ||
                        order.nodes[0].actions[0].actionType === "stopCharging") {
                        messageToLanguageModel.charge(robot);
                    }
                    order.nodes[0].actions = order.nodes[0].actions.splice(1);
                }
            }
        }
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