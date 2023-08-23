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
exports.DataSourceEdgeItem = exports.DataSourceNodeItem = exports.DataSourceItem = void 0;
var Connector_1 = require("../Model/Connectors/Connector");
var DataSourceItem = (function () {
    function DataSourceItem(sourceKey, key, dataObj) {
        this.sourceKey = sourceKey;
        this.key = key;
        this.dataObj = dataObj;
    }
    return DataSourceItem;
}());
exports.DataSourceItem = DataSourceItem;
var DataSourceNodeItem = (function (_super) {
    __extends(DataSourceNodeItem, _super);
    function DataSourceNodeItem(sourceKey, key, dataObj, type, text, parentDataObj, containerKey, containerDataObj) {
        var _this = _super.call(this, sourceKey, key, dataObj) || this;
        _this.type = type;
        _this.text = text;
        _this.parentDataObj = parentDataObj;
        _this.containerKey = containerKey;
        _this.containerDataObj = containerDataObj;
        return _this;
    }
    return DataSourceNodeItem;
}(DataSourceItem));
exports.DataSourceNodeItem = DataSourceNodeItem;
var DataSourceEdgeItem = (function (_super) {
    __extends(DataSourceEdgeItem, _super);
    function DataSourceEdgeItem(sourceKey, key, dataObj, from, to) {
        var _this = _super.call(this, sourceKey, key, dataObj) || this;
        _this.sourceKey = sourceKey;
        _this.from = from;
        _this.to = to;
        return _this;
    }
    Object.defineProperty(DataSourceEdgeItem.prototype, "text", {
        get: function () {
            return this.texts && this.texts[Connector_1.CONNECTOR_DEFAULT_TEXT_POSITION];
        },
        enumerable: false,
        configurable: true
    });
    return DataSourceEdgeItem;
}(DataSourceItem));
exports.DataSourceEdgeItem = DataSourceEdgeItem;
//# sourceMappingURL=DataSourceItems.js.map