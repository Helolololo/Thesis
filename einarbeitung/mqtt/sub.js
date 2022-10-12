// Youtube Tutorial MQTT in Jode
// https://www.youtube.com/watch?v=JwSoHIngGRI

const mqtt = require("mqtt");
var client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', function() {
    client.subscribe("Isabelle");
    console.log("Client has subrscribed successfully");
});

client.on('message', function(topic, message){
    console.log(message.toString());
});