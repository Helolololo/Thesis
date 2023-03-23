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

        // add command to queue
        prioQueue.enqueue(['move', 2, [robot, endPosition, startPosition, speed]]);

        prioQueue.printQueue();
    }

    public pick(robot: Robot) {
        prioQueue.enqueue(['pick', 2, [robot]]);
    }

    public drop(robot: Robot) {
        prioQueue.enqueue(['drop', 2, [robot]]);
    }

    public charge(robot: Robot) {
        prioQueue.enqueue(['charge', 2, [robot]]);
    }

    public moveForward(robot: Robot, distance: number, direction: number) {

        prioQueue.enqueue(['moveForward', 2, [robot, distance, direction]]);
    }

    public cancel(robot: Robot) {
        prioQueue.enqueue(['cancel', 1, [robot]]);
    }
}

export class Pos {
    id?: string;
    name: string;
    x?: number;
    y?: number;
    theta?: number;
    xRelative?: number;
    yRelative?: number;
    thetaRelative?: number;
    toleratedDistanceDeviation?: number;
    toleratedThetaDeviation?: number;
}

export class Speed {
    linearSpeedDesired: number = 0.5;
    angularSpeedDesired: number = 0.5;
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