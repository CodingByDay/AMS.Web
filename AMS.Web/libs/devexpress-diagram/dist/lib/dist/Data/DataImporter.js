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
exports.DataSourceEdgeDataImporter = exports.DataSourceNodeDataImporter = exports.DataSourceItemDataImporter = void 0;
var DataSourceItemDataImporter = (function () {
    function DataSourceItemDataImporter() {
        this.getKey = function (obj) { return obj["id"]; };
        this.setKey = function (obj, value) { obj["id"] = value; };
        this.getCustomData = undefined;
        this.setCustomData = undefined;
        this.getLocked = undefined;
        this.setLocked = undefined;
        this.getStyle = undefined;
        this.setStyle = undefined;
        this.getStyleText = undefined;
        this.setStyleText = undefined;
        this.getZIndex = undefined;
        this.setZIndex = undefined;
    }
    return DataSourceItemDataImporter;
}());
exports.DataSourceItemDataImporter = DataSourceItemDataImporter;
var DataSourceNodeDataImporter = (function (_super) {
    __extends(DataSourceNodeDataImporter, _super);
    function DataSourceNodeDataImporter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getType = undefined;
        _this.setType = undefined;
        _this.getText = undefined;
        _this.setText = undefined;
        _this.getImage = undefined;
        _this.setImage = undefined;
        _this.getLeft = undefined;
        _this.setLeft = undefined;
        _this.getTop = undefined;
        _this.setTop = undefined;
        _this.getWidth = undefined;
        _this.setWidth = undefined;
        _this.getHeight = undefined;
        _this.setHeight = undefined;
        _this.getChildren = undefined;
        _this.setChildren = undefined;
        _this.getParentKey = undefined;
        _this.setParentKey = undefined;
        _this.getItems = undefined;
        _this.setItems = undefined;
        _this.getContainerKey = undefined;
        _this.setContainerKey = undefined;
        return _this;
    }
    return DataSourceNodeDataImporter;
}(DataSourceItemDataImporter));
exports.DataSourceNodeDataImporter = DataSourceNodeDataImporter;
var DataSourceEdgeDataImporter = (function (_super) {
    __extends(DataSourceEdgeDataImporter, _super);
    function DataSourceEdgeDataImporter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getFrom = function (obj) { return obj["from"]; };
        _this.setFrom = function (obj, value) { obj["from"] = value; };
        _this.getFromPointIndex = undefined;
        _this.setFromPointIndex = undefined;
        _this.getTo = function (obj) { return obj["to"]; };
        _this.setTo = function (obj, value) { obj["to"] = value; };
        _this.getToPointIndex = undefined;
        _this.setToPointIndex = undefined;
        _this.getPoints = undefined;
        _this.setPoints = undefined;
        _this.getText = undefined;
        _this.setText = undefined;
        _this.getLineOption = undefined;
        _this.setLineOption = undefined;
        _this.getStartLineEnding = undefined;
        _this.setStartLineEnding = undefined;
        _this.getEndLineEnding = undefined;
        _this.setEndLineEnding = undefined;
        return _this;
    }
    return DataSourceEdgeDataImporter;
}(DataSourceItemDataImporter));
exports.DataSourceEdgeDataImporter = DataSourceEdgeDataImporter;
//# sourceMappingURL=DataImporter.js.map