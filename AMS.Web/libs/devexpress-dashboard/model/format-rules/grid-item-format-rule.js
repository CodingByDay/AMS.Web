﻿/**
* DevExpress Dashboard (grid-item-format-rule.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridItemFormatRule = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const cells_item_format_rule_1 = require("./cells-item-format-rule");
const _grid_item_format_rule_1 = require("./metadata/_grid-item-format-rule");
class GridItemFormatRule extends cells_item_format_rule_1.CellsItemFormatRule {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _grid_item_format_rule_1.gridItemFormatRuleSerializationsInfo;
    }
    _getDefaultItemType() {
        return 'GridItemFormatRule';
    }
}
exports.GridItemFormatRule = GridItemFormatRule;
