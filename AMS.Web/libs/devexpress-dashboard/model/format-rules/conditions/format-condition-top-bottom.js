﻿/**
* DevExpress Dashboard (format-condition-top-bottom.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatConditionTopBottom = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const format_condition_style_base_1 = require("./format-condition-style-base");
const _format_condition_top_bottom_1 = require("./metadata/_format-condition-top-bottom");
class FormatConditionTopBottom extends format_condition_style_base_1.FormatConditionStyleBase {
    constructor(modelJson, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.getSpecificType = () => this.topBottom();
        this.setSpecificType = (type) => {
            this.topBottom(type);
        };
        this._actualRankType = ko.pureComputed({
            read: () => this.rankType() === 'Automatic' ? 'Number' : this.rankType(),
            write: value => this.rankType(value)
        });
    }
    _getInfoButStyleSettings() {
        return _format_condition_top_bottom_1.formatConditionTopBottomSerializationsInfo;
    }
}
exports.FormatConditionTopBottom = FormatConditionTopBottom;
