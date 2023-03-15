// response from the mir after a rest api call
// option 1 if mir sends body as object
var message = {
    "url": "/v2.0.0/mission_groups/mirconst-guid-0000-0001-missiongroup",
    "guid": "mirconst-guid-0000-0001-missiongroup",
    "name": "Move",
};
console.log(message["guid"]);
// option 2 if mir sends body as a string
var jsonmessage = JSON.stringify(message);
var Mission = /** @class */ (function () {
    function Mission(message) {
        if (message.guid === undefined)
            throw Error;
        this.guid = message.guid;
        this.url = message.url;
        this.name = message.name;
        //for (var prop in message) {
        //    this[prop] = message[prop];
        //}
    }
    return Mission;
}());
// option 2
var messageAsMissionMessage = JSON.parse(jsonmessage);
console.log(messageAsMissionMessage);
var mission = new Mission(messageAsMissionMessage);
console.log(mission.guid);
//# sourceMappingURL=test.js.map