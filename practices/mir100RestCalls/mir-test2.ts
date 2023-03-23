/* Created 12.10.2022 */
/*! Author: Mai Khanh Isabelle Wilhelm */

import { main } from "cli";
import { bodyParser } from "json-server";
import { Mir100Client } from "./mir-rest-calls";

/* Istantiation of the Mir 100 Client */
const agvMir = new Mir100Client('Basic YWRtaW46OGM2OTc2ZTViNTQxMDQxNWJkZTkwOGJkNGRlZTE1ZGZiMTY3YTljODczZmM0YmI4YTgxZjZmMmFiNDQ4YTkxOA==');

async function main() {
    interface Body {
        mission_id?: string,
        map_id?: string,
        name?: string,
        orientation?: number,
        pos_x?: number,
        pos_y?: number,
        type_id?: number
    };

    /**
     * Test to move robot
     */
    // robots current position:
    // "y": 6.20264196395874,
    // "x": 7.438199520111084,
    // "orientation": -93.04766082763672

    /**
     * Add new position the robot shall move to
     */
    // "guid": "f4edbba0-7846-11ec-a1cf-94c691a3e2dc",
    // "name": "L425 Intralogistik Labor"
    /*var posBody: Body = {
        map_id: "f4edbba0-7846-11ec-a1cf-94c691a3e2dc",
        name: "test position",
        orientation: -93.04766082763672,
        pos_x: 9.438199520111084,
        pos_y: 6.20264196395874,
        type_id: 0,
    }
    var posMessage = agvMir.postPositions(posBody);
    console.log("POST /positions");
    console.log(posMessage);
    */
    var postMessage =
        await agvMir.postPositions({
            "map_id": "f4edbba0-7846-11ec-a1cf-94c691a3e2dc",
            "name": "test position",
            "orientation": -93.04766082763672,
            "pos_x": 7.45,        //7,4
            "pos_y": 7.9,         //6,2
            "type_id": 0,
        });  // TODO check if reply is ok or wrong

    // get position id
    console.log("[newPosition] OK!")
    console.log(postMessage);
    console.log(postMessage["guid"]);

    // create a new mission
    var missionMessage =
        await agvMir.postMissions({
            "group_id": "mirconst-guid-0000-0001-missiongroup",       // was ist das?
            "name": "Move test"
        });
    console.log("[newMission] OK!")
    console.log(missionMessage);
    console.log(missionMessage["guid"]);

    // get mission id

    // create new actions for the created mission
    var missionid = missionMessage["guid"];     // TODO needs to be updated to the created missionid
    var positionid = postMessage["guid"];
    var actionMessage =
        await agvMir.postMissionsActions(missionid, {
            action_type: "move",
            mission_id: missionid,
            parameters: [
                {
                    id: "position",
                    guid: positionid
                },
                {
                    id: "retries",
                    value: 10
                },
                {
                    id: "max_linear_speed",
                    value: 0.15
                }
            ],
            priority: 1,
        });

    // add mission to queue
    var queueMessage = await agvMir.postMission_queue({ mission_id: missionid });
    console.log(queueMessage);

    /*
    // get missions
    console.log("[getMissions] OK!", await agvMir.getMissions());

    // get mission by id
    var mission_id = "f1abce6e-7930-11ec-aa93-94c691a3e2dc";
    console.log(`[getMission ${mission_id}] OK!`, await agvMir.getMissions(mission_id));
    mission_id = "mirconst-guid-0000-0001-actionlist00";
    console.log(`[getMission ${mission_id}] OK!`, await agvMir.getMissions(mission_id));
    mission_id = "6e8dbeaa-79f2-11ec-95f0-94c691a3e2dc";
    console.log(`[getMission ${mission_id}] OK!`, await agvMir.getMissions(mission_id));
*/

    /* 
        // post existing mission to mission_queue
        var obj: Body = {
            mission_id: "56f192d2-a45b-11ec-8ad2-94c691a3e2dc",
        };   
        message = agvMir.postMission_queue(obj);
        console.log(message);
    
        // get specific mission details
        message = agvMir.getMissions(obj.mission_id);
        console.log(message);
    
        // delete all missions in the queue
        message = agvMir.deleteMission_queue();
        console.log(message);
     */
}

main();
/*

     * POST /positions
     * Add new position
     * Required properties of the body: map_id, name, orientation, pos_x, pos_y, type_id
     
 public async postPositions(body: Object) {
    this.assert(!(this.hasProperty("map_id", body)), "Parameter map_id is required for REST API CALL postPositions");
    this.assert(!(this.hasProperty("name", body)), "Parameter name is required for REST API CALL postPositions");
    this.assert(!(this.hasProperty("orientation", body)), "Parameter orientation is required for REST API CALL postPositions");
    this.assert(!(this.hasProperty("pos_x", body)), "Parameter pos_x is required for REST API CALL postPositions");
    this.assert(!(this.hasProperty("pos_y", body)), "Parameter pos_y is required for REST API CALL postPositions");
    this.assert(!(this.hasProperty("type_id", body)), "Parameter type_id is required for REST API CALL postPositions");
    return await this.sendRequest("POST", "positions/", body);
}
*/