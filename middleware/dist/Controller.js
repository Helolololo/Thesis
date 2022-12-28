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
var mcClient = new vda_5050_lib_1.MasterControlClient({ interfaceName: "middleware", transport: { brokerUrl: "mqtt://localhost:1883" } });
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var middlewareClient, order, orderWithHeader, stateSubscriptionId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, mcClient.start()];
                case 1:
                    _a.sent();
                    middlewareClient = { manufacturer: "RobotCompany", serialNumber: "001" };
                    order = {
                        orderId: "order0001",
                        orderUpdateId: 0,
                        nodes: [
                            {
                                nodeId: "productionunit_1", sequenceId: 0, nodePosition: { mapId: "map_1", x: 5, y: 0, theta: 0 }, released: true, actions: [
                                    { actionId: "action_1", actionType: "startCharging", blockingType: vda_5050_lib_1.BlockingType.Hard },
                                    { actionId: "action_2", actionType: "stopCharging", blockingType: vda_5050_lib_1.BlockingType.Hard }
                                ]
                            },
                            { nodeId: "productionunit_1", sequenceId: 2, nodePosition: { mapId: "map_1", x: 5, y: 0, theta: 1.5 }, released: true, actions: [] },
                            {
                                nodeId: "productionunit_2", sequenceId: 4, released: true, actions: [
                                    { actionId: "action_3", actionType: "drop", blockingType: vda_5050_lib_1.BlockingType.Hard }
                                ]
                            }
                        ],
                        edges: [{ edgeId: "edge1_1", sequenceId: 1, startNodeId: "productionunit_1", endNodeId: "productionunit_1", released: true, actions: [] },
                            { edgeId: "edge1_2", sequenceId: 3, startNodeId: "productionunit_1", endNodeId: "productionunit_2", released: true, actions: [] }]
                    };
                    return [4, mcClient.publish(vda_5050_lib_1.Topic.Order, middlewareClient, order)];
                case 2:
                    orderWithHeader = _a.sent();
                    console.log("Published order %o", orderWithHeader);
                    return [4, mcClient.subscribe(vda_5050_lib_1.Topic.State, middlewareClient, function (state) {
                            console.log("State object received: %o", state);
                        })];
                case 3:
                    stateSubscriptionId = _a.sent();
                    mcClient.trackAgvs(function (agvId, connectionState, timestamp) { return console.log("AGV %o changed connection state to %s at %d", agvId, connectionState, timestamp); });
                    return [2];
            }
        });
    });
}
main();
//# sourceMappingURL=Controller.js.map