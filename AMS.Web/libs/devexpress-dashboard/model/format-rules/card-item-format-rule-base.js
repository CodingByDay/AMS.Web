﻿/**
* DevExpress Dashboard (card-item-format-rule-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardItemFormatRuleBase = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const dashboard_item_format_rule_1 = require("./dashboard-item-format-rule");
class CardItemFormatRuleBase extends dashboard_item_format_rule_1.DashboardItemFormatRule {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.layoutItemApplyTo = ko.pureComputed({
            read: () => {
                return this.cardLayoutElement.elementTypeApplyTo();
            },
            write: (newLayoutElement) => {
                if (!(newLayoutElement === 'Dimension' || newLayoutElement === 'Text'))
                    this.cardLayoutElement.elementTypeApplyTo(newLayoutElement);
            }
        });
    }
}
exports.CardItemFormatRuleBase = CardItemFormatRuleBase;
