"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputPosition = void 0;
var InputPositionProperties_1 = require("./InputPositionProperties");
var Data_1 = require("../Utils/Data");
var InputPosition = (function () {
    function InputPosition(selection) {
        this.selection = selection;
        this.initialProperties = new InputPositionProperties_1.InputPositionProperties(this.selection);
        this.defaultProperties = new InputPositionProperties_1.InputPositionProperties(this.selection, this.initialProperties, true);
        this.currentProperties = new InputPositionProperties_1.InputPositionProperties(this.selection, this.defaultProperties);
    }
    InputPosition.prototype.initialize = function () {
        this.reset();
        this.defaultProperties.reset();
    };
    InputPosition.prototype.reset = function () {
        this.currentProperties.reset();
    };
    InputPosition.prototype.getDefaultConnectorProperties = function () {
        return this.defaultProperties.getConnectorProperties();
    };
    InputPosition.prototype.getDefaultConnectorPropertyValue = function (propertyName) {
        return this.defaultProperties.getConnectorPropertyValue(propertyName);
    };
    InputPosition.prototype.getCurrentConnectorPropertyValue = function (propertyName) {
        return this.currentProperties.getConnectorPropertyValue(propertyName);
    };
    InputPosition.prototype.setConnectorPropertyValue = function (propertyName, value) {
        this.currentProperties.setConnectorPropertyValue(propertyName, value);
        if (this.selection.isEmpty(true))
            this.defaultProperties.setConnectorPropertyValue(propertyName, value);
    };
    InputPosition.prototype.setInitialConnectorProperties = function (properties) {
        this.defaultProperties.reset();
        this.currentProperties.reset();
        for (var propertyName in properties)
            if (Object.prototype.hasOwnProperty.call(properties, propertyName))
                this.initialProperties.setConnectorPropertyValue(propertyName, properties[propertyName]);
    };
    InputPosition.prototype.getDefaultStyle = function () {
        return this.defaultProperties.getStyle();
    };
    InputPosition.prototype.getDefaultStylePropertyValue = function (propertyName) {
        return this.defaultProperties.getStylePropertyValue(propertyName);
    };
    InputPosition.prototype.getDefaultTextStyle = function () {
        return this.defaultProperties.getTextStyle();
    };
    InputPosition.prototype.getDefaultTextStylePropertyValue = function (propertyName) {
        return this.defaultProperties.getTextStylePropertyValue(propertyName);
    };
    InputPosition.prototype.getCurrentStylePropertyValue = function (propertyName) {
        return this.currentProperties.getStylePropertyValue(propertyName);
    };
    InputPosition.prototype.getCurrentTextStylePropertyValue = function (propertyName) {
        return this.currentProperties.getTextStylePropertyValue(propertyName);
    };
    InputPosition.prototype.setStylePropertyValue = function (propertyName, value) {
        this.currentProperties.setStylePropertyValue(propertyName, value);
        if (this.selection.isEmpty(true))
            this.defaultProperties.setStylePropertyValue(propertyName, value);
    };
    InputPosition.prototype.setTextStylePropertyValue = function (propertyName, value) {
        this.currentProperties.setTextStylePropertyValue(propertyName, value);
        if (this.selection.isEmpty(true))
            this.defaultProperties.setTextStylePropertyValue(propertyName, value);
    };
    InputPosition.prototype.setInitialStyleProperties = function (style) {
        this.defaultProperties.reset();
        this.currentProperties.reset();
        var styleObj = typeof style === "string" ? Data_1.Data.cssTextToObject(style) : style;
        for (var propertyName in styleObj)
            if (Object.prototype.hasOwnProperty.call(styleObj, propertyName))
                this.initialProperties.setStylePropertyValue(propertyName, styleObj[propertyName]);
    };
    InputPosition.prototype.setInitialTextStyleProperties = function (style) {
        this.defaultProperties.reset();
        this.currentProperties.reset();
        var styleObj = typeof style === "string" ? Data_1.Data.cssTextToObject(style) : style;
        for (var propertyName in styleObj)
            if (Object.prototype.hasOwnProperty.call(styleObj, propertyName))
                this.initialProperties.setTextStylePropertyValue(propertyName, styleObj[propertyName]);
    };
    InputPosition.prototype.notifySelectionChanged = function (selection) {
        this.reset();
    };
    return InputPosition;
}());
exports.InputPosition = InputPosition;
//# sourceMappingURL=InputPosition.js.map