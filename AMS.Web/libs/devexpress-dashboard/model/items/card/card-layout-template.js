﻿/**
* DevExpress Dashboard (card-layout-template.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardCompactLayoutTemplate = exports.CardLightweightLayoutTemplate = exports.CardStretchedLayoutTemplate = exports.CardCenteredLayoutTemplate = exports.CardCustomLayoutTemplate = exports.CardEmptyLayoutTemplate = exports.CardLayoutTemplate = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const serializable_model_1 = require("../../serializable-model");
const _card_layout_template_1 = require("./metadata/_card-layout-template");
var cardLayoutTypes = {
    Stretched: 'Stretched',
    Centered: 'Centered',
    Compact: 'Compact',
    Lightweight: 'Lightweight',
    Custom: 'Custom',
    None: 'None'
};
var cardLayoutTemplateNames = {
    Stretched: 'DashboardStringId.CardLayoutTemplateStretchedCaption',
    Centered: 'DashboardStringId.CardLayoutTemplateCenteredCaption',
    Compact: 'DashboardStringId.CardLayoutTemplateCompactCaption',
    Lightweight: 'DashboardStringId.CardLayoutTemplateLightweightCaption',
    Custom: 'DashboardStringId.CardLayoutTemplateCustomCaption',
    None: 'DashboardStringId.CardLayoutTemplateNoneCaption'
};
class CardLayoutTemplate extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _card_layout_template_1.templateSerializationInfo;
    }
    _resetToDefaults() { }
    clone() {
        var clonedTemplate = this._createInstance();
        this._clone(this, clonedTemplate);
        return clonedTemplate;
    }
    _clone(target, source) {
        var serializer = new analytics_utils_1.ModelSerializer();
        serializer.deserialize(source, serializer.serialize(target));
    }
}
exports.CardLayoutTemplate = CardLayoutTemplate;
class CardEmptyLayoutTemplate extends CardLayoutTemplate {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.isEmpty = ko.observable(true);
        this.title = cardLayoutTemplateNames[this.getType()];
    }
    _collectProperties(dimensionNames) {
        return [];
    }
    getType() {
        return cardLayoutTypes.None;
    }
    getInfo() {
        return [];
    }
    _createInstance() {
        return this;
    }
}
exports.CardEmptyLayoutTemplate = CardEmptyLayoutTemplate;
class CardCustomLayoutTemplate extends CardLayoutTemplate {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        !this.type() && this.type(cardLayoutTypes.Custom);
        this.title = cardLayoutTemplateNames[this.type()];
    }
    getInfo() {
        return _card_layout_template_1.customTemplateSerializationInfo;
    }
    _collectProperties(dimensionNames) {
        return [];
    }
    _resetToDefaults() { }
    getType() {
        return this.type();
    }
    _createInstance() {
        return new CardCustomLayoutTemplate();
    }
}
exports.CardCustomLayoutTemplate = CardCustomLayoutTemplate;
class CardCenteredLayoutTemplate extends CardLayoutTemplate {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        !this.type() && this.type(cardLayoutTypes.Centered);
        this.title = cardLayoutTemplateNames[this.type()];
    }
    getInfo() {
        return _card_layout_template_1.deltaCompactTemplateSerializationInfo;
    }
    _collectProperties(dimensionNames) {
        return [
            this.mainValue._createEditorModel(dimensionNames),
            this.subValue._createEditorModel(dimensionNames),
            this.bottomValue._createEditorModel(dimensionNames),
            this.bottomSubValue1._createEditorModel(dimensionNames),
            this.bottomSubValue2._createEditorModel(dimensionNames),
            this.deltaIndicator._createEditorModel(dimensionNames),
            this.sparkline._createEditorModel(dimensionNames)
        ];
    }
    _resetToDefaults() {
        this.mainValue._initDefault(true, 'Title');
        this.subValue._initDefault(true, 'Subtitle');
        this.bottomValue._initDefault(true, 'ActualValue');
        this.bottomSubValue1._initDefault(true, 'AbsoluteVariation');
        this.bottomSubValue2._initDefault(true, 'PercentVariation');
        this.deltaIndicator._initDefault(true);
        this.sparkline._initDefault(true);
        this.maxWidth(270);
    }
    getType() {
        return this.type();
    }
    _createInstance() {
        return new CardCenteredLayoutTemplate();
    }
}
exports.CardCenteredLayoutTemplate = CardCenteredLayoutTemplate;
class CardStretchedLayoutTemplate extends CardLayoutTemplate {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        !this.type() && this.type(cardLayoutTypes.Stretched);
        this.title = cardLayoutTemplateNames[this.type()];
    }
    getInfo() {
        return _card_layout_template_1.autofitTemplateSerializationInfo;
    }
    _collectProperties(dimensionNames) {
        return [
            this.topValue._createEditorModel(dimensionNames),
            this.mainValue._createEditorModel(dimensionNames),
            this.subValue._createEditorModel(dimensionNames),
            this.bottomValue1._createEditorModel(dimensionNames),
            this.bottomValue2._createEditorModel(dimensionNames),
            this.deltaIndicator._createEditorModel(dimensionNames),
            this.sparkline._createEditorModel(dimensionNames)
        ];
    }
    _resetToDefaults() {
        this.topValue._initDefault(true, 'ActualValue');
        this.mainValue._initDefault(true, 'Title');
        this.subValue._initDefault(true, 'Subtitle');
        this.bottomValue1._initDefault(true, 'PercentVariation');
        this.bottomValue2._initDefault(true, 'AbsoluteVariation');
        this.deltaIndicator._initDefault(true);
        this.sparkline._initDefault(true);
    }
    getType() {
        return this.type();
    }
    _createInstance() {
        return new CardStretchedLayoutTemplate();
    }
}
exports.CardStretchedLayoutTemplate = CardStretchedLayoutTemplate;
class CardLightweightLayoutTemplate extends CardLayoutTemplate {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        !this.type() && this.type(cardLayoutTypes.Lightweight);
        this.title = cardLayoutTemplateNames[this.type()];
    }
    getInfo() {
        return _card_layout_template_1.nameValueTemplateSerializationInfo;
    }
    _collectProperties(dimensionNames) {
        return [
            this.mainValue._createEditorModel(dimensionNames),
            this.subValue._createEditorModel(dimensionNames),
            this.bottomValue._createEditorModel(dimensionNames),
            this.deltaIndicator._createEditorModel(dimensionNames),
            this.sparkline._createEditorModel(dimensionNames)
        ];
    }
    _resetToDefaults() {
        this.mainValue._initDefault(true, 'ActualValue');
        this.subValue._initDefault(true, 'Title');
        this.bottomValue._initDefault(true, 'Subtitle');
        this.deltaIndicator._initDefault(false);
        this.sparkline._initDefault(false);
    }
    getType() {
        return this.type();
    }
    _createInstance() {
        return new CardLightweightLayoutTemplate();
    }
}
exports.CardLightweightLayoutTemplate = CardLightweightLayoutTemplate;
class CardCompactLayoutTemplate extends CardLayoutTemplate {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        !this.type() && this.type(cardLayoutTypes.Compact);
        this.title = cardLayoutTemplateNames[this.type()];
    }
    getInfo() {
        return _card_layout_template_1.deltaCompactTemplateSerializationInfo;
    }
    _collectProperties(dimensionNames) {
        return [
            this.mainValue._createEditorModel(dimensionNames),
            this.subValue._createEditorModel(dimensionNames),
            this.bottomValue._createEditorModel(dimensionNames),
            this.bottomSubValue1._createEditorModel(dimensionNames),
            this.bottomSubValue2._createEditorModel(dimensionNames),
            this.deltaIndicator._createEditorModel(dimensionNames),
            this.sparkline._createEditorModel(dimensionNames)
        ];
    }
    _resetToDefaults() {
        this.mainValue._initDefault(true, 'Title');
        this.subValue._initDefault(true, 'Subtitle');
        this.bottomValue._initDefault(true, 'ActualValue');
        this.bottomSubValue1._initDefault(true, 'AbsoluteVariation');
        this.bottomSubValue2._initDefault(true, 'PercentVariation');
        this.deltaIndicator._initDefault(true);
        this.sparkline._initDefault(true);
        this.maxWidth(270);
    }
    getType() {
        return this.type();
    }
    _createInstance() {
        return new CardCompactLayoutTemplate();
    }
}
exports.CardCompactLayoutTemplate = CardCompactLayoutTemplate;
