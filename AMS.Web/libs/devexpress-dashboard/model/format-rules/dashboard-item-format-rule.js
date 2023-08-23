﻿/**
* DevExpress Dashboard (dashboard-item-format-rule.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardItemFormatRule = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _default_1 = require("../../data/localization/_default");
const serializable_model_1 = require("../serializable-model");
const _dashboard_item_format_rule_1 = require("./metadata/_dashboard-item-format-rule");
const icon_settings_1 = require("./style-settings/icon-settings");
class DashboardItemFormatRule extends serializable_model_1.TypedSerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.condition = ko.computed({
            read: () => {
                var info = _dashboard_item_format_rule_1.conditionTypes.filter(ct => this[ct.propertyName] && !this[ct.propertyName].isEmpty())[0];
                if (info) {
                    return this[info.propertyName];
                }
            },
            write: (newCondition) => {
                var info = _dashboard_item_format_rule_1.conditionTypes.filter(ct => newCondition instanceof ct.type)[0];
            }
        });
    }
    get _classCaption() {
        var info = _dashboard_item_format_rule_1.conditionTypes.filter(t => this.condition() instanceof t.type)[0];
        return info && (this.name() + ': ' + _default_1.getLocalizationById(info.displayName));
    }
    get _classId() {
        var info = _dashboard_item_format_rule_1.conditionTypes.filter(t => this.condition() instanceof t.type)[0];
        var id = info && info.propertyName;
        if (id === 'conditionRangeSet') {
            if (this.condition().actualStyles.filter(style => style instanceof icon_settings_1.IconSettings).length > 0) {
                id += '_icons';
            }
            else {
                id += '_colors';
            }
        }
        return id;
    }
    getInfo() {
        return _dashboard_item_format_rule_1.dashboardItemFormatRuleSerializationsInfo;
    }
    _changeConditionType(propertyName) {
        var condition = this[propertyName];
        var oldCondition = this.condition();
        condition.init();
        oldCondition && oldCondition.isEmpty(true);
    }
}
exports.DashboardItemFormatRule = DashboardItemFormatRule;
