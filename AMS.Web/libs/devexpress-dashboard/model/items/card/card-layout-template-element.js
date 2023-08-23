﻿/**
* DevExpress Dashboard (card-layout-template-element.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardLayoutTemplateDataElement = exports.CardLayoutTemplateSparklineElement = exports.CardLayoutTemplateDeltaElement = exports.CardLayoutTemplateElementBase = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const serializable_model_1 = require("../../serializable-model");
const _card_layout_template_element_1 = require("./metadata/_card-layout-template-element");
class CardLayoutTemplateElementBase extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    _createEditorModel(dimensionNames) {
        return {
            title: this._getTitle(dimensionNames),
            checked: this.visible
        };
    }
    getInfo() {
        return _card_layout_template_element_1.cardLayoutTemplateElementBaseSerializationInfo;
    }
    _initDefault(visible = true, valueType = null, dimenstionIndex = 0) {
        this.visible(visible);
    }
}
exports.CardLayoutTemplateElementBase = CardLayoutTemplateElementBase;
class CardLayoutTemplateDeltaElement extends CardLayoutTemplateElementBase {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    _getTitle() {
        return ko.computed(() => _default_1.getLocalizationById(_card_layout_template_element_1.cardRowDataElementTypeValuesMapEx.DeltaIndicator));
    }
}
exports.CardLayoutTemplateDeltaElement = CardLayoutTemplateDeltaElement;
class CardLayoutTemplateSparklineElement extends CardLayoutTemplateElementBase {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    _getTitle() {
        return ko.computed(() => _default_1.getLocalizationById(_card_layout_template_element_1.cardRowDataElementTypeValuesMapEx.Sparkline));
    }
}
exports.CardLayoutTemplateSparklineElement = CardLayoutTemplateSparklineElement;
class CardLayoutTemplateDataElement extends CardLayoutTemplateElementBase {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    _getTitle(dimensionNames) {
        return ko.computed(() => {
            var res = _default_1.getLocalizationById(_card_layout_template_element_1.cardRowDataElementTypeValuesMapEx[this.valueType()]);
            if (this.valueType() === 'DimensionValue') {
                res += ' ' + (dimensionNames[this.dimensionIndex()] || ('[' + this.dimensionIndex() + ']'));
            }
            return res;
        });
    }
    getInfo() {
        return _card_layout_template_element_1.cardLayoutTemplateDataElementSerializationInfo;
    }
    _initDefault(visible, valueType, dimenstionIndex = 0) {
        super._initDefault(visible);
        this.valueType(valueType);
        this.dimensionIndex(dimenstionIndex);
    }
    _getEditorProperty(valueType, dimensionIndex = 0, dimensionNames) {
        var displayText = _default_1.getLocalizationById(_card_layout_template_element_1.cardRowDataElementTypeValuesMapEx[valueType]);
        if (valueType === 'DimensionValue')
            displayText += ' ' + dimensionNames[dimensionIndex];
        return { value: valueType, displayText: displayText, dimensionIndex: dimensionIndex, key: valueType + dimensionIndex };
    }
    _createEditorModel(dimensionNames) {
        var items = ['Title', 'Subtitle', 'ActualValue', 'TargetValue', 'AbsoluteVariation', 'PercentVariation', 'PercentOfTarget', 'CardName']
            .map((valueType) => this._getEditorProperty(valueType))
            .concat(dimensionNames.map((name, index) => this._getEditorProperty('DimensionValue', index, dimensionNames)));
        return Object.assign(Object.assign({}, super._createEditorModel(dimensionNames)), { lookupDataSource: items, selectedItem: ko.pureComputed({
                read: () => {
                    const selectedItem = items.filter(i => i.value === this.valueType() && i.dimensionIndex === this.dimensionIndex())[0];
                    return selectedItem && selectedItem.key;
                },
                write: (val) => {
                    const newValue = items.filter(i => i.key === val)[0];
                    this.valueType(newValue.value);
                    this.dimensionIndex(newValue.dimensionIndex);
                }
            }) });
    }
}
exports.CardLayoutTemplateDataElement = CardLayoutTemplateDataElement;
