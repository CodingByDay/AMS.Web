﻿/**
* DevExpress Dashboard (card.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _data_field_1 = require("../../data-sources/_data-field");
const kpi_element_1 = require("../kpi/kpi-element");
const card_layout_template_1 = require("./card-layout-template");
const _card_1 = require("./metadata/_card");
var emptyCardTemplate = new card_layout_template_1.CardEmptyLayoutTemplate();
class Card extends kpi_element_1.KpiElement {
    constructor(dataItemProvider, modelJson = {}, serializer) {
        super(dataItemProvider, modelJson, serializer);
        this.layoutTemplate = ko.observable();
        ko.computed(() => {
            this.__targetValue._specifics.skipFormatting = !!this.__actualValue.uniqueName();
        });
        this.layoutTemplate(Card._createTemplate(modelJson.LayoutTemplate, serializer));
    }
    static _createTemplate(jsonModel, serializer = new analytics_utils_1.ModelSerializer()) {
        return jsonModel ? new Card.templateTypes[jsonModel['@Type']](jsonModel, serializer) : emptyCardTemplate;
    }
    _getInfoCore() {
        return _card_1.cardSerializationsInfo;
    }
    _isTypeEmpty() {
        return this.layoutTemplate().getType() === emptyCardTemplate.getType();
    }
    _setTemplateSwitchingOptions(newTemplate) {
        if (this._isTypeEmpty()) {
            this._switchToCardDeltaOptions();
        }
        else if (newTemplate.getType() === emptyCardTemplate.getType()) {
            this._switchToKpiDeltaOptions();
        }
        this.layoutTemplate(newTemplate);
    }
    _switchToCardDeltaOptions() {
        this.cardDeltaOptions.resultIndicationMode(this.deltaOptions.resultIndicationMode());
        this.cardDeltaOptions.resultIndicationThreshold(this.deltaOptions.resultIndicationThreshold());
        this.cardDeltaOptions.resultIndicationThresholdType(this.deltaOptions.resultIndicationThresholdType());
    }
    _switchToKpiDeltaOptions() {
        this.deltaOptions.resultIndicationMode(this.cardDeltaOptions.resultIndicationMode());
        this.deltaOptions.resultIndicationThreshold(this.cardDeltaOptions.resultIndicationThreshold());
        this.deltaOptions.resultIndicationThresholdType(this.cardDeltaOptions.resultIndicationThresholdType());
    }
    _getDefaultItemType() { return 'Card'; }
    _getBindingModel() {
        let baseModel = super._getBindingModel();
        baseModel.forEach(property => property.fieldConstraint = (dataField) => !_data_field_1.DataField.isMeasure(dataField) || _data_field_1.DataField.isNumeric(dataField));
        return baseModel;
    }
}
exports.Card = Card;
Card.templateTypes = {
    Stretched: card_layout_template_1.CardStretchedLayoutTemplate,
    Centered: card_layout_template_1.CardCenteredLayoutTemplate,
    Compact: card_layout_template_1.CardCompactLayoutTemplate,
    Lightweight: card_layout_template_1.CardLightweightLayoutTemplate,
    Custom: card_layout_template_1.CardCustomLayoutTemplate
};
