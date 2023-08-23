﻿/**
* DevExpress Dashboard (card-layout.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardLayout = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const serializable_model_1 = require("../../serializable-model");
const card_row_1 = require("./card-row");
const _card_layout_1 = require("./metadata/_card-layout");
class CardLayout extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.templateID = ko.observable(-1);
        this.rows = analytics_utils_1.deserializeArray(modelJson.CardRows, (item) => { return this.createRow(item, serializer); });
    }
    createRow(elementJSON, serializer) {
        var itemType = elementJSON['@ItemType'];
        return new CardLayout.rowTypes[itemType].constructor(elementJSON, serializer);
    }
    getInfo() {
        return _card_layout_1.cardLayoutSerializationInfo;
    }
    grabFrom(newLayout) {
        this.minWidth = newLayout.minWidth;
        this.maxWidth = newLayout.maxWidth;
        this.rows(newLayout.rows());
    }
}
exports.CardLayout = CardLayout;
CardLayout.rowTypes = {
    'CardRow': {
        constructor: card_row_1.CardRow
    },
    'CardSparklineRow': {
        constructor: card_row_1.CardSparklineRow
    }
};
