"use strict";
/*! Author: Mai Khanh Isabelle Wilhelm */
Object.defineProperty(exports, "__esModule", { value: true });
const mir_rest_calls_1 = require("./mir-rest-calls");
const agvMir = new mir_rest_calls_1.Mir100Client('Basic YWRtaW46OGM2OTc2ZTViNTQxMDQxNWJkZTkwOGJkNGRlZTE1ZGZiMTY3YTljODczZmM0YmI4YTgxZjZmMmFiNDQ4YTkxOA==');
async function main() {
    ;
    console.log("[getMissions] OK!", await agvMir.getMissions());
    var mission_id = "f1abce6e-7930-11ec-aa93-94c691a3e2dc";
    console.log(`[getMission ${mission_id}] OK!`, await agvMir.getMissions(mission_id));
    mission_id = "mirconst-guid-0000-0001-actionlist00";
    console.log(`[getMission ${mission_id}] OK!`, await agvMir.getMissions(mission_id));
    mission_id = "6e8dbeaa-79f2-11ec-95f0-94c691a3e2dc";
    console.log(`[getMission ${mission_id}] OK!`, await agvMir.getMissions(mission_id));
}
main();
//# sourceMappingURL=mir-test.js.map