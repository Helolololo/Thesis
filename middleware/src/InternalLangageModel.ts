/* Created 07.10.2022 */
/*! Author: Mai Khanh Isabelle Wilhelm */

import { Order, Topic } from "vda-5050-lib";

export class InternalLanguageModel {
    // commands accepted by the internal language model
    public move(robot: Robot, endPosition: Pos, startPosition?: Pos, speed?: Speed) {
        console.log("Move Command")
        console.log("Robot: %o", robot);
        console.log("Start: %o", startPosition);
        console.log("End: %o", endPosition);
    }

    public pick(robot: Robot) {

    }

    public drop(robot: Robot) {

    }

    public charge(robot: Robot) {

    }

    public cancel(robot: Robot) {

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