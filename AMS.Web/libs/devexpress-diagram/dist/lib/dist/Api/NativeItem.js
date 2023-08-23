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
exports.NativeConnector = exports.NativeShape = exports.NativeItem = void 0;
var ModelUtils_1 = require("../Model/ModelUtils");
var NativeItem = (function () {
    function NativeItem(id, key) {
        this.id = id;
        this.key = key;
        this.unitsApplied = false;
    }
    NativeItem.prototype.applyUnits = function (units) {
        if (!this.unitsApplied && units !== undefined) {
            this.applyUnitsCore(units);
            this.unitsApplied = true;
        }
    };
    return NativeItem;
}());
exports.NativeItem = NativeItem;
var NativeShape = (function (_super) {
    __extends(NativeShape, _super);
    function NativeShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NativeShape.prototype.applyUnitsCore = function (units) {
        this.position.x = ModelUtils_1.ModelUtils.getlUnitValue(units, this.position.x);
        this.position.y = ModelUtils_1.ModelUtils.getlUnitValue(units, this.position.y);
        this.size.width = ModelUtils_1.ModelUtils.getlUnitValue(units, this.size.width);
        this.size.height = ModelUtils_1.ModelUtils.getlUnitValue(units, this.size.height);
    };
    return NativeShape;
}(NativeItem));
exports.NativeShape = NativeShape;
var NativeConnector = (function (_super) {
    __extends(NativeConnector, _super);
    function NativeConnector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NativeConnector.prototype.applyUnitsCore = function (units) {
        this.points.forEach(function (pt) {
            pt.x = ModelUtils_1.ModelUtils.getlUnitValue(units, pt.x);
            pt.y = ModelUtils_1.ModelUtils.getlUnitValue(units, pt.y);
        });
    };
    return NativeConnector;
}(NativeItem));
exports.NativeConnector = NativeConnector;
//# sourceMappingURL=NativeItem.js.map