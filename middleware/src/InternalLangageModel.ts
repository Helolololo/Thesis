/* Created 07.10.2022 */
/*! Author: Mai Khanh Isabelle Wilhelm */

import { Order, Topic } from "vda-5050-lib";
import { PriorityQueue } from "./Queue";

let prioQueue = new PriorityQueue;

export class InternalLanguageModel {
    constructor() {
        prioQueue.startprocessingqueue();
    }

    public testMove() {
        prioQueue.enqueue(['move', 2, []]);
    }

    // commands accepted by the internal language model
    public move(robot: Robot, endPosition: Pos, startPosition?: Pos, speed?: Speed) {
        console.log("Move Command")
        console.log("Robot: %o", robot);
        console.log("Start: %o", startPosition);
        console.log("End: %o", endPosition);

        // TODO: process robot manuf and id into robot name?
        // mir100, etc

        // add command to queue
        prioQueue.enqueue(['move', 2, [robot, endPosition, startPosition, speed]]);     // TODO change to object not array
        //console.log("print", data[0][2]);

        prioQueue.printQueue();
    }

    public pick(robot: Robot) {
        prioQueue.enqueue(['pick', 2, [], 'mir100']);
    }

    public drop(robot: Robot) {
        prioQueue.enqueue(['drop', 2, [], 'mir100']);
    }

    public charge(robot: Robot) {
        prioQueue.enqueue(['charge', 2, [], 'mir100']);
    }

    public cancel(robot: Robot) {
        prioQueue.enqueue(['cancel', 1, [], 'mir100']);
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
    constructor(manufacturer: string, robotId: string) {
        this.manufacturer = manufacturer;
        this.robotId = robotId;
    }
    manufacturer: string;
    robotId: string;
}