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
exports.PriorityQueue = void 0;
var LoadAdapter_1 = require("./LoadAdapter");
var PriorityQueue = (function () {
    function PriorityQueue() {
        this.data = [];
    }
    PriorityQueue.prototype.sort = function () {
        this.data.sort(function (a, b) {
            var aPrio = a[1];
            var bPrio = b[1];
            if (aPrio === bPrio) {
                return 0;
            }
            else if (aPrio > bPrio) {
                return 1;
            }
            else {
                return -1;
            }
        });
    };
    PriorityQueue.prototype.printQueue = function () {
        this.data.forEach(function (item) {
            console.log(item);
        });
    };
    PriorityQueue.prototype.listQueue = function () {
        return this.data;
    };
    PriorityQueue.prototype.enqueue = function (element) {
        this.data.push(element);
        if (this.data.length !== 0) {
            this.sort();
        }
        return this.data;
    };
    PriorityQueue.prototype.dequeue = function () {
        return this.data.shift();
    };
    PriorityQueue.prototype.frontqueue = function () {
        return this.data[0];
    };
    PriorityQueue.prototype.clearqueue = function () {
        this.data = [];
        return this.data;
    };
    PriorityQueue.prototype.startprocessingqueue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.processor) {
                    return [2];
                }
                this.processor = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, itemToQueue, command, args, robot, _i, _b, adapter, output;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!!this.modules) return [3, 2];
                                _a = this;
                                return [4, (0, LoadAdapter_1.importModules)("adapter")];
                            case 1:
                                _a.modules = _c.sent();
                                _c.label = 2;
                            case 2:
                                itemToQueue = this.dequeue();
                                if (!itemToQueue)
                                    return [2];
                                console.log("...running queue iteration...");
                                command = itemToQueue[0];
                                args = itemToQueue[2];
                                robot = "mir100";
                                _i = 0, _b = this.modules;
                                _c.label = 3;
                            case 3:
                                if (!(_i < _b.length)) return [3, 6];
                                adapter = _b[_i];
                                if (!adapter.getAcceptedRobots().includes(robot)) return [3, 5];
                                console.log("running command", command, robot);
                                return [4, adapter.handleCommand(command, args)];
                            case 4:
                                output = _c.sent();
                                _c.label = 5;
                            case 5:
                                _i++;
                                return [3, 3];
                            case 6: return [2];
                        }
                    });
                }); }, 50);
                return [2];
            });
        });
    };
    PriorityQueue.prototype.stopprocessingqueue = function () {
        clearInterval(this.processor);
    };
    return PriorityQueue;
}());
exports.PriorityQueue = PriorityQueue;
//# sourceMappingURL=Queue.js.map