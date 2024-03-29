"use strict";
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
exports.importModules = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
function importModules(directoryPath) {
    return __awaiter(this, void 0, void 0, function () {
        var relativePathAdapter, relativePath, folders, adapters, _i, folders_1, folder, files, _a, files_1, file, module_1, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 9, , 10]);
                    relativePathAdapter = "".concat(__dirname, "\\").concat(directoryPath);
                    relativePath = void 0;
                    return [4, fs.promises.readdir(relativePathAdapter)];
                case 1:
                    folders = _b.sent();
                    adapters = [];
                    console.log(folders);
                    _i = 0, folders_1 = folders;
                    _b.label = 2;
                case 2:
                    if (!(_i < folders_1.length)) return [3, 8];
                    folder = folders_1[_i];
                    if (!(path.extname(folder) === "")) return [3, 7];
                    relativePath = "".concat(relativePathAdapter, "\\").concat(folder);
                    return [4, fs.promises.readdir(relativePath)];
                case 3:
                    files = _b.sent();
                    _a = 0, files_1 = files;
                    _b.label = 4;
                case 4:
                    if (!(_a < files_1.length)) return [3, 7];
                    file = files_1[_a];
                    if (!(path.basename(file) === "index.ts" || path.basename(file) === "index.js")) return [3, 6];
                    return [4, Promise.resolve().then(function () { return __importStar(require("".concat(relativePath, "/").concat(file.slice(0, -3)))); })];
                case 5:
                    module_1 = _b.sent();
                    console.log(folder);
                    console.log(file);
                    console.log("module:", module_1);
                    _b.label = 6;
                case 6:
                    _a++;
                    return [3, 4];
                case 7:
                    _i++;
                    return [3, 2];
                case 8: return [2, adapters];
                case 9:
                    err_1 = _b.sent();
                    console.error(err_1);
                    return [3, 10];
                case 10: return [2];
            }
        });
    });
}
exports.importModules = importModules;
importModules('adapter2');
//# sourceMappingURL=LoardAdapter2.js.map