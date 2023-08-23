/**
* DevExpress Dashboard (_simple-filter-editor-view-model.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleFilterExpressionEditorViewModel = void 0;
const ko = require("knockout");
const _simple_filter_editor_1 = require("./_simple-filter-editor");
class SimpleFilterExpressionEditorViewModel {
    constructor(options) {
        this.options = options;
        this.editorTemplate = 'dx-simple-filter-popup';
        this.editor = new _simple_filter_editor_1.SimpleFilterEditor(options.dashboardItem, options.dataSourceBrowser);
        this.criteriaString = ko.computed(() => options.dashboardItem.filterString());
    }
    edit() {
        this.editor.popupVisible(true);
    }
    remove() {
        this.options.dashboardItem.filterString(null);
    }
}
exports.SimpleFilterExpressionEditorViewModel = SimpleFilterExpressionEditorViewModel;
