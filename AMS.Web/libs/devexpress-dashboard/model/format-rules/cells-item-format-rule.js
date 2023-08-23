﻿/**
* DevExpress Dashboard (cells-item-format-rule.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellsItemFormatRule = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const dashboard_item_format_rule_1 = require("./dashboard-item-format-rule");
const _cells_item_format_rule_1 = require("./metadata/_cells-item-format-rule");
class CellsItemFormatRule extends dashboard_item_format_rule_1.DashboardItemFormatRule {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.dataItemApplyToName = ko.computed({
            read: () => this._dataItemApplyToName() || this.dataItemName(),
            write: (val) => this._dataItemApplyToName(val)
        });
    }
    getInfo() {
        return _cells_item_format_rule_1.cellsItemFormatRuleSerializationsInfo;
    }
}
exports.CellsItemFormatRule = CellsItemFormatRule;
