"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.processConfigs = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var InterfaceToController_1 = require("./InterfaceToController");
var process = __importStar(require("process"));
function processConfigs(possibleAdapters, configurationPath) {
    return __awaiter(this, void 0, void 0, function () {
        var relativePathConfiguration, robots, files, _i, files_1, file, config, _a, _b, adapter, _c, _d, robotConfig, extraOps, ops, id, err_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 9, , 10]);
                    relativePathConfiguration = "".concat(process.cwd(), "\\").concat(configurationPath);
                    robots = [];
                    return [4, fs.promises.readdir(relativePathConfiguration)];
                case 1:
                    files = _e.sent();
                    _i = 0, files_1 = files;
                    _e.label = 2;
                case 2:
                    if (!(_i < files_1.length)) return [3, 8];
                    file = files_1[_i];
                    if (!(path.extname(file) === ".json")) return [3, 7];
                    _b = (_a = JSON).parse;
                    return [4, fs.promises.readFile("".concat(relativePathConfiguration, "/").concat(file), {
                            encoding: "utf8"
                        })];
                case 3:
                    config = _b.apply(_a, [_e.sent()]);
                    if (!Object.keys(possibleAdapters).includes(config.adapterName)) {
                        console.error("No adapter found for ".concat(config.adapterName));
                        return [3, 7];
                    }
                    adapter = possibleAdapters[config.adapterName];
                    _c = 0, _d = config.robots;
                    _e.label = 4;
                case 4:
                    if (!(_c < _d.length)) return [3, 7];
                    robotConfig = _d[_c];
                    extraOps = config;
                    delete extraOps.adapterName;
                    delete extraOps.robots;
                    ops = __assign(__assign({}, robotConfig), extraOps);
                    id = robotConfig.name.split("_");
                    return [4, (0, InterfaceToController_1.connectRobot)(id[0], id[1])];
                case 5:
                    _e.sent();
                    robots.push(new adapter(ops));
                    _e.label = 6;
                case 6:
                    _c++;
                    return [3, 4];
                case 7:
                    _i++;
                    return [3, 2];
                case 8:
                    console.log(robots);
                    return [2, robots];
                case 9:
                    err_1 = _e.sent();
                    console.error(err_1);
                    return [3, 10];
                case 10: return [2];
            }
        });
    });
}
exports.processConfigs = processConfigs;
//# sourceMappingURL=LoadConfiguration.js.map