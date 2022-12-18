"use strict";
/* Created 12.10.2022 */
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var mir_rest_calls_1 = require("./mir-rest-calls");
/* Istantiation of the Mir 100 Client */
var agvMir = new mir_rest_calls_1.Mir100Client('Basic YWRtaW46OGM2OTc2ZTViNTQxMDQxNWJkZTkwOGJkNGRlZTE1ZGZiMTY3YTljODczZmM0YmI4YTgxZjZmMmFiNDQ4YTkxOA==');
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var postMessage, missionMessage, missionid, positionid, actionMessage, queueMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ;
                    return [4 /*yield*/, agvMir.postPositions({
                            "map_id": "f4edbba0-7846-11ec-a1cf-94c691a3e2dc",
                            "name": "test position",
                            "orientation": -93.04766082763672,
                            "pos_x": 7.45,
                            "pos_y": 7.9,
                            "type_id": 0
                        })];
                case 1:
                    postMessage = _a.sent();
                    // get position id
                    console.log("[newPosition] OK!");
                    console.log(postMessage);
                    console.log(postMessage["guid"]);
                    return [4 /*yield*/, agvMir.postMissions({
                            "group_id": "mirconst-guid-0000-0001-missiongroup",
                            "name": "Move test"
                        })];
                case 2:
                    missionMessage = _a.sent();
                    console.log("[newMission] OK!");
                    console.log(missionMessage);
                    console.log(missionMessage["guid"]);
                    missionid = missionMessage["guid"];
                    positionid = postMessage["guid"];
                    return [4 /*yield*/, agvMir.postMissionsActions(missionid, {
                            action_type: "move",
                            mission_id: missionid,
                            parameters: [
                                {
                                    id: "position",
                                    guid: positionid
                                },
                                {
                                    id: "retries",
                                    value: 10
                                },
                                {
                                    id: "max_linear_speed",
                                    value: 0.15
                                }
                            ],
                            priority: 1
                        })];
                case 3:
                    actionMessage = _a.sent();
                    return [4 /*yield*/, agvMir.postMission_queue({ mission_id: missionid })];
                case 4:
                    queueMessage = _a.sent();
                    console.log(queueMessage);
                    return [2 /*return*/];
            }
        });
    });
}
main();
/*

     * POST /positions
     * Add new position
     * Required properties of the body: map_id, name, orientation, pos_x, pos_y, type_id
     
 public async postPositions(body: Object) {
    this.assert(!(this.hasProperty("map_id", body)), "Parameter map_id is required for REST API CALL postPositions");
    this.assert(!(this.hasProperty("name", body)), "Parameter name is required for REST API CALL postPositions");
    this.assert(!(this.hasProperty("orientation", body)), "Parameter orientation is required for REST API CALL postPositions");
    this.assert(!(this.hasProperty("pos_x", body)), "Parameter pos_x is required for REST API CALL postPositions");
    this.assert(!(this.hasProperty("pos_y", body)), "Parameter pos_y is required for REST API CALL postPositions");
    this.assert(!(this.hasProperty("type_id", body)), "Parameter type_id is required for REST API CALL postPositions");
    return await this.sendRequest("POST", "positions/", body);
}
*/ 
