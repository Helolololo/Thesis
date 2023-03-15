"use strict";
/*! Author: Mai Khanh Isabelle Wilhelm */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var AdapterTemplate_1 = require("../../AdapterTemplate");
var mir_rest_calls_1 = require("../../mir-rest-calls");
var agvMir = new mir_rest_calls_1.Mir100Client('Basic YWRtaW46OGM2OTc2ZTViNTQxMDQxNWJkZTkwOGJkNGRlZTE1ZGZiMTY3YTljODczZmM0YmI4YTgxZjZmMmFiNDQ4YTkxOA==');
var MirAdapter = (function (_super) {
    __extends(MirAdapter, _super);
    function MirAdapter(ops) {
        return _super.call(this, ops) || this;
    }
    MirAdapter.prototype.supportedCommands = function () {
        var _this = this;
        return [
            {
                command: "move",
                args: ["forward"],
                handler: function (args) { return __awaiter(_this, void 0, void 0, function () {
                    var e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4, this.sendMoveCommand(args[1])];
                            case 1:
                                _a.sent();
                                return [2, {
                                        success: true,
                                        message: "Moved"
                                    }];
                            case 2:
                                e_1 = _a.sent();
                                return [2, {
                                        success: false,
                                        message: e_1.message || "Could not move"
                                    }];
                            case 3: return [2];
                        }
                    });
                }); }
            },
        ];
    };
    MirAdapter.prototype.getPositionFromName = function (name) {
        for (var _i = 0, _a = this.ops.positions; _i < _a.length; _i++) {
            var p = _a[_i];
            if (p.name === name) {
                return p;
            }
        }
        throw new Error("Cannot determine position from given name ".concat(name, " for mir100"));
    };
    MirAdapter.prototype.initPositions = function () {
    };
    MirAdapter.prototype.sendMoveCommand = function (endPos) {
        return __awaiter(this, void 0, void 0, function () {
            var positionName, pos, allMissions, keysMissions, missionMessage, missionid, actionMessage, queuedMissions, keysQueue, lastElementInQueue, i, queueMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        positionName = endPos.name;
                        pos = this.getPositionFromName(positionName);
                        return [4, agvMir.getMissions()];
                    case 1:
                        allMissions = _a.sent();
                        keysMissions = Object.keys(allMissions);
                        keysMissions.forEach(function (key, index) {
                            if (allMissions[key].name === "Move to ".concat(positionName)) {
                                agvMir.deleteMissions(allMissions[key].guid);
                            }
                        });
                        return [4, agvMir.postMissions({
                                "name": "Move to ".concat(positionName),
                                "group_id": "mirconst-guid-0000-0001-missiongroup"
                            })];
                    case 2:
                        missionMessage = _a.sent();
                        missionid = missionMessage["guid"];
                        return [4, agvMir.postMissionsActions(missionid, {
                                "action_type": "move",
                                "mission_id": missionid,
                                "priority": 1,
                                "parameters": [
                                    {
                                        "id": "position",
                                        "value": pos.id,
                                        "guid": pos.id,
                                        "args": {
                                            "orientation": pos.theta,
                                            "pos_x": pos.x,
                                            "pos_y": pos.y,
                                            "type_id": 0
                                        }
                                    },
                                    {
                                        "id": "retries",
                                        "value": 10
                                    },
                                    {
                                        "id": "max_linear_speed",
                                        "value": 0.15
                                    },
                                    {
                                        "value": "main",
                                        "id": "cart_entry_position"
                                    },
                                    {
                                        "value": "main",
                                        "id": "main_or_entry_position"
                                    },
                                    {
                                        "value": "entry",
                                        "id": "marker_entry_position"
                                    },
                                    {
                                        "value": 0.1,
                                        "id": "distance_threshold"
                                    }
                                ]
                            })];
                    case 3:
                        actionMessage = _a.sent();
                        return [4, agvMir.getMission_queue()];
                    case 4:
                        queuedMissions = _a.sent();
                        keysQueue = Object.keys(queuedMissions);
                        lastElementInQueue = keysQueue[keysQueue.length - 1];
                        console.log(lastElementInQueue);
                        console.log(keysQueue[lastElementInQueue].state);
                        console.log(keysQueue[2636][0]);
                        i = 0;
                        keysQueue.forEach(function (key, index) {
                            i++;
                            if (i === keysQueue.length - 1) {
                                console.log(key);
                                console.log(index);
                                console.log(keysQueue[key].url);
                                console.log(keysQueue[key].state);
                                console.log(keysQueue[key].id);
                            }
                        });
                        return [4, agvMir.postMission_queue({
                                "mission_id": missionid,
                                "priority": 0
                            })];
                    case 5:
                        queueMessage = _a.sent();
                        return [2];
                }
            });
        });
    };
    return MirAdapter;
}(AdapterTemplate_1.Adapter));
exports["default"] = MirAdapter;
//# sourceMappingURL=index.js.map