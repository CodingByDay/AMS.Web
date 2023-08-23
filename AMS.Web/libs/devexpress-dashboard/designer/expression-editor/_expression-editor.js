﻿/**
* DevExpress Dashboard (_expression-editor.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardExpressionEditor = void 0;
const analytics_criteria_utils_1 = require("@devexpress/analytics-core/analytics-criteria-utils");
const analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
const $ = require("jquery");
const ko = require("knockout");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _dx_designer_integration_1 = require("../_dx-designer-integration");
const _expression_editor_functions_1 = require("./_expression-editor-functions");
const _flat_item_provider_wrapper_1 = require("./_flat-item-provider-wrapper");
class DashboardExpressionEditor extends analytics_widgets_1.ExpressionEditor {
    constructor(options, fieldListProvider, displayNameProvider, saveHandler, disabled) {
        options.theme = _dx_designer_integration_1.getAceTheme();
        super(options, fieldListProvider, disabled, undefined, displayNameProvider);
        var createCompletersBase = this.languageHelper.createCompleters;
        this.languageHelper.createCompleters = (e, b, v) => {
            var completers = createCompletersBase.call(this.languageHelper, e, b, v);
            completers[0]['_fieldListProvider'] = new _flat_item_provider_wrapper_1.FlatItemProviderWrapper(fieldListProvider());
            completers.forEach(completer => this._disposables.push(completer));
            return completers;
        };
        let saveHandlerValue = (callback) => {
            var val = '';
            if (this.aceAvailable) {
                val = this.editorContainer().getSession().getValue();
            }
            else {
                val = this.textAreaValue();
            }
            var toRealExpressionPromise = this.displayExpressionConverter ?
                this.displayExpressionConverter.toRealExpression(options.path(), val) :
                _jquery_helpers_1.createJQueryDeferred().resolve(val).promise();
            toRealExpressionPromise
                .then((realExpression) => {
                if (!!realExpression) {
                    analytics_criteria_utils_1.CriteriaOperatorStateMachine.parse(realExpression);
                    options.value(realExpression);
                    this.isValid(true);
                    options.isValid(true);
                }
                else {
                    this.isValid(false);
                    options.isValid(false);
                }
            })
                .catch((exception) => {
                this.isValid(false);
                options.isValid(false);
            })
                .then(() => {
                if (this.isValid()) {
                    callback();
                }
            });
        };
        saveHandler && saveHandler(saveHandlerValue);
        this._disposables.push(this.displayValue.subscribe(newValue => this.textAreaValue(newValue)));
    }
    focus() {
        this.editorContainer() && this.editorContainer().focus();
    }
}
exports.DashboardExpressionEditor = DashboardExpressionEditor;
ko.bindingHandlers['dshdExpressionEditor'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var $element = $.fn.constructor(element);
        $element.children().remove();
        $element.addClass('dx-filtereditor');
        var templateHtml = analytics_widgets_1.getTemplate('dx-expressioneditor-main'), $element = $element.append(templateHtml), editorElement = $element.children()[0], values = valueAccessor();
        values.options.functions = _expression_editor_functions_1.getExpressionEditorFunctions();
        var editor = new DashboardExpressionEditor(values.options, ko.observable(values.fieldListProvider), values.displayNameProvider, values.saveHandler, viewModel.disabled);
        editor.popupVisible(true);
        values.onResize && values.onResize(() => editor.resizeAceEditor());
        ko.utils.domNodeDisposal.addDisposeCallback(editorElement, () => {
            editor.dispose();
            values.onResize && values.onResize(null);
        });
        ko.applyBindings(editor, editorElement);
        editor.focus();
        return { controlsDescendantBindings: true };
    }
};
