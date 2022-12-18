"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var _MirAdapter_1 = __importDefault(require("./_MirAdapter"));
var Mir100 = (function (_super) {
    __extends(Mir100, _super);
    function Mir100() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Mir100.prototype.getAcceptedRobots = function () {
        return ["mir100"];
    };
    return Mir100;
}(_MirAdapter_1["default"]));
exports["default"] = Mir100;
//# sourceMappingURL=Mir100.js.map