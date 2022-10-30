"use strict";
/*! Author: Mai Khanh Isabelle Wilhelm */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mir100Client = void 0;
const axios = require("axios");
const API_KEY = "Basic YWRtaW46OGM2OTc2ZTViNTQxMDQxNWJkZTkwOGJkNGRlZTE1ZGZiMTY3YTljODczZmM0YmI4YTgxZjZmMmFiNDQ4YTkxOA==";
class Mir100Client {
    authorization;
    endpoint = 'http://mir.com/api/v2.0.0/';
    constructor(authorization) {
        this.authorization = authorization;
    }
    assert(expression, message) {
        if (expression)
            throw new Error(message);
    }
    hasProperty(property, obj) {
        return property in obj;
    }
    async sendRequest(method, path, body) {
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
    handleError(response) {
        console.log(`Error! returned ${response.status}:`, response.data);
    }
    async postMission_queue(body) {
        this.assert(!(this.hasProperty("mission_id", body)), "Parameter mission_id is required for REST API CALL postMission_queue");
        return await this.sendRequest("POST", "mission_queue/", body);
    }
    async deleteMission_queue() {
        return await this.sendRequest("DELETE", "mission_queue/");
    }
    async postMissions(body) {
        this.assert(!(this.hasProperty("group_id", body)), "Parameter group_id is required for REST API CALL postMissions");
        this.assert(!(this.hasProperty("name", body)), "Parameter name is required for REST API CALL postMissions");
        return await this.sendRequest("POST", "missions/", body);
    }
    async getMissions(guid) {
        if (guid === undefined)
            return await this.sendRequest("GET", "missions/");
        else
            return await this.sendRequest("GET", `missions/${guid}`);
    }
    async putMissions(guid, body) {
        return await this.sendRequest("PUT", `missions/${guid}`, body);
    }
    async deleteMissions(guid) {
        return await this.sendRequest("DELETE", `missions/${guid}`);
    }
    async getStatus() {
        return await this.sendRequest("GET", "status/");
    }
}
exports.Mir100Client = Mir100Client;
//# sourceMappingURL=mir-rest-calls.js.map