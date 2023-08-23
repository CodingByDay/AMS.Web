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
exports.DecisionShapeDescription = void 0;
var DiamondShapeDescription_1 = require("../General/DiamondShapeDescription");
var ShapeTypes_1 = require("../../ShapeTypes");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var ShapeDescription_1 = require("../ShapeDescription");
var DecisionShapeDescription = (function (_super) {
    __extends(DecisionShapeDescription, _super);
    function DecisionShapeDescription() {
        return _super.call(this, new size_1.Size(ShapeDescription_1.ShapeDefaultDimension, ShapeDescription_1.ShapeDefaultDimension * 0.75), true) || this;
    }
    Object.defineProperty(DecisionShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.Decision; },
        enumerable: false,
        configurable: true
    });
    return DecisionShapeDescription;
}(DiamondShapeDescription_1.DiamondShapeDescription));
exports.DecisionShapeDescription = DecisionShapeDescription;
//# sourceMappingURL=DecisionShapeDescription.js.map