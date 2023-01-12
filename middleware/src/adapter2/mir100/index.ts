/* Created 28.12.2022 */
/*! Author: Mai Khanh Isabelle Wilhelm */

import { Adapter, Command } from "../../AdapterTemplate";
import { Mir100Client } from "../../mir-rest-calls";
import Mir100Config from "../../configuration/mir100.json";
import { Pos } from "../../InternalLangageModel";

/* Istantiation of the Mir 100 Client */
const agvMir = new Mir100Client('Basic YWRtaW46OGM2OTc2ZTViNTQxMDQxNWJkZTkwOGJkNGRlZTE1ZGZiMTY3YTljODczZmM0YmI4YTgxZjZmMmFiNDQ4YTkxOA==');



export default class MirAdapter extends Adapter {
    constructor() {
        super();
    }

    getAcceptedRobots(): string[] {
        return ["mir100"];
    }

    getAcceptedCommands(): Command[] {
        return [
            {
                command: "move",
                args: ["forward"],
                handler: async (args) => {
                    try {
                        await this.sendMoveCommand(args[1]);

                        return {
                            success: true,
                            message: "Moved",
                        };
                    } catch (e) {
                        return {
                            success: false,
                            message: e.message || "Could not move",
                        };
                    }
                },
            },
        ];
    }

    getPositionFromName(name: string): Pos {
        for (const p of Mir100Config.positions) {
            if (p.name === name) {
                return p;
            }
        }

        // Could not find position by that name
        throw new Error(`Cannot determine position from given name ${name} for mir100`);
    }

    // TODO: to decide whether to initialize from config file or manually over mir web application. this function needs to be done as initialization 
    initPositions() {

    }

    async sendMoveCommand(endPos: Pos) {
        const positionName = endPos.name;

        const pos = this.getPositionFromName(positionName);

        // check whether a mission with name "Move to {positionName}" has already been created
        var allMissions = await agvMir.getMissions();
        const keysMissions = Object.keys(allMissions);


        keysMissions.forEach((key, index) => {
            //console.log(`${key}: ${allMissions[key]}`);
            if (allMissions[key].name === `Move to ${positionName}`) {
                agvMir.deleteMissions(allMissions[key].guid);
            }
        });


        // create a new mission
        var missionMessage =
            await agvMir.postMissions({
                "name": `Move to ${positionName}`,
                "group_id": "mirconst-guid-0000-0001-missiongroup"
            });

        var missionid = missionMessage["guid"];

        // create new actions for the created mission
        var actionMessage =
            await agvMir.postMissionsActions(missionid, {
                "action_type": "move",
                "mission_id": missionid,
                "priority": 1,
                "parameters": [
                    {
                        "id": "position",
                        "value": pos.id,
                        "guid": pos.id,
                        "args":
                        {
                            "orientation": pos.theta,
                            "pos_x": pos.x,
                            "pos_y": pos.y,
                            "type_id": 0
                        }
                    },
                    {
                        "id": "retries",
                        "value": 10
                    },
                    {
                        "id": "max_linear_speed",
                        "value": 0.15
                    },

                    {
                        "value": "main",
                        "id": "cart_entry_position"
                    },
                    {
                        "value": "main",
                        "id": "main_or_entry_position"
                    },
                    {
                        "value": "entry",
                        "id": "marker_entry_position"
                    },
                    {
                        "value": 0.1,
                        "id": "distance_threshold"
                    }
                ]
            });


        // if the last element in the mission queue has state done or executed the queue is not empty and therefore the priority needs to be zero
        // if the last element in the mission queue has state executing or pending the queue is not empty and therefore the priority needs to be increased
        var queuedMissions = await agvMir.getMission_queue();
        //console.log(queuedMissions);
        const keysQueue = Object.keys(queuedMissions);
        const lastElementInQueue = keysQueue[keysQueue.length - 1];        // last element in array
        //console.log(keysQueue.length);
        console.log(lastElementInQueue);
        console.log(keysQueue[lastElementInQueue].state);
        console.log(keysQueue[2636][0]);

        let i = 0;
        keysQueue.forEach((key, index) => {
            i++;
            //console.log(`${key}: ${allMissions[key]}`);
            if (i === keysQueue.length - 1) {
                console.log(key);
                console.log(index);
                console.log(keysQueue[key].url);
                console.log(keysQueue[key].state);
                console.log(keysQueue[key].id);
            }
        });


        // add mission to queue
        var queueMessage = await agvMir.postMission_queue({
            "mission_id": missionid,
            "priority": 0
        });


        // delete created mission
        // var deleteMessage = await agvMir.deleteMissions(missionid);
    }
}