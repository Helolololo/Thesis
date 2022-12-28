"use strict";
/*! Author: Mai Khanh Isabelle Wilhelm */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var vda_5050_lib_1 = require("vda-5050-lib");
var InternalLangageModel_1 = require("./InternalLangageModel");
var currentState = {
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
var currentPosition = {};
var currentVelocity = {};
var middlewareClient = { manufacturer: "RobotCompany", serialNumber: "001" };
var agvClient = new vda_5050_lib_1.AgvClient(middlewareClient, { interfaceName: "middleware", transport: { brokerUrl: "mqtt://localhost:1883" } });
var messageToLanguageModel = new InternalLangageModel_1.InternalLanguageModel();
function decodeOrderToMoveCommand(robot, startNode, nextNode, startNodeName, nextNodeName) {
    console.log("-- decode Order to move command --");
    var moveCommand = false;
    var startPosition = new InternalLangageModel_1.Pos;
    var endPosition = new InternalLangageModel_1.Pos;
    startPosition.name = startNodeName;
    endPosition.name = nextNodeName;
    console.log(startNode);
    console.log(nextNode);
    if (startPosition.name !== endPosition.name) {
        moveCommand = true;
    }
    if (startNode !== undefined && nextNode !== undefined) {
        startPosition.x = startNode.x;
        startPosition.y = startNode.y;
        endPosition.x = nextNode.x;
        endPosition.y = nextNode.y;
        if ((startNode.x !== nextNode.x) || (startNode.y !== nextNode.y)) {
            moveCommand = true;
        }
        if (startNode.theta !== undefined && nextNode.theta !== undefined) {
            startPosition.theta = startNode.theta;
            endPosition.theta = nextNode.theta;
            if (startNode.theta !== nextNode.theta) {
                moveCommand = true;
            }
        }
    }
    console.log("move command:");
    console.log(moveCommand);
    if (moveCommand) {
        messageToLanguageModel.move(robot, endPosition, startPosition);
    }
}
function decodeOrderToOtherCommand(robot, otherCommands) {
    console.log("-- decode Order to other command --");
    if (otherCommands.length !== 0) {
        console.log("Further actions to perform");
        while (otherCommands.length >= 1) {
            var command = otherCommands[0];
            if (command.actionType === "drop") {
                decodeOrderToDropCommand(robot);
            }
            else if (command.actionType === "pick") {
                decodeOrderToPickCommand(robot);
            }
            else if (command.actionType === "startCharging" || command.actionType === "stopCharging") {
                decodeOrderToChargeCommand(robot);
            }
            otherCommands = otherCommands.splice(1);
        }
    }
}
function decodeOrderToDropCommand(robot) {
    messageToLanguageModel.drop(robot);
}
function decodeOrderToPickCommand(robot) {
    messageToLanguageModel.pick(robot);
}
function decodeOrderToChargeCommand(robot) {
    messageToLanguageModel.charge(robot);
}
function decodeOrder(robot, order) {
    var startNode;
    var nextNode;
    var startNodeName;
    var nextNodeName;
    var otherCommands;
    console.log("-- decode Order --");
    otherCommands = order.nodes[0].actions;
    decodeOrderToOtherCommand(robot, otherCommands);
    while (order.nodes.length > 1) {
        startNode = order.nodes[0].nodePosition;
        nextNode = order.nodes[1].nodePosition;
        startNodeName = order.nodes[0].nodeId;
        nextNodeName = order.nodes[1].nodeId;
        otherCommands = order.nodes[1].actions;
        decodeOrderToMoveCommand(robot, startNode, nextNode, startNodeName, nextNodeName);
        decodeOrderToOtherCommand(robot, otherCommands);
        order.nodes = order.nodes.splice(1);
        order.edges = order.edges.splice(1);
        console.log(order);
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, agvClient.start()];
                case 1:
                    _a.sent();
                    return [4, agvClient.subscribe(vda_5050_lib_1.Topic.Order, function (originalOrder) {
                            console.log("Order object received: %o", originalOrder);
                            var robot = new InternalLangageModel_1.Robot(middlewareClient.manufacturer, middlewareClient.serialNumber);
                            decodeOrder(robot, originalOrder);
                            agvClient.publish(vda_5050_lib_1.Topic.State, currentState);
                        })];
                case 2:
                    _a.sent();
                    return [4, agvClient.subscribe(vda_5050_lib_1.Topic.InstantActions, function (instantActions) {
                            console.log("InstantAction object received: %o", instantActions);
                            agvClient.publish(vda_5050_lib_1.Topic.State, currentState);
                        })];
                case 3:
                    _a.sent();
                    setInterval(function () { return agvClient.publish(vda_5050_lib_1.Topic.State, currentState); }, 1000);
                    return [2];
            }
        });
    });
}
main();
//# sourceMappingURL=InterfaceToController.js.map