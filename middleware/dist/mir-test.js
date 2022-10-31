"use strict";
/*! Author: Mai Khanh Isabelle Wilhelm */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mir_rest_calls_1 = require("./mir-rest-calls");
var agvMir = new mir_rest_calls_1.Mir100Client('Basic YWRtaW46OGM2OTc2ZTViNTQxMDQxNWJkZTkwOGJkNGRlZTE1ZGZiMTY3YTljODczZmM0YmI4YTgxZjZmMmFiNDQ4YTkxOA==');
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, mission_id, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    ;
                    _b = (_a = console).log;
                    _c = ["[getMissions] OK!"];
                    return [4, agvMir.getMissions()];
                case 1:
                    _b.apply(_a, _c.concat([_o.sent()]));
                    mission_id = "f1abce6e-7930-11ec-aa93-94c691a3e2dc";
                    _e = (_d = console).log;
                    _f = ["[getMission ".concat(mission_id, "] OK!")];
                    return [4, agvMir.getMissions(mission_id)];
                case 2:
                    _e.apply(_d, _f.concat([_o.sent()]));
                    mission_id = "mirconst-guid-0000-0001-actionlist00";
                    _h = (_g = console).log;
                    _j = ["[getMission ".concat(mission_id, "] OK!")];
                    return [4, agvMir.getMissions(mission_id)];
                case 3:
                    _h.apply(_g, _j.concat([_o.sent()]));
                    mission_id = "6e8dbeaa-79f2-11ec-95f0-94c691a3e2dc";
                    _l = (_k = console).log;
                    _m = ["[getMission ".concat(mission_id, "] OK!")];
                    return [4, agvMir.getMissions(mission_id)];
                case 4:
                    _l.apply(_k, _m.concat([_o.sent()]));
                    return [2];
            }
        });
    });
}
main();
//# sourceMappingURL=mir-test.js.map