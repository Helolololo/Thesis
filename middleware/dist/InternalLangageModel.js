"use strict";
/*! Author: Mai Khanh Isabelle Wilhelm */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = exports.Speed = exports.Pos = exports.InternalLanguageModel = void 0;
const Queue_1 = require("./Queue");
let prioQueue = new Queue_1.PriorityQueue;
class InternalLanguageModel {
    move(robot, endPosition, startPosition, speed) {
        console.log("Move Command");
        console.log("Robot: %o", robot);
        console.log("Start: %o", startPosition);
        console.log("End: %o", endPosition);
        prioQueue.enqueue(['move', 2, [robot, endPosition, startPosition, speed]]);
        console.log("print", Queue_1.data[0][2]);
        prioQueue.printQueue();
    }
    pick(robot) {
    }
    drop(robot) {
    }
    charge(robot) {
    }
    cancel(robot) {
    }
}
exports.InternalLanguageModel = InternalLanguageModel;
class Pos {
    name;
    x;
    y;
    theta;
    xRelative;
    yRelative;
    thetaRelative;
    toleratedDistanceDevistion;
    toleratedThetaDeviation;
}
exports.Pos = Pos;
class Speed {
    linearSpeedDesired = 0;
    angularSpeedDesired = 0;
    linearSpeedMax;
    angularSpeedMax;
}
exports.Speed = Speed;
class Robot {
    manufacturer;
    robotId;
}
exports.Robot = Robot;
//# sourceMappingURL=InternalLangageModel.js.map