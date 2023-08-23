﻿/**
* DevExpress Dashboard (_field-picker.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldListPicker = void 0;
const analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
const ko = require("knockout");
const _expression_editor_item_provider_1 = require("../expression-editor/_expression-editor-item-provider");
class FieldListPicker {
    constructor(dataSourceBrowser, _value, model, disabled) {
        this.disabled = disabled;
        var self = this;
        this.treeListController = new DashboardTreeListFieldController(_value);
        this.pathToMembers = ko.computed(() => [model.dataSource(), model.dataMember()].filter(item => !!item).join('.'));
        this.pathToMembers.subscribe(() => _value(null));
        this.displayValue = ko.computed(() => {
            return !!_value() ? _value() : '';
        });
        this.value = ko.computed({
            read: () => {
                return _value();
            },
            write: (val) => {
                if (!val) {
                    _value(null);
                }
            }
        });
        this.itemsProvider = new _expression_editor_item_provider_1.ExpressionEditorItemsProvider(dataSourceBrowser, dataSourceBrowser, dataSourceBrowser, dataSourceBrowser.parameters && dataSourceBrowser.parameters(), model.dataSource, model.dataMember);
    }
}
exports.FieldListPicker = FieldListPicker;
class DashboardTreeListFieldController extends analytics_widgets_internal_1.TreeListController {
    constructor(_value) {
        super();
        this._value = _value;
    }
    hasItems(item) {
        return item['hasItems'];
    }
    canSelect(value) {
        return !value.hasItems;
    }
    select(value) {
        this._value(value.data['field'].dataMember());
    }
}
