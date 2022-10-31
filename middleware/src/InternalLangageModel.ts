/* Created 07.10.2022 */
/*! Author: Mai Khanh Isabelle Wilhelm */

import { start } from "repl";
import { Order, Topic } from "vda-5050-lib";
import { PriorityQueue, data } from "./Queue";

let prioQueue = new PriorityQueue;

export class InternalLanguageModel {
    // commands accepted by the internal language model
    public move(robot: Robot, endPosition: Pos, startPosition?: Pos, speed?: Speed) {
        console.log("Move Command")
        console.log("Robot: %o", robot);
        console.log("Start: %o", startPosition);
        console.log("End: %o", endPosition);

        // add command to queue
        prioQueue.enqueue(['move', 2, [robot, endPosition, startPosition, speed]]);
        //console.log("print", data[0][2]);

        prioQueue.printQueue();
    }

    public pick(robot: Robot) {
        prioQueue.enqueue(['pick', 2, []]);
    }

    public drop(robot: Robot) {
        prioQueue.enqueue(['drop', 2, []]);
    }

    public charge(robot: Robot) {
        prioQueue.enqueue(['charge', 2, []]);
    }

    public cancel(robot: Robot) {
        prioQueue.enqueue(['cancel', 1, []]);
    }
}

export class Pos {
    name?: string;
    x?: number;
    y?: number;
    theta?: number;
    xRelative?: number;
    yRelative?: number;
    thetaRelative?: number;
    toleratedDistanceDevistion?: number;
    toleratedThetaDeviation?: number;
}

export class Speed {
    linearSpeedDesired: number = 0;
    angularSpeedDesired: number = 0;
    linearSpeedMax?: number;
    angularSpeedMax?: number;
}

export class Robot {
    manufacturer: string;
    robotId: string;
}