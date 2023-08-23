﻿/**
* DevExpress Dashboard (card-row-element.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRowIndicatorElement = exports.CardRowTextElement = exports.CardRowDataElement = exports.CardRowTextElementBase = exports.CardRowElement = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const serializable_model_1 = require("../../serializable-model");
const _card_row_element_1 = require("./metadata/_card-row-element");
class CardRowElement extends serializable_model_1.TypedSerializableModel {
    constructor(modelJson, serializer) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _card_row_element_1.cardRowElementSerializationsInfo;
    }
}
exports.CardRowElement = CardRowElement;
class CardRowTextElementBase extends CardRowElement {
    constructor(modelJson, serializer) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _card_row_element_1.cardRowTextElementBaseSerializationInfo;
    }
}
exports.CardRowTextElementBase = CardRowTextElementBase;
class CardRowDataElement extends CardRowTextElementBase {
    constructor(modelJson, serializer) {
        super(modelJson, serializer);
        this.title = ko.computed(() => this.valueType());
    }
    getInfo() {
        return _card_row_element_1.cardRowDataElementSerializationInfo;
    }
    _getDefaultItemType() {
        return 'CardRowDataElement';
    }
}
exports.CardRowDataElement = CardRowDataElement;
class CardRowTextElement extends CardRowTextElementBase {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _card_row_element_1.cardRowTextElementSerializationInfo;
    }
    _getDefaultItemType() {
        return 'CardRowTextElement';
    }
}
exports.CardRowTextElement = CardRowTextElement;
class CardRowIndicatorElement extends CardRowElement {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _card_row_element_1.cardRowIndicatorElementSerializationInfo;
    }
    _getDefaultItemType() {
        return 'CardRowIndicatorElement';
    }
}
exports.CardRowIndicatorElement = CardRowIndicatorElement;
