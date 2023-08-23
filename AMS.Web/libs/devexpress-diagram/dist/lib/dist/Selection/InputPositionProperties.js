"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputPositionProperties = void 0;
var ConnectorProperties_1 = require("../Model/Connectors/ConnectorProperties");
var Style_1 = require("../Model/Style");
var InputPositionProperties = (function () {
    function InputPositionProperties(selection, baseProperties, disableMergingStyles) {
        this.selection = selection;
        this.baseProperties = baseProperties;
        this.disableMergingStyles = disableMergingStyles;
        this.selection = selection;
    }
    InputPositionProperties.prototype.reset = function () {
        this.connectorProperties = null;
        this.style = null;
        this.textStyle = null;
    };
    InputPositionProperties.prototype.getConnectorProperties = function () {
        if (!this.connectorProperties) {
            this.connectorProperties = this.baseProperties ? this.baseProperties.getConnectorProperties().clone() : new ConnectorProperties_1.ConnectorProperties();
            this.updateConnectorProperties(this.connectorProperties);
        }
        return this.connectorProperties;
    };
    InputPositionProperties.prototype.getConnectorPropertyValue = function (propertyName) {
        return this.getConnectorProperties()[propertyName];
    };
    InputPositionProperties.prototype.setConnectorPropertyValue = function (propertyName, value) {
        this.getConnectorProperties()[propertyName] = value;
    };
    InputPositionProperties.prototype.getStyle = function () {
        if (!this.style) {
            this.style = this.baseProperties ? this.baseProperties.getStyle().clone() : new Style_1.Style();
            if (!this.disableMergingStyles)
                this.updateStyle(this.style, "style");
        }
        return this.style;
    };
    InputPositionProperties.prototype.getStylePropertyValue = function (propertyName) {
        return this.getStyle()[propertyName];
    };
    InputPositionProperties.prototype.setStylePropertyValue = function (propertyName, value) {
        this.getStyle()[propertyName] = value;
    };
    InputPositionProperties.prototype.getTextStyle = function () {
        if (!this.textStyle) {
            this.textStyle = this.baseProperties ? this.baseProperties.getTextStyle().clone() : new Style_1.TextStyle();
            if (!this.disableMergingStyles)
                this.updateStyle(this.textStyle, "styleText");
        }
        return this.textStyle;
    };
    InputPositionProperties.prototype.getTextStylePropertyValue = function (propertyName) {
        return this.getTextStyle()[propertyName];
    };
    InputPositionProperties.prototype.setTextStylePropertyValue = function (propertyName, value) {
        this.getTextStyle()[propertyName] = value;
    };
    InputPositionProperties.prototype.updateConnectorProperties = function (properties) {
        var _this = this;
        var connectors = this.selection.getSelectedConnectors(true);
        properties.forEach(function (propertyName) {
            _this.updatePropertyValue(properties, connectors, function (item) { return item["properties"]; }, propertyName);
        });
    };
    InputPositionProperties.prototype.updateStyle = function (style, stylePropertyName) {
        var _this = this;
        var items = this.selection.getSelectedItems(true);
        style.forEach(function (propertyName) {
            _this.updatePropertyValue(style, items, function (item) { return item[stylePropertyName]; }, propertyName);
        });
    };
    InputPositionProperties.prototype.updatePropertyValue = function (destObj, items, getSrcObj, propertyName) {
        var value;
        var valueAssigned = false;
        items.forEach(function (item) {
            var obj = getSrcObj(item);
            var propertyValue = obj[propertyName];
            if (value === undefined && propertyValue !== undefined) {
                value = propertyValue;
                valueAssigned = true;
            }
            else if (valueAssigned && value !== propertyValue) {
                value = undefined;
                return;
            }
        });
        if (valueAssigned)
            destObj[propertyName] = value;
    };
    return InputPositionProperties;
}());
exports.InputPositionProperties = InputPositionProperties;
//# sourceMappingURL=InputPositionProperties.js.map