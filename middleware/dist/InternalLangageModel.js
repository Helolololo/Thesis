"use strict";
/*! Author: Mai Khanh Isabelle Wilhelm */
exports.__esModule = true;
exports.Robot = exports.Speed = exports.Pos = exports.InternalLanguageModel = void 0;
var Queue_1 = require("./Queue");
var prioQueue = new Queue_1.PriorityQueue;
var InternalLanguageModel = (function () {
    function InternalLanguageModel() {
        prioQueue.startprocessingqueue();
    }
    InternalLanguageModel.prototype.testMove = function () {
        prioQueue.enqueue(['move', 2, []]);
    };
    InternalLanguageModel.prototype.move = function (robot, endPosition, startPosition, speed) {
        prioQueue.enqueue(['move', 2, [robot, endPosition, startPosition, speed]]);
        prioQueue.printQueue();
    };
    InternalLanguageModel.prototype.pick = function (robot) {
        prioQueue.enqueue(['pick', 2, [robot]]);
    };
    InternalLanguageModel.prototype.drop = function (robot) {
        prioQueue.enqueue(['drop', 2, [robot]]);
    };
    InternalLanguageModel.prototype.charge = function (robot) {
        prioQueue.enqueue(['charge', 2, [robot]]);
    };
    InternalLanguageModel.prototype.moveForward = function (robot, distance, direction) {
        prioQueue.enqueue(['moveForward', 2, [robot, distance, direction]]);
    };
    InternalLanguageModel.prototype.cancel = function (robot) {
        prioQueue.enqueue(['cancel', 1, [robot]]);
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
        this.linearSpeedDesired = 0.5;
        this.angularSpeedDesired = 0.5;
    }
    return Speed;
}());
exports.Speed = Speed;
var Robot = (function () {
    function Robot(manufacturer, robotId) {
        this.manufacturer = manufacturer;
        this.robotId = robotId;
    }
    return Robot;
}());
exports.Robot = Robot;
//# sourceMappingURL=InternalLangageModel.js.map