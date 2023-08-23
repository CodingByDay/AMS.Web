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
exports.Alignment = exports.DataLayoutOrientation = exports.LogicalDirectionKind = exports.TreeLayoutSettings = exports.LayoutSettings = void 0;
var Connector_1 = require("../Model/Connectors/Connector");
var LayoutSettings = (function () {
    function LayoutSettings(gridSize) {
        this.orientation = DataLayoutOrientation.Vertical;
        this.direction = LogicalDirectionKind.Forward;
        var baseSpacing = (gridSize && gridSize * 2 > Connector_1.Connector.minOffset) ? gridSize * 2 : Connector_1.Connector.minOffset;
        this.columnSpacing = baseSpacing;
        this.layerSpacing = baseSpacing * 2;
        this.containerPadding = baseSpacing * 2;
        this.componentSpacing = baseSpacing * 2;
    }
    return LayoutSettings;
}());
exports.LayoutSettings = LayoutSettings;
var TreeLayoutSettings = (function (_super) {
    __extends(TreeLayoutSettings, _super);
    function TreeLayoutSettings(gridSize) {
        var _this = _super.call(this, gridSize) || this;
        _this.alignment = Alignment.Center;
        _this.subTreeColumnSpacing = _this.componentSpacing / 2;
        return _this;
    }
    return TreeLayoutSettings;
}(LayoutSettings));
exports.TreeLayoutSettings = TreeLayoutSettings;
var LogicalDirectionKind;
(function (LogicalDirectionKind) {
    LogicalDirectionKind[LogicalDirectionKind["Backward"] = 0] = "Backward";
    LogicalDirectionKind[LogicalDirectionKind["Forward"] = 1] = "Forward";
})(LogicalDirectionKind = exports.LogicalDirectionKind || (exports.LogicalDirectionKind = {}));
var DataLayoutOrientation;
(function (DataLayoutOrientation) {
    DataLayoutOrientation[DataLayoutOrientation["Horizontal"] = 0] = "Horizontal";
    DataLayoutOrientation[DataLayoutOrientation["Vertical"] = 1] = "Vertical";
})(DataLayoutOrientation = exports.DataLayoutOrientation || (exports.DataLayoutOrientation = {}));
var Alignment;
(function (Alignment) {
    Alignment[Alignment["Left"] = 0] = "Left";
    Alignment[Alignment["Center"] = 1] = "Center";
})(Alignment = exports.Alignment || (exports.Alignment = {}));
//# sourceMappingURL=LayoutSettings.js.map