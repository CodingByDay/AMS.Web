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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessShapeDescription = void 0;
var RectangleShapeDescription_1 = require("../General/RectangleShapeDescription");
var ShapeTypes_1 = require("../../ShapeTypes");
var ProcessShapeDescription = (function (_super) {
    __extends(ProcessShapeDescription, _super);
    function ProcessShapeDescription() {
        return _super.call(this, undefined, true) || this;
    }
    Object.defineProperty(ProcessShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.Process; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProcessShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return false; },
        enumerable: false,
        configurable: true
    });
    return ProcessShapeDescription;
}(RectangleShapeDescription_1.RectangleShapeDescription));
exports.ProcessShapeDescription = ProcessShapeDescription;
//# sourceMappingURL=ProcessShapeDescription.js.map