"use strict";
/*! Author: Mai Khanh Isabelle Wilhelm */
exports.__esModule = true;
exports.Robot = exports.Speed = exports.Pos = exports.InternalLanguageModel = void 0;
var Queue_1 = require("./Queue");
var prioQueue = new Queue_1.PriorityQueue;
var InternalLanguageModel = (function () {
    function InternalLanguageModel() {
    }
    InternalLanguageModel.prototype.move = function (robot, endPosition, startPosition, speed) {
        console.log("Move Command");
        console.log("Robot: %o", robot);
        console.log("Start: %o", startPosition);
        console.log("End: %o", endPosition);
        prioQueue.enqueue(['move', 2, [robot, endPosition, startPosition, speed]]);
        prioQueue.printQueue();
    };
    InternalLanguageModel.prototype.pick = function (robot) {
        prioQueue.enqueue(['pick', 2, []]);
    };
    InternalLanguageModel.prototype.drop = function (robot) {
        prioQueue.enqueue(['drop', 2, []]);
    };
    InternalLanguageModel.prototype.charge = function (robot) {
        prioQueue.enqueue(['charge', 2, []]);
    };
    InternalLanguageModel.prototype.cancel = function (robot) {
        prioQueue.enqueue(['cancel', 1, []]);
    };
    return InternalLanguageModel;
}());
exports.InternalLanguageModel = InternalLanguageModel;
var Pos = (function () {
    function Pos() {
    }
    return Pos;
}());
exports.Pos = Pos;
var Speed = (function () {
    function Speed() {
        this.linearSpeedDesired = 0;
        this.angularSpeedDesired = 0;
    }
    return Speed;
}());
exports.Speed = Speed;
var Robot = (function () {
    function Robot() {
    }
    return Robot;
}());
exports.Robot = Robot;
//# sourceMappingURL=InternalLangageModel.js.map