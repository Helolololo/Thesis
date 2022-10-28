/* Created 22.09.2022 */
/*! Author: Mai Khanh Isabelle Wilhelm */

const axios = require("axios");
/* Authorization key for MIR 100 */
const API_KEY = "Basic YWRtaW46OGM2OTc2ZTViNTQxMDQxNWJkZTkwOGJkNGRlZTE1ZGZiMTY3YTljODczZmM0YmI4YTgxZjZmMmFiNDQ4YTkxOA==";

/** 
* MIR 100 Client Class 
* 
* Methods represent API calls for the 2.7.1 interface of MIR 100
* https://www.jugard-kuenstner.de/fileadmin/daten/Downloads/Intralogistik/MiR_Transportsystem/MiR100_MiR200/MiR_Rest-API.pdf
*
* The following API calls from the document have been implemented:
* - POST /mission_queue
* - DELTE /mission_queue
* - POST /missions
* - GET /missions
* - GET /missions/{guid}
* - PUT /missions/{guid}
* - DELETE /missions/{guid}
*/
export class Mir100Client {
    authorization: string;
    endpoint = 'http://mir.com/api/v2.0.0/';

    constructor(authorization: string){
        this.authorization = authorization;
    }

    /**
     * Throws out the message as error message when the expression is true
     */
    private assert(expression, message?: string): asserts expression {
        if (expression) throw new Error(message);
    }
    
    /**
     * Checks whether the object has the property defined
     */
    private hasProperty(property: string, obj: Object) {       // body always has to be an object
        return property in obj;
    }

    /**
     * Sends out a REST request call for the MIR 100
     */
    private async sendRequest(method: string, path: string, body?: Object) {
        return new Promise((resolve, reject) => {
            axios({
                method: method,
                url: this.endpoint + path,
                headers: {
                    "Authorization": this.authorization,
                    "Accept-Language": "en_US",
                    "Content-Type": "application/json",
                },
                data: body,
            })
                .then((response) => resolve(response.data))
                .catch(reject);
        });
    }

    /**
     * Throws out the error from the REST call
     */
    public handleError(response) {
        console.log(`Error! returned ${response.status}:`, response.data);
    }

    /**
     * REST api calls of the MIR 100
     */

    /**
     * POST /mission_queue
     * Add a new mission to the mission queue. The mission will always go to the end of the queue
     * 
     * Required properties of the body: mission_id
     */
    //    post_mission = requests.post(host + 'mission_queue', json = mission_id, headers = headers)
    public async postMission_queue(body: Object){
        this.assert(!(this.hasProperty("mission_id", body)), "Parameter mission_id is required for REST API CALL postMission_queue");
        return await this.sendRequest("POST", "mission_queue/", body);
    }

    /**
     * DELETE /mission_queue
     * Abort all the pending and executing missions from the mission queue
     */
    public async deleteMission_queue() {
        return await this.sendRequest("DELETE", "mission_queue/");
    }

    /**
     * POST /missions 
     * Add a new mission
     * 
     * Required properties of the body: group_id, name
     */
    public async postMissions(body: Object) {
        this.assert(!(this.hasProperty("group_id", body)), "Parameter group_id is required for REST API CALL postMissions");
        this.assert(!(this.hasProperty("name", body)), "Parameter name is required for REST API CALL postMissions");
        return await this.sendRequest("POST", "missions/", body);
    }

    /**
     * GET /missions
     * Retrieve the list of missions
    
     * GET /missions{guid} 
     * Retrieve the details about the mission with the specified GUID    
     */
    public async getMissions(guid?: String) {
        if (guid === undefined)
            return await this.sendRequest("GET", "missions/");
        else
            return await this.sendRequest("GET", `missions/${guid}`);
    }
    
    /**
     * PUT /missions/{guid}
     * Modify the values of the mission with specified GUID
     */
    public async putMissions(guid: String, body: Object) {
        return await this.sendRequest("PUT", `missions/${guid}`, body);
    }
    
    /**
     * DELETE /missions/{guid}
     * Erade the mission with the specified GUID
     */
    public async deleteMissions(guid: String) {
        return await this.sendRequest("DELETE", `missions/${guid}`);
    }

    // !!!!!!!!!!!!!!!!!!!!!!!!! test what the call does; does it give all the status information? or can i retrieve a specific one and if so how do i do it without body

    /**
     * GET /status
     * Retrieve the status of following optional information:
     * - battery_percentage: the current charge percentage of the battery
     * - battery_time_remaining: the approximate time remaining on the battery during normal operation of the robot
     * - distance_to_next_target: the distance to the next target of the robot
     * - errors: the list of errors
     * - footprint: the current footprint of the robot
     * - hook_status
     * - joystick_low_speed_mode_enabled
     * - joystick_web_session_id: the id of the web user that has control over the joystick
     * - map_id: the id of the current map the robot recides in
     * - mission_queued_id: the id of the current job the robot executes
     * - mission_queue_url: the url to the active mission in queue
     * - mission_text: status message from mission controller
     * - mode_id: the if of the current mode of the robot
     * - mode_key_state: a textual description of the position of the mode key
     * - mode_text: a textual description of the current state of the robot
     * - moved
     * - position
     * - robot_model: the model of the robot
     * - robot_name: the name of the robot
     * - safety_system_muted
     * - serial_number: the model of the robot
     * - session_id: the id of the session the robot recides in
     * - state_id: the id of the current state of the robot
     * - state_text: a textual description of the current state of the robot
     * - unloaded_map_changes
     * - uptime
     * - user_prompt
     * - velocity
     */
     public async getStatus() {
        return await this.sendRequest("GET", "status/");
    }

}



/* Istantiation of the Mir 100 Client */
// const agvMir = new Mir100Client('Basic YWRtaW46OGM2OTc2ZTViNTQxMDQxNWJkZTkwOGJkNGRlZTE1ZGZiMTY3YTljODczZmM0YmI4YTgxZjZmMmFiNDQ4YTkxOA==');
