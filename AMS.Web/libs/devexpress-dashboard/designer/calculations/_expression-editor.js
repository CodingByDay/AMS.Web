﻿/**
* DevExpress Dashboard (_expression-editor.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionEditorWrapper = exports.CalculationExpressionEditor = void 0;
const ko = require("knockout");
const _expression_editor_1 = require("../expression-editor/_expression-editor");
const _expression_editor_functions_1 = require("../expression-editor/_expression-editor-functions");
class CalculationExpressionEditor {
    constructor(params) {
        this.params = params;
        this.editorTemplate = 'dx-dashboard-calculation-expression-editor';
        this.editor = new ExpressionEditorWrapper(params);
        this.criteriaString = ko.computed(() => {
            var criteria = params.options().value();
            return criteria;
        });
    }
    edit() {
        this.editor.show();
    }
    remove() {
        this.params.options().value(null);
    }
}
exports.CalculationExpressionEditor = CalculationExpressionEditor;
class ExpressionEditorWrapper {
    constructor(params) {
        this.params = params;
        this.viewModel = ko.observable();
    }
    show() {
        if (this.viewModel()) {
            this.viewModel().dispose();
        }
        var expressionEditorOptions = this.params.options();
        expressionEditorOptions.functions = _expression_editor_functions_1.getExpressionEditorFunctions();
        var editor = new _expression_editor_1.DashboardExpressionEditor(expressionEditorOptions, this.params.fieldListProvider, this.params.displayNameProvider);
        editor.textAreaValue(expressionEditorOptions.value());
        editor.popupVisible(true);
        this.viewModel(editor);
    }
}
exports.ExpressionEditorWrapper = ExpressionEditorWrapper;
