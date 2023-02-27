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
exports.__esModule = true;
var AdapterTemplate_1 = require("../../AdapterTemplate");
var Robomaster = (function (_super) {
    __extends(Robomaster, _super);
    function Robomaster(ops) {
        return _super.call(this, ops) || this;
    }
    Robomaster.prototype.supportedCommands = function () {
        return [];
    };
    return Robomaster;
}(AdapterTemplate_1.Adapter));
exports["default"] = Robomaster;
//# sourceMappingURL=index.js.map