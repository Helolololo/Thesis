// Requirements:
const express = require("express"); // Load express module
const Joi = require("joi"); // Load Joi class

const app = express();
app.use(express.json());

// Setup port
const port = process.env.PORT || 8080; // if port env variable is available use that one, otherwise port 8080
app.listen(port, () => console.log(`Listening on port ${port}...`));

// Fake data (corresponds to real data)
const authorization_id =
  "Basic YWRtaW46OGM2OTc2ZTViNTQxMDQxNWJkZTkwOGJkNGRlZTE1ZGZiMTY3YTljODczZmM0YmI4YTgxZjZmMmFiNDQ4YTkxOA==";
const missions = [
  {
    mission_id: "6e8dbeaa-79f2-11ec-95f0-94c691a3e2dc",
    name: "Laden fahren",
    url: "/v2.0.0/missions/6e8dbeaa-79f2-11ec-95f0-94c691a3e2dc",
  },
  {
    mission_id: "56f192d2-a45b-11ec-8ad2-94c691a3e2dc",
    name: "Gebinde Aufnahme Abgabe Test",
    url: "/v2.0.0/missions/56f192d2-a45b-11ec-8ad2-94c691a3e2dc",
  },
  {
    mission_id: "ad397606-a5bd-11ec-afc4-94c691a3e2dc",
    name: "Gebindeabgabe",
    url: "/v2.0.0/missions/ad397606-a5bd-11ec-afc4-94c691a3e2dc",
  },
];

//const host = 'http://mir.com';
const host = "/"; // root of the website

// validate functions; header requirements
function validateHeader(header) {
  const schema = Joi.object({
    authorization: Joi.string()
      .length(102)
      .pattern(new RegExp("^Basic [a-zA-Z0-9]{94}==$"))
      .required()
      .valid(authorization_id),

    "accept-language": Joi.string().min(2).max(50).required(),
  }).unknown(true);
  return schema.validate(header);
}
function validateMissionGuid(body) {
  const schema = Joi.object({
    guid: Joi.string()
      .length(36)
      .pattern(
        new RegExp(
          "^[a-zA-Z0-9]{8}[-][a-zA-Z0-9]{4}[-][a-zA-Z0-9]{4}[-][a-zA-Z0-9]{4}[-][a-zA-Z0-9]{12}$"
        )
      )
      .required(),
  }).unknown(true);
  return schema.validate(body);
}

function validateName(body) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3),
  });

  return schema.validate(body);
}

function validateBody(body) {
  const schema = Joi.object({
    url: Joi.string(),
    mission_id: Joi.string().length(36),
    name: Joi.string().min(3),
  });

  return schema.validate(body);
}

// GET /missions
// Description: Retrieve the list of missions
app.get("/v2.0.0/missions/", (req, res) => {
  const validHeader = validateHeader(req.headers);
  if (validHeader.error) {
    console.error(validHeader.error);
    res.status(400).send({
      success: false,
      error:
        "Invalid ordering or Invalid filters or Wrong output fields or Invalid limits",
    });
    return;
  }
  if (missions.length > 0) {
    res.status(200).send({
      success: true,
      missions: missions,
    });
  } 
  else {
    res.status(404).send({
      success: false,
    });
  }
});

// POST /missions/{guid}
// Description: Add a new mission
app.post("/v2.0.0/missions/:guid", (req, res) => {
  const validHeader = validateHeader(req.headers);
  const validMissionGuid = validateMissionGuid(req.params);
  const validBody = validateBody(req.body);

  if (
    validHeader.error ||
    validMissionGuid.error ||
    validBody.error ||
    req.params.guid !== req.body.mission_id
  ) {
    res.status(400).send({
      success: false,
      error:
        "Argument error or Missing content type application/json on the header or Bad request or Invalid JSON",
    });
    return;
  }

  // make sure we don't overwrite a mission that already exists
  if (missions.find((m) => m.mission_id === req.params.guid) !== undefined) {
    res.status(409).send({
      success: false,
      error: "Mission already exists",
    });
  }

  missions.push(req.body);

  res.status(201).send({
    success: true,
    message: "Successfully added the new mission",
    mission: req.body,
  });
});

// GET /missions/{guid}
// Description: Retrieve the details about the mission with the specified GUID
app.get("/v2.0.0/missions/:guid", (req, res) => {
  const validHeader = validateHeader(req.headers);
  const validMissionGuid = validateMissionGuid(req.params);

  if (validHeader.error || validMissionGuid.error) {
    res.status(400).send({
      success: false,
      error:
        "Invalid ordering or Invalid filters or Wrong output fields or Invalid limits",
    });
    return;
  }

  // checking whether mission exists
  const missionElementToUpdate = missions.find((m) => m.mission_id === req.params.guid);
  if (missionElementToUpdate === -1) {
    res.status(409).send({
      success: false,
      error: "Mission does not exist",
    });
    return;
  }

  res.status(200).send({
    success: true,
    mission: missionElementToUpdate,
  });
});

// PUT /missions/{guid}
// Description: Modify the values of the mission with the specified GUID
app.put("/v2.0.0/missions/:guid", (req, res) => {
  const validHeader = validateHeader(req.headers);
  const validMissionGuid = validateMissionGuid(req.params);
  const validName = validateName(req.body);

  if (validHeader.error || 
    validMissionGuid.error || 
    validName.error) {
    res.status(400).send({
      success: false,
      error:
        "Invalid filters or Invalid JSON or Argument error or Missing content type application/json on the header or Bad request or No fields",
    });
    return;
  }

  // checking if mission already exists, so we do not overwrite
  const missionElementToUpdate = missions.findIndex((m) => m.mission_id === req.params.guid);
  if (missionElementToUpdate === -1) {
    res.status(409).send({
      success: false,
      error: "Mission not found",
    });
    return;
  }

  if (req.body?.name) missions[missionElementToUpdate].name = req.body.name;

  res.status(200).send({
    success: true,
    message: "Updated mission",
    mission: missions[missionElementToUpdate],
  });
});

// DELETE /missions/{guid}
// Description: Erase the mission with the specified GUID
app.delete("/v2.0.0/missions/:guid", (req, res) => {
  const validHeader = validateHeader(req.headers);
  const validMissionGuid = validateMissionGuid(req.params);

  if (validHeader.error || validMissionGuid.error) {
    res.status(400).send({
      success: false,
      error:
        "Invalid filters or Invalid JSON or Argument error or Missing content type application/json on the header or Bad request or No fields",
    });
    return;
  }

  // check if mission exists
  const missionElementToUpdate = missions.findIndex((m) => m.mission_id === req.params.guid);
  if (missionElementToUpdate === -1) {
    res.status(409).send({
      success: false,
      error: "Mission not found",
    });
    return;
  }

  missions.splice(missionElementToUpdate, 1);

  res.status(204).send({
    success: true,
    mission: missions[missionElementToUpdate],
  });
});
