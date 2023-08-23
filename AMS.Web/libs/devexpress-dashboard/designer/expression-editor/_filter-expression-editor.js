﻿/**
* DevExpress Dashboard (_filter-expression-editor.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterExpressionEditorViewModel = void 0;
const analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
const analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
const ko = require("knockout");
class FilterExpressionEditorViewModel {
    constructor(params) {
        this.params = params;
        this.editorTemplate = 'dx-filtereditor-popup';
        this.criteriaString = ko.observable();
        this.editor = new analytics_widgets_1.FilterEditor(params.options, params.fieldListProvider, false, params.displayNameProvider);
        ko.computed(() => {
            var displayExpressionConverter = new analytics_internal_1.DisplayExpressionConverter(params.displayNameProvider);
            displayExpressionConverter.toDisplayExpression(params.options().path(), params.options().value()).done((result) => {
                this.criteriaString(result);
            }).fail(() => {
                this.criteriaString(params.options().value());
            });
        });
    }
    edit() {
        this.editor.popupVisible(true);
    }
    remove() {
        this.params.options().value(null);
    }
}
exports.FilterExpressionEditorViewModel = FilterExpressionEditorViewModel;
