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
exports.ConnectorRenderPoint = void 0;
var point_1 = require("@devexpress/utils/lib/geometry/point");
var ConnectorRenderPoint = (function (_super) {
    __extends(ConnectorRenderPoint, _super);
    function ConnectorRenderPoint(x, y, pointIndex, skipped) {
        if (pointIndex === void 0) { pointIndex = -1; }
        if (skipped === void 0) { skipped = false; }
        var _this = _super.call(this, x, y) || this;
        _this.pointIndex = pointIndex;
        _this.skipped = skipped;
        return _this;
    }
    ConnectorRenderPoint.prototype.offset = function (offsetX, offsetY) {
        _super.prototype.offset.call(this, offsetX, offsetY);
        this.pointIndex = -1;
        this.skipped = false;
        return this;
    };
    ConnectorRenderPoint.prototype.multiply = function (multiplierX, multiplierY) {
        _super.prototype.multiply.call(this, multiplierX, multiplierY);
        this.pointIndex = -1;
        this.skipped = false;
        return this;
    };
    ConnectorRenderPoint.prototype.clone = function () { return new ConnectorRenderPoint(this.x, this.y, this.pointIndex, this.skipped); };
    return ConnectorRenderPoint;
}(point_1.Point));
exports.ConnectorRenderPoint = ConnectorRenderPoint;
//# sourceMappingURL=ConnectorRenderPoint.js.map