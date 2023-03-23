/* Created 28.12.2022 */
/*! Author: Mai Khanh Isabelle Wilhelm */

import { Adapter, AdapterOptions, Command } from "../../AdapterTemplate";
import { Mir100Client } from "./mir-rest-calls";
import { Pos } from "../../InternalLangageModel";

/* Istantiation of the Mir 100 Client */
// this.options.authorization

export default class MirAdapter extends Adapter {
    client: Mir100Client;

    constructor(ops: AdapterOptions) {
        super(ops);
        this.client = new Mir100Client(this.ops.authorization);
    }

    supportedCommands(): Command[] {
        return [
            {
                command: "move",
                args: [],
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
        for (const p of this.ops.positions) {
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
        var allMissions = await this.client.getMissions();
        const keysMissions = Object.keys(allMissions);


        keysMissions.forEach((key, index) => {
            //console.log(`${key}: ${allMissions[key]}`);
            if (allMissions[key].name === `Move to ${positionName}`) {
                this.client.deleteMissions(allMissions[key].guid);
            }
        });


        // create a new mission
        var missionMessage =
            await this.client.postMissions({
                "name": `Move to ${positionName}`,
                "group_id": "mirconst-guid-0000-0001-missiongroup"
            });

        var missionid = missionMessage["guid"];

        // create new actions for the created mission
        var actionMessage =
            await this.client.postMissionsActions(missionid, {
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
        var queuedMissions = await this.client.getMission_queue();
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
        var queueMessage = await this.client.postMission_queue({
            "mission_id": missionid,
            "priority": 0
        });


        // delete created mission
        // var deleteMessage = await agvMir.deleteMissions(missionid);
    }
}