﻿/**
* DevExpress Dashboard (measure-definition.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureDefinition = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const string_1 = require("devextreme/core/utils/string");
const ko = require("knockout");
const _default_1 = require("../../data/localization/_default");
const _measure_1 = require("../data-item/metadata/_measure");
const serializable_model_1 = require("../serializable-model");
const _color_scheme_entry_1 = require("./metadata/_color-scheme-entry");
const _dimension_definition_1 = require("./_dimension-definition");
class MeasureDefinition extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer, _color_scheme_entry_1.measureKeySerializationInfo);
        this.definitions = analytics_utils_1.deserializeArray(modelJson.Definitions, (item) => new _dimension_definition_1.DimensionDefinition(item, serializer));
        this.displayText = ko.computed(() => {
            if (!!this.expression())
                return _default_1.getLocalizationById('DashboardWebStringId.Calculations.Expression');
            let prefix = !!this.calculation.calculation() && _default_1.getLocalizationById(this.calculation.calculation().name);
            let postfix = ' (' + _default_1.getLocalizationById(_measure_1.summaryTypeDict[this.summaryType() || 'Sum']) + ')';
            let name = ((prefix && (prefix + ' ')) || '') + this.dataMember() + postfix;
            if (this.filterString())
                return MeasureDefinition._constructFilteredName(name);
            return name;
        });
    }
    static _constructFilteredName(baseName) {
        return string_1.format(_default_1.getLocalizationById('DashboardStringId.MeasureFilterCaptionFormatString'), baseName);
    }
    getInfo() {
        return _color_scheme_entry_1.measureKeySerializationInfo;
    }
    get _id() {
        let serializer = new analytics_utils_1.ModelSerializer({ useRefs: false });
        return JSON.stringify(serializer.serialize(this, _color_scheme_entry_1.measureKeySerializationInfo));
    }
}
exports.MeasureDefinition = MeasureDefinition;
