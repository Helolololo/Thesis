const axios = require("axios");

const ENDPOINT = "http://127.0.0.1:8080";
const API_KEY = "YWRtaW46OGM2OTc2ZTViNTQxMDQxNWJkZTkwOGJkNGRlZTE1ZGZiMTY3YTljODczZmM0YmI4YTgxZjZmMmFiNDQ4YTkxOA==";

async function sendRequest(method, path, body) {
	return new Promise((resolve, reject) => {
		axios({
			method: method,
			url: ENDPOINT + path,
			headers: {
				Authorization: `Basic ${API_KEY}`,
				"Accept-Language": "en_US",
				"Content-Type": "application/json",
			},
			data: body,
		})
			.then((response) => resolve(response.data))
			.catch(reject);
	});
}

async function getMissions() {
	return await sendRequest("GET", "/v2.0.0/missions/");
}

async function newMission(mission) {
	return await sendRequest(
		"POST",
		"/v2.0.0/missions/16f192d2-a45b-12ec-8ad2-94c691a3e2dc",
		mission
	);
}

async function getMissionById(id) {
	return await sendRequest("GET", `/v2.0.0/missions/${id}`);
}

async function updateMissionById(id, mission) {
	return await sendRequest("PUT", `/v2.0.0/missions/${id}`, mission);
}

async function deleteMissionById(id) {
	return await sendRequest("DELETE", `/v2.0.0/missions/${id}`);
}

function handleError(response) {
	console.log(`Error! returned ${response.status}:`, response.data);
}

async function main() {
	try {
		// GET missions
		console.log("[getMissions] OK!", await getMissions());
		let mission_id = "16f192d2-a45b-12ec-8ad2-94c691a3e2dc";
		// POST mission		
		console.log(
			"[newMission] OK!",
			await newMission({
				mission_id: mission_id,
				name: "Hello World",
				url: `/v2.0.0/missions/${mission_id}`,
			})
		);
		//mission_id = "111192d2-a45b-12ec-8ad2-94c691a3e2dc";
		// GET mission/id					
		console.log("[getMissionById] OK!", await getMissionById(mission_id));
		// PUT mission/id
		console.log(
			"[updateMissionById] OK!",
			await updateMissionById(mission_id, {
				name: "Hello12345",
			})
		);
		// GET mission/id
		console.log("[getMissionById] OK!", await getMissionById(mission_id));
		// DELETE mission/id
		console.log("[deleteMissionById] OK!", await deleteMissionById(mission_id));
		// GET missions
		console.log("[getMissions] OK!", await getMissions());
	} 
	catch (e) {
		handleError(e.response);
	}
}

main();
