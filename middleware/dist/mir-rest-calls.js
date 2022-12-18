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
exports.Mir100Client = void 0;
var axios = require("axios");
var API_KEY = "Basic YWRtaW46OGM2OTc2ZTViNTQxMDQxNWJkZTkwOGJkNGRlZTE1ZGZiMTY3YTljODczZmM0YmI4YTgxZjZmMmFiNDQ4YTkxOA==";
var Mir100Client = (function () {
    function Mir100Client(authorization) {
        this.endpoint = 'http://mir.com/api/v2.0.0/';
        this.authorization = authorization;
    }
    Mir100Client.prototype.assert = function (expression, message) {
        if (expression)
            throw new Error(message);
    };
    Mir100Client.prototype.hasProperty = function (property, obj) {
        return property in obj;
    };
    Mir100Client.prototype.sendRequest = function (method, path, body) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
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
    Mir100Client.prototype.handleError = function (response) {
        console.log("Error! returned ".concat(response.status, ":"), response.data);
    };
    Mir100Client.prototype.getPositions = function (guid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(guid === undefined)) return [3, 2];
                        return [4, this.sendRequest("GET", "positions/")];
                    case 1: return [2, _a.sent()];
                    case 2: return [4, this.sendRequest("GET", "positions/".concat(guid))];
                    case 3: return [2, _a.sent()];
                }
            });
        });
    };
    Mir100Client.prototype.putPositions = function (guid, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.sendRequest("PUT", "positions/".concat(guid), body)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Mir100Client.prototype.deletePositions = function (guid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.sendRequest("DELETE", "positions/".concat(guid))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Mir100Client.prototype.postPositions = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert(!(this.hasProperty("map_id", body)), "Parameter map_id is required for REST API CALL postPositions");
                        this.assert(!(this.hasProperty("name", body)), "Parameter name is required for REST API CALL postPositions");
                        this.assert(!(this.hasProperty("orientation", body)), "Parameter orientation is required for REST API CALL postPositions");
                        this.assert(!(this.hasProperty("pos_x", body)), "Parameter pos_x is required for REST API CALL postPositions");
                        this.assert(!(this.hasProperty("pos_y", body)), "Parameter pos_y is required for REST API CALL postPositions");
                        this.assert(!(this.hasProperty("type_id", body)), "Parameter type_id is required for REST API CALL postPositions");
                        return [4, this.sendRequest("POST", "positions/", body)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Mir100Client.prototype.postMission_queue = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert(!(this.hasProperty("mission_id", body)), "Parameter mission_id is required for REST API CALL postMission_queue");
                        return [4, this.sendRequest("POST", "mission_queue/", body)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Mir100Client.prototype.deleteMission_queue = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.sendRequest("DELETE", "mission_queue/")];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Mir100Client.prototype.postMissions = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert(!(this.hasProperty("group_id", body)), "Parameter group_id is required for REST API CALL postMissions");
                        this.assert(!(this.hasProperty("name", body)), "Parameter name is required for REST API CALL postMissions");
                        return [4, this.sendRequest("POST", "missions/", body)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Mir100Client.prototype.getMissions = function (guid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(guid === undefined)) return [3, 2];
                        return [4, this.sendRequest("GET", "missions/")];
                    case 1: return [2, _a.sent()];
                    case 2: return [4, this.sendRequest("GET", "missions/".concat(guid))];
                    case 3: return [2, _a.sent()];
                }
            });
        });
    };
    Mir100Client.prototype.putMissions = function (guid, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.sendRequest("PUT", "missions/".concat(guid), body)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Mir100Client.prototype.deleteMissions = function (guid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.sendRequest("DELETE", "missions/".concat(guid))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Mir100Client.prototype.getMissionsActions = function (mission_id, guid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(guid === undefined)) return [3, 2];
                        return [4, this.sendRequest("GET", "missions/".concat(mission_id, "/actions"))];
                    case 1: return [2, _a.sent()];
                    case 2: return [4, this.sendRequest("GET", "missions/".concat(mission_id, "/actions/").concat(guid))];
                    case 3: return [2, _a.sent()];
                }
            });
        });
    };
    Mir100Client.prototype.postMissionsActions = function (guid, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.assert(!(this.hasProperty("action_type", body)), "Parameter action_type is required for REST API CALL postMissionsActions");
                        this.assert(!(this.hasProperty("parameters", body)), "Parameter parameters is required for REST API CALL postMissionsActions");
                        this.assert(!(this.hasProperty("priority", body)), "Parameter priority is required for REST API CALL postMissionsActions");
                        return [4, this.sendRequest("POST", "missions/".concat(guid, "/actions"), body)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Mir100Client.prototype.putMissionsActions = function (mission_id, guid, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.sendRequest("PUT", "missions/".concat(mission_id, "/actions/").concat(guid), body)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Mir100Client.prototype.deleteMissionsActions = function (mission_id, guid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.sendRequest("DELETE", "missions/".concat(mission_id, "/actions/").concat(guid))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Mir100Client.prototype.getStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.sendRequest("GET", "status/")];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return Mir100Client;
}());
exports.Mir100Client = Mir100Client;
//# sourceMappingURL=mir-rest-calls.js.map