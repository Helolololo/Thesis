"use strict";
/*! Author: Mai Khanh Isabelle Wilhelm */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = exports.Speed = exports.Pos = exports.InternalLanguageModel = void 0;
class InternalLanguageModel {
    move(robot, endPosition, startPosition, speed) {
        console.log("Move Command");
        console.log("Robot: %o", robot);
        console.log("Start: %o", startPosition);
        console.log("End: %o", endPosition);
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