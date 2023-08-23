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
exports.ConnectorShapeDescription = void 0;
var ShapeTypes_1 = require("../../ShapeTypes");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var ShapeDescription_1 = require("../ShapeDescription");
var EllipseShapeDescription_1 = require("../General/EllipseShapeDescription");
var ConnectorShapeDescription = (function (_super) {
    __extends(ConnectorShapeDescription, _super);
    function ConnectorShapeDescription() {
        var _this = _super.call(this, false) || this;
        _this.defaultSize = new size_1.Size(ShapeDescription_1.ShapeDefaultDimension * 0.5, ShapeDescription_1.ShapeDefaultDimension * 0.5);
        return _this;
    }
    Object.defineProperty(ConnectorShapeDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.Connector; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectorShapeDescription.prototype, "keepRatioOnAutoSize", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    return ConnectorShapeDescription;
}(EllipseShapeDescription_1.EllipseShapeDescription));
exports.ConnectorShapeDescription = ConnectorShapeDescription;
//# sourceMappingURL=ConnectorShapeDescription.js.map