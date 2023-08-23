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
exports.ConnectionPoint = void 0;
var point_1 = require("@devexpress/utils/lib/geometry/point");
var DiagramItem_1 = require("./DiagramItem");
var ConnectionPoint = (function (_super) {
    __extends(ConnectionPoint, _super);
    function ConnectionPoint(x, y, side) {
        if (side === void 0) { side = DiagramItem_1.ConnectionPointSide.Undefined; }
        var _this = _super.call(this, x, y) || this;
        _this.side = side;
        return _this;
    }
    ConnectionPoint.prototype.offset = function (offsetX, offsetY) {
        _super.prototype.offset.call(this, offsetX, offsetY);
        this.side = DiagramItem_1.ConnectionPointSide.Undefined;
        return this;
    };
    ConnectionPoint.prototype.multiply = function (multiplierX, multiplierY) {
        _super.prototype.multiply.call(this, multiplierX, multiplierY);
        this.side = DiagramItem_1.ConnectionPointSide.Undefined;
        return this;
    };
    ConnectionPoint.prototype.clone = function () { return new ConnectionPoint(this.x, this.y, this.side); };
    ConnectionPoint.prototype.toPoint = function () { return new point_1.Point(this.x, this.y); };
    return ConnectionPoint;
}(point_1.Point));
exports.ConnectionPoint = ConnectionPoint;
//# sourceMappingURL=ConnectionPoint.js.map