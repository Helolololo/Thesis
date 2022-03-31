// Requirements:
const express = require('express');         // Load express module
const Joi = require('joi');                 // Load Joi class

const app = express();
app.use(express.json())

// Setup port
const port = process.env.PORT || 8080;      // if port env variable is available use that one, otherwise port 8080
app.listen(port, () => console.log(`Listening on port ${port}...`));

// Fake data
const authorization_id = 'Basic YWRtaW46OGM2OTc2ZTViNTQxMDQxNWJkZTkwOGJkNGRlZTE1ZGZiMTY3YTljODczZmM0YmI4YTgxZjZmMmFiNDQ4YTkxOA==';
const missions = [
    {mission_id: '6e8dbeaa-79f2-11ec-95f0-94c691a3e2dc', name: 'Laden fahren', url: '/v2.0.0/missions/6e8dbeaa-79f2-11ec-95f0-94c691a3e2dc'},
    {mission_id: '56f192d2-a45b-11ec-8ad2-94c691a3e2dc', name: 'Gebinde Aufnahme Abgabe Test', url: '/v2.0.0/missions/56f192d2-a45b-11ec-8ad2-94c691a3e2dc'},
    {mission_id: 'ad397606-a5bd-11ec-afc4-94c691a3e2dc', name: 'Gebindeabgabe', url: '/v2.0.0/missions/ad397606-a5bd-11ec-afc4-94c691a3e2dc'},
];

//const host = 'http://mir.com';
const host = '/';       // root of the website

// validate functions; header requirements
function validateHeader(header) {
    const schema = Joi.object({
        authorization: Joi.string()
            .length(102)
            .pattern(new RegExp('^Basic [a-zA-Z0-9]{94}==$'))
            .required()
            .valid(authorization_id),

        "accept-language": Joi.string()
            .min(2)
            .max(50)
            .required()
            .valid('en_US')
    }).unknown(true);       // allows further headers
    return schema.validate(header)
}
function validateMissionID(body) {
    const schema = Joi.object({
        mission_id: Joi.string()
            .alphanum()
            .length(36)
            .pattern(new RegExp('^[a-zA-Z0-9]{8}[-][a-zA-Z0-9]{4}[-][a-zA-Z0-9]{4}[-][a-zA-Z0-9]{4}[-][a-zA-Z0-9]{12}$'))
            .required()
            .valid(['6e8dbeaa-79f2-11ec-95f0-94c691a3e2dc', '56f192d2-a45b-11ec-8ad2-94c691a3e2dc','ad397606-a5bd-11ec-afc4-94c691a3e2dc'])
    });
    return schema.validate(body);
}
function validateMissionName(body) {
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
            .max(50)
            .required()
    });
    return schema.validate(body)
}

// GET /missions
// Description: Retrieve the list of missions
app.get('/v2.0.0/missions/', (req, res) => {
    const validHeader = validateHeader(req.headers);
    if (validHeader.error) {
        res.status(400).send('Invalid ordering or Invalid filters or Wrong output fields or Invalid limits');
        return;
    }
    if(!missions) {
        res.status(404).send('Not found');
        return;
    }
    //res.status(200).send('Successfully retrieved the list of elements')
    //res.send(missions);
    res.send.status(200).send({
        message: 'Successfully retrieved the list of elements',
        missions: missions
    })
});

// POST /missions/{guid}
// Description: Add a new mission
app.post('/v2.0.0/missions/', (req, res) => {
    const validMission = validateMissionName(req.body);
    const validHeader = validateHeader(req.headers);
    const mission = missions.find(m => m.mission_id === parseInt(req.params.mission_id))
    if (validMission.error || validHeader.error) {
        console.error
        res.status(400).send('Argument error or Missing content type application/json on the header or Bad request or Invalid JSON');
        return;
    }
    if (mission) {
        res.status(409).send('Duplicate entry');
        return;
    }
    const mission_details = {
        mission_id: '1l3lkzdw-97d3-44qg-94d0-94c691a3e2dc',     // !!!! generate a mission id missing
        name: req.body.name      
    };
    missions.push(mission_details);                             // append new element
    res.status(201).send('The element has been created successfully');
    res.send(mission)
});

// GET /missions/{guid}
// Description: Retrieve the details about the mission with the specified GUID
app.get('/v2.0.0/missions/:id', (req, res) => {
    const validHeader = validateHeader(req.headers);
    const mission = missions.find(m => m.mission_id === parseInt(req.params.mission_id))
    if (validHeader.error) {
        res.status(400).send('Invalid ordering or Invalid filters or Wrong output fields or Invalid limits');
        return;
    }
    if(!mission) {
        res.status(404).send('Not found');
        return;
    }
    res.status(200).send('Successfully retrieved the list of elements')
    res.send(mission); 
});

// PUT /missions/{guid}
// Description: Modify the values of the mission with the specified GUID
app.put('/v2.0.0/missions/:id', (req, res) => {
    const validMission = validateMissionID(req.body);
    const validHeader = validateHeader(req.headers);
    const mission = missions.find(m => m.mission_id === parseInt(req.params.mission_id))
    if (!mission) {
        res.status(404).send('Not found');
        return;
    }
    if (validMission.error || validHeader.error) {
        res.status(400).send('Invalid filters or Invalid JSON or Argument error or Missing content type application/json on the header or Bad request or No fields');
        return;
    };
    // update mission
    mission.mission_id = req.body.mission_id;
    mission.name = req.body.name;
    res.status(200).send('The element has been modified successfully');
    res.send(mission);
});

// DELETE /missions/{guid}
// Description: Erase the mission with the specified GUID
app.delete('/v2.0.0/missions/:id', (req, res) => {
    const validMission = validateMissionID(req.body);
    const validHeader = validateHeader(req.headers);
    const mission = missions.find(m => m.mission_id === parseInt(req.params.mission_id))
    const index = missions.indexOf(mission);      // find the index of the mission
    if (!mission) {
        res.status(404).send('Not found');
        return;
    }
    if (validMission.error || validHeader.error) {
        res.status(400).send('Invalid filters or Invalid JSON or Argument error or Missing content type application/json on the header or Bad request or No fields');
        return;
    };
    missions.splice(index, 1);                   // remove 1 object
    res.status(204).send('The element has been deleted successfully');
    res.send(mission);
});