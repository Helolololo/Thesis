/* Created 12.10.2022 */
/*! Author: Mai Khanh Isabelle Wilhelm */

import { main } from "cli";
import { bodyParser } from "json-server";
import { Mir100Client } from "./mir-rest-calls";

/* Istantiation of the Mir 100 Client */
const agvMir = new Mir100Client('Basic YWRtaW46OGM2OTc2ZTViNTQxMDQxNWJkZTkwOGJkNGRlZTE1ZGZiMTY3YTljODczZmM0YmI4YTgxZjZmMmFiNDQ4YTkxOA==');

async function main(){
    interface Body {
        mission_id?: string
    };

    // get missions
    console.log("[getMissions] OK!", await agvMir.getMissions());

    // get mission by id
    var mission_id = "f1abce6e-7930-11ec-aa93-94c691a3e2dc";
    console.log(`[getMission ${mission_id}] OK!`, await agvMir.getMissions(mission_id));
    mission_id = "mirconst-guid-0000-0001-actionlist00";
    console.log(`[getMission ${mission_id}] OK!`, await agvMir.getMissions(mission_id));
    mission_id = "6e8dbeaa-79f2-11ec-95f0-94c691a3e2dc";
    console.log(`[getMission ${mission_id}] OK!`, await agvMir.getMissions(mission_id));
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
# Get Request
def get_missions(host, headers):
    get_missions = requests.get(host + 'missions', headers = headers)

# Post Reuest
def post_missions(host, headers):
    mission_id = {"mission_id": "56f192d2-a45b-11ec-8ad2-94c691a3e2dc"}   # mission_id is GUID
    post_mission = requests.post(host + 'mission_queue', json = mission_id, headers = headers)
    print(post_mission)
  
# Delete Request
def delete_queue(host, headers):
    delete = requests.delete(host + 'mission_queue', headers = headers)
    */