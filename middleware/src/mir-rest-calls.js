"use strict";
/* Created 22.09.2022 */
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
exports.Mir100Client = void 0;
var axios = require("axios");
/* Authorization key for MIR 100 */
var API_KEY = "Basic YWRtaW46OGM2OTc2ZTViNTQxMDQxNWJkZTkwOGJkNGRlZTE1ZGZiMTY3YTljODczZmM0YmI4YTgxZjZmMmFiNDQ4YTkxOA==";
/**
* MIR 100 Client Class
*
* Methods represent API calls for the 2.7.1 interface of MIR 100
* https://www.jugard-kuenstner.de/fileadmin/daten/Downloads/Intralogistik/MiR_Transportsystem/MiR100_MiR200/MiR_Rest-API.pdf
*
* The following API calls from the document have been implemented:
* - POST /mission_queue
* - DELTE /mission_queue
* - POST /missions
* - GET /missions
* - GET /missions/{guid}
* - PUT /missions/{guid}
* - DELETE /missions/{guid}
*/
var Mir100Client = /** @class */ (function () {
    function Mir100Client(authorization) {
        this.endpoint = 'http://mir.com/api/v2.0.0/';
        this.authorization = authorization;
    }
    /**
     * Throws out the message as error message when the expression is true
     */
    Mir100Client.prototype.assert = function (expression, message) {
        if (expression)
            throw new Error(message);
    };
    /**
     * Checks whether the object has the property defined
     */
    Mir100Client.prototype.hasProperty = function (property, obj) {
        return property in obj;
    };
    /**
     * Sends out a REST request call for the MIR 100
     */
    Mir100Client.prototype.sendRequest = function (method, path, body) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        axios({
                            method: method,
                            url: _this.endpoint + path,
                            headers: {
                                "Authorization": _this.authorization,
                                "Accept-Language": "en_US",
                                "Content-Type": "application/json"
                            },
                            data: body
                        })
                            .then(function (response) { return resolve(response.data); })["catch"](reject);
                    })];
            });
        });
    };
    /**
     * Throws out the error from the REST call
     */
    Mir100Client.prototype.handleError = function (response) {
        console.log("Error! returned ".concat(response.status, ":"), response.data);
    };
    /**
     * REST api calls of the MIR 100
     */
    /**
     * POST /mission_queue
     * Add a new mission to the mission queue. The mission will always go to the end of the queue
     *
     * Required properties of the body: mission_id
     */
    //    post_mission = requests.post(host + 'mission_queue', json = mission_id, headers = headers)
    Mir100Client.prototype.postMission_queue = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert(!(this.hasProperty("mission_id", body)), "Parameter mission_id is required for REST API CALL postMission_queue");
                        return [4 /*yield*/, this.sendRequest("POST", "mission_queue/", body)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * DELETE /mission_queue
     * Abort all the pending and executing missions from the mission queue
     */
    Mir100Client.prototype.deleteMission_queue = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendRequest("DELETE", "mission_queue/")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * POST /missions
     * Add a new mission
     *
     * Required properties of the body: group_id, name
     */
    Mir100Client.prototype.postMissions = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert(!(this.hasProperty("group_id", body)), "Parameter group_id is required for REST API CALL postMissions");
                        this.assert(!(this.hasProperty("name", body)), "Parameter name is required for REST API CALL postMissions");
                        return [4 /*yield*/, this.sendRequest("POST", "missions/", body)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * GET /missions
     * Retrieve the list of missions
    
     * GET /missions{guid}
     * Retrieve the details about the mission with the specified GUID
     */
    Mir100Client.prototype.getMissions = function (guid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(guid === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.sendRequest("GET", "missions/")];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, this.sendRequest("GET", "missions/".concat(guid))];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * PUT /missions/{guid}
     * Modify the values of the mission with specified GUID
     */
    Mir100Client.prototype.putMissions = function (guid, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendRequest("PUT", "missions/".concat(guid), body)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * DELETE /missions/{guid}
     * Erade the mission with the specified GUID
     */
    Mir100Client.prototype.deleteMissions = function (guid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendRequest("DELETE", "missions/".concat(guid))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // !!!!!!!!!!!!!!!!!!!!!!!!! test what the call does; does it give all the status information? or can i retrieve a specific one and if so how do i do it without body
    /**
     * GET /status
     * Retrieve the status of following optional information:
     * - battery_percentage: the current charge percentage of the battery
     * - battery_time_remaining: the approximate time remaining on the battery during normal operation of the robot
     * - distance_to_next_target: the distance to the next target of the robot
     * - errors: the list of errors
     * - footprint: the current footprint of the robot
     * - hook_status
     * - joystick_low_speed_mode_enabled
     * - joystick_web_session_id: the id of the web user that has control over the joystick
     * - map_id: the id of the current map the robot recides in
     * - mission_queued_id: the id of the current job the robot executes
     * - mission_queue_url: the url to the active mission in queue
     * - mission_text: status message from mission controller
     * - mode_id: the if of the current mode of the robot
     * - mode_key_state: a textual description of the position of the mode key
     * - mode_text: a textual description of the current state of the robot
     * - moved
     * - position
     * - robot_model: the model of the robot
     * - robot_name: the name of the robot
     * - safety_system_muted
     * - serial_number: the model of the robot
     * - session_id: the id of the session the robot recides in
     * - state_id: the id of the current state of the robot
     * - state_text: a textual description of the current state of the robot
     * - unloaded_map_changes
     * - uptime
     * - user_prompt
     * - velocity
     */
    Mir100Client.prototype.getStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendRequest("GET", "status/")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Mir100Client;
}());
exports.Mir100Client = Mir100Client;
/* Istantiation of the Mir 100 Client */
// const agvMir = new Mir100Client('Basic YWRtaW46OGM2OTc2ZTViNTQxMDQxNWJkZTkwOGJkNGRlZTE1ZGZiMTY3YTljODczZmM0YmI4YTgxZjZmMmFiNDQ4YTkxOA==');
