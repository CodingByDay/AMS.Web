﻿/**
* DevExpress Dashboard (card-row.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardSparklineRow = exports.CardRow = exports.CardRowBase = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../../serializable-model");
const card_row_element_1 = require("./card-row-element");
const _card_row_1 = require("./metadata/_card-row");
class CardRowBase extends serializable_model_1.TypedSerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _card_row_1.cardRowBaseSerializationInfo;
    }
}
exports.CardRowBase = CardRowBase;
class CardRow extends CardRowBase {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.elements = analytics_utils_1.deserializeArray(modelJson.CardRowElements, (item) => this.createRowElement(item, serializer));
    }
    createRowElement(elementJSON, serializer) {
        var itemType = elementJSON['@ItemType'];
        return new CardRow.elementItemTypes[itemType].constructor(elementJSON, serializer);
    }
    getInfo() {
        return _card_row_1.cardRowSerializationInfo;
    }
    _getDefaultItemType() {
        return 'CardRow';
    }
}
exports.CardRow = CardRow;
CardRow.elementItemTypes = {
    'CardRowDataElement': {
        constructor: card_row_element_1.CardRowDataElement
    },
    'CardRowIndicatorElement': {
        constructor: card_row_element_1.CardRowIndicatorElement
    },
    'CardRowTextElement': {
        constructor: card_row_element_1.CardRowTextElement
    }
};
class CardSparklineRow extends CardRowBase {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _card_row_1.cardSparklineRowSerializationInfo;
    }
    _getDefaultItemType() {
        return 'CardSparklineRow';
    }
}
exports.CardSparklineRow = CardSparklineRow;
