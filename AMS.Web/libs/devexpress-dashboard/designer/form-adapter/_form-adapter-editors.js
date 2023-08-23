﻿/**
* DevExpress Dashboard (_form-adapter-editors.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conditionTypeEditor = exports.styleSettingsEditor = exports.ruleRangesEditor = exports.nestedPropertyGridEditor = exports.filePickerEditor = exports.simpleFilterEditor = exports.filterEditor = exports.calculationExpressionEditor = exports.flowModeSettingsEditor = exports.nullableNumberBoxEditor = exports.iconTypeEditor = exports.currencyEditor = exports.flagsEnumTagBoxEditor = exports.flagsEnumListEditor = exports.actionButtons = exports.textPreviewEditor = exports.inlineEditCollectionEditor = exports.collectionEditor = exports.editableListEditor = exports.listEditor = exports.buttonGroupEditor = exports.observableSelectBoxEditor = exports.dynamicSelectBoxEditor = exports.selectBoxEditor = exports.guidEditor = exports.textBoxEditor = exports.checkBoxEditor = exports.numberBoxEditor = exports.colorBoxEditor = exports.dateBoxEditor = exports.getFieldValue = void 0;
const analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
const data_source_1 = require("devextreme/data/data_source");
const list_1 = require("devextreme/ui/list");
const tag_box_1 = require("devextreme/ui/tag_box");
const ko = require("knockout");
const _common_1 = require("../../data/_common");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _localization_ids_1 = require("../../data/_localization-ids");
const _default_1 = require("../../data/localization/_default");
const _parameters_helper_1 = require("../../model/parameters/_parameters-helper");
const _expression_editor_1 = require("../calculations/_expression-editor");
const _condition_type_editor_1 = require("../conditional-formatting/_condition-type-editor");
const _rule_ranges_editor_1 = require("../conditional-formatting/_rule-ranges-editor");
const _style_settings_editor_1 = require("../conditional-formatting/_style-settings-editor");
const _currency_selector_1 = require("../currency-selector/_currency-selector");
const _filter_expression_editor_1 = require("../expression-editor/_filter-expression-editor");
const _simple_filter_editor_view_model_1 = require("../filtering/simple-filter-editor/_simple-filter-editor-view-model");
const _container_type_selector_1 = require("../items/container-type-selector/_container-type-selector");
const form_item_templates_1 = require("../public-editors/form-item-templates");
const _collection_editor_viewmodel_1 = require("../ui-widgets/collection-editor/_collection-editor-viewmodel");
const _editable_list_editor_viewmodel_1 = require("../ui-widgets/collection-editor/_editable-list-editor-viewmodel");
const _inline_edit_collection_editor_viewmodel_1 = require("../ui-widgets/collection-editor/_inline-edit-collection-editor-viewmodel");
function getFieldValue(args) {
    return ko.unwrap(args.component.option('formData')[args.dataField]);
}
exports.getFieldValue = getFieldValue;
function localizeValues(v) {
    return v.map(v => ({ value: v.value, displayValue: _default_1.tryLocalize(v.displayValueId) }));
}
const dateBoxEditor = () => ({
    editorType: 'dxDateBox',
    editorOptions: {
        closeOnValueChange: true,
        showClearButton: true,
        type: 'datetime',
        applyButtonText: _default_1.getLocalizationById(_localization_ids_1.localizationId.buttonNames.ButtonOK),
        cancelButtonText: _default_1.getLocalizationById(_localization_ids_1.localizationId.buttonNames.ButtonCancel),
        todayButtonText: _default_1.getLocalizationById(_localization_ids_1.localizationId.labelName.ParametersFormCalendarTodayButton)
    }
});
exports.dateBoxEditor = dateBoxEditor;
const colorBoxEditor = () => ({
    editorType: 'dxColorBox',
    editorOptions: {
        showClearButton: true,
        editAlphaChannel: true,
        applyButtonText: _default_1.getLocalizationById(_localization_ids_1.localizationId.buttonNames.ButtonOK),
        cancelButtonText: _default_1.getLocalizationById(_localization_ids_1.localizationId.buttonNames.ButtonCancel)
    }
});
exports.colorBoxEditor = colorBoxEditor;
const numberBoxEditor = (options = {}) => ({
    editorType: 'dxNumberBox',
    editorOptions: Object.assign(Object.assign({}, options), { showSpinButtons: true }),
    comparableEditorOptions: ['format']
});
exports.numberBoxEditor = numberBoxEditor;
const checkBoxEditor = (args) => {
    var text = args && args.text || null;
    return {
        editorType: 'dxCheckBox',
        label: { visible: !text },
        editorOptions: {
            elementAttr: {
                class: 'dx-dashboard-check-box'
            },
            text: text
        }
    };
};
exports.checkBoxEditor = checkBoxEditor;
const textBoxEditor = () => ({ editorType: 'dxTextBox' });
exports.textBoxEditor = textBoxEditor;
const guidEditor = () => ({
    editorType: 'dxTextBox',
    validationRules: [
        {
            type: 'custom',
            validationCallback: (options) => { return _parameters_helper_1.validateGuid(options.value); },
            message: _default_1.getLocalizationById('AnalyticsCoreStringId.GuidIsRequired_Error')
        }
    ]
});
exports.guidEditor = guidEditor;
const selectBoxEditor = values => context => {
    return {
        editorType: 'dxSelectBox',
        editorOptions: {
            items: localizeValues(values),
            valueExpr: 'value',
            displayExpr: 'displayValue',
            displayCustomValue: true,
            dropDownOptions: { container: context.widgetContainer }
        }
    };
};
exports.selectBoxEditor = selectBoxEditor;
function dynamicSelectBoxEditor(options) {
    return observableSelectBoxEditor(Object.assign(Object.assign({}, options), { observables: { values: options.values }, load: (args) => localizeValues(args.values) }));
}
exports.dynamicSelectBoxEditor = dynamicSelectBoxEditor;
function observableSelectBoxEditor(options) {
    return context => {
        let dataSource = new data_source_1.default({
            load: () => options.load(Object.keys(options.observables).reduce((acc, key) => { acc[key] = options.observables[key](); return acc; }, {})),
            key: 'value',
            loadMode: 'raw'
        });
        const dynamicOptions = options.additionalOptions && options.additionalOptions() || {};
        return {
            editorType: 'dxSelectBox',
            editorOptions: Object.assign({ dataSource: dataSource, valueExpr: 'value', displayExpr: 'displayValue', displayCustomValue: true, dropDownOptions: { container: context.widgetContainer }, onInitialized: e => {
                    const disposables = e.component.__DX_DASHBOARD_DISPOSABLES = (e.component.__DX_DASHBOARD_DISPOSABLES || []);
                    Object.keys(options.observables).map(obsName => options.observables[obsName].subscribe(newValue => {
                        dataSource.reload();
                    })).forEach(d => disposables.push(d));
                }, onDisposing: e => {
                    (e.component.__DX_DASHBOARD_DISPOSABLES || []).forEach(d => d && d.dispose());
                    e.component.__DX_DASHBOARD_DISPOSABLES = [];
                } }, dynamicOptions),
            comparableEditorOptions: options.comparableEditorOptions
        };
    };
}
exports.observableSelectBoxEditor = observableSelectBoxEditor;
const buttonGroupEditor = values => ({
    template: form_item_templates_1.FormItemTemplates.buttonGroup,
    editorOptions: {
        keyExpr: 'value',
        items: values.map((val) => ({ value: val.value, text: _default_1.getLocalizationById(val.displayValueId) })),
    }
});
exports.buttonGroupEditor = buttonGroupEditor;
const listEditor = (values) => ({
    template: args => getListTemplate(args, values)
});
exports.listEditor = listEditor;
function getListTemplate(args, values) {
    var div = document.createElement('div');
    var initialValue = getFieldValue(args);
    var options = {
        dataSource: values,
        selectionMode: 'single',
        disabled: args.editorOptions && args.editorOptions.disabled || undefined,
        selectedItems: values.filter(value => { return value.value === initialValue; }),
        onItemClick: (e) => { args.component.updateData(args.dataField, e.itemData.value); },
        itemTemplate: (itemData) => {
            var span = document.createElement('span');
            span.innerText = _default_1.getLocalizationById(itemData.displayValueId);
            return span;
        }
    };
    new list_1.default(div, options);
    return div;
}
const editableListEditor = options => context => {
    return {
        editorOptions: options,
        template: args => editableListEditorTemplate(args, context, options)
    };
};
exports.editableListEditor = editableListEditor;
const editableListEditorTemplate = (args, context, options) => {
    let viewModel = new _editable_list_editor_viewmodel_1.EditableListEditorViewModel(options, args.component.option('formData')[args.dataField]);
    const div = document.createElement('div');
    ko.applyBindingsToNode(div, { template: { name: 'dx-dashboard-collection-editor', data: viewModel } }, context.bindingContext);
    return div;
};
const collectionEditor = options => context => {
    return {
        editorOptions: options,
        template: (args) => collectionEditorTemplate(args, context, options)
    };
};
exports.collectionEditor = collectionEditor;
const collectionEditorTemplate = (args, context, options) => {
    let viewModel = new _collection_editor_viewmodel_1.CollectionEditorViewModel(options, args.component.option('formData')[args.dataField]);
    const div = document.createElement('div');
    ko.applyBindingsToNode(div, { template: { name: 'dx-dashboard-collection-editor', data: viewModel } }, context.bindingContext);
    return div;
};
const inlineEditCollectionEditor = options => context => ({
    editorOptions: options,
    template: (args, elt) => inlineEditCollectionEditorTemplate(args, _jquery_helpers_1.$unwrap(elt), context, options)
});
exports.inlineEditCollectionEditor = inlineEditCollectionEditor;
const inlineEditCollectionEditorTemplate = (args, elt, context, options) => {
    const viewModel = new _inline_edit_collection_editor_viewmodel_1.InlineEditCollectionEditorViewModel(options, args.component.option('formData')[args.dataField]);
    ko.applyBindingsToNode(elt, { template: { name: 'dx-dashboard-editable-collection-editor', data: viewModel } }, context.bindingContext);
};
const textPreviewEditor = options => context => {
    return {
        template: args => {
            const field = args.component.option('formData')[args.dataField];
            const div = document.createElement('div');
            div.classList.add('dx-dashboard-text-preview');
            ko.applyBindingsToNode(div, { template: { name: 'dx-dashboard-text-preview', data: options.target } }, context.bindingContext);
            return div;
        }
    };
};
exports.textPreviewEditor = textPreviewEditor;
const actionButtons = (options) => context => {
    return {
        template: args => {
            const div = document.createElement('div');
            ko.applyBindingsToNode(div, { template: { name: 'dx-dashboard-action-buttons', data: { buttons: options } } }, context.bindingContext);
            return div;
        }
    };
};
exports.actionButtons = actionButtons;
const flagsEnumListEditor = options => {
    return {
        template: args => {
            const div = document.createElement('div');
            div.classList.add('dx-dashboard-point-label-content-type-selector');
            new list_1.default(div, Object.assign({ showSelectionControls: true, selectionMode: 'multiple', keyExpr: 'value', onInitialized: function (e) {
                    e.component.option('selectedItemKeys', _common_1.getFlagsEnumTypeValues(getFieldValue(args), options.enumDeclaration, 'value'));
                } }, getFlagsEnumWidgetCommonOptions(args, options.values)));
            return div;
        }
    };
};
exports.flagsEnumListEditor = flagsEnumListEditor;
const flagsEnumTagBoxEditor = options => context => {
    return {
        template: args => {
            const div = document.createElement('div');
            div.classList.add('dx-dashboard-enum-flags-date-type-selector');
            new tag_box_1.default(div, Object.assign(Object.assign({ placeholder: _default_1.getLocalizationById('DashboardWebStringId.ConditionalFormatting.DatesOccurringNone'), selectAllMode: 'allPages', showSelectionControls: true, showDropDownButton: true, multiline: false, searchEnabled: true, valueExpr: 'value', onInitialized: function (e) {
                    e.component.option('value', _common_1.getFlagsEnumTypeValues(getFieldValue(args), options.enumDeclaration, 'value'));
                } }, getFlagsEnumWidgetCommonOptions(args, options.values)), {
                selectAllText: _default_1.getLocalizationById('DashboardStringId.FilterElementShowAllItem'),
                pageLoadMode: 'scrollBottom',
                dropDownOptions: { container: context.widgetContainer }
            }));
            return div;
        }
    };
};
exports.flagsEnumTagBoxEditor = flagsEnumTagBoxEditor;
function getFlagsEnumWidgetCommonOptions(args, values) {
    return {
        dataSource: values,
        displayExpr: e => e && _default_1.getLocalizationById(e.displayValueId),
        onSelectionChanged: function (e) {
            var val = getFieldValue(args);
            e.addedItems.forEach(function (added) {
                val = val | added.value;
            });
            e.removedItems.forEach(function (removed) {
                val = val & ~removed.value;
            });
            args.component.updateData(args.dataField, val);
        },
    };
}
const currencyEditor = () => (context) => ({
    template: args => currencyEditorTemplate(args, context)
});
exports.currencyEditor = currencyEditor;
const currencyEditorTemplate = (args, context) => {
    const div = document.createElement('div');
    let viewModel = new _currency_selector_1.CurrencySelector(args.component.option('formData')[args.dataField], args.editorOptions.disabled);
    ko.applyBindingsToNode(div, { template: { name: 'dx-dashboard-currency-editor-template', data: viewModel } }, context.bindingContext);
    return div;
};
const iconTypeEditor = (options) => context => ({
    template: args => iconTypeEditorTemplate(args, context, options)
});
exports.iconTypeEditor = iconTypeEditor;
const iconTypeEditorTemplate = (args, context, options) => {
    const div = document.createElement('div');
    var value = args.component.option('formData')[args.dataField];
    var viewModel = new _container_type_selector_1.ContainerTypeSelector(options.containersMap, value, options.containerGroupLocalization || undefined, options.highlightedTypes);
    ko.applyBindingsToNode(div, { template: { name: 'dx-dashboard-container-type-selector-full', data: viewModel } }, context.bindingContext);
    return div;
};
const nullableNumberBoxEditor = (options) => context => {
    return {
        template: (args) => nullableNumberBoxEditorTemplate(args, context, options)
    };
};
exports.nullableNumberBoxEditor = nullableNumberBoxEditor;
const nullableNumberBoxEditorTemplate = (args, context, options) => {
    const div = document.createElement('div');
    var value = args.component.option('formData')[args.dataField];
    const defaultValue = options.defaultValue ? options.defaultValue : 0;
    const viewModel = {
        buttonGroupOptions: {
            selectedItemKeys: ko.pureComputed(() => [isNaN(value())]),
            keyExpr: 'value',
            width: '100%',
            items: [
                { value: true, text: _default_1.getLocalizationById('DashboardWebStringId.Gauge.Scale.Auto') },
                { value: false, text: _default_1.getLocalizationById('DashboardWebStringId.Gauge.Scale.Custom') }
            ],
            onItemClick: e => { value(e.itemData.value ? NaN : defaultValue); }
        },
        numberBoxOptions: Object.assign(Object.assign({}, options.editorOptions), { disabled: ko.pureComputed(() => isNaN(value())), value: value, showSpinButtons: true, step: 1 })
    };
    ko.applyBindingsToNode(div, { template: { name: 'dx-dashboard-nullable-numberbox', data: viewModel } }, context.bindingContext);
    return div;
};
const flowModeSettingsEditor = () => context => {
    return {
        template: (args, itemElement) => {
            const periodLimit = args.component.option('formData')[args.dataField];
            const viewModel = {
                selectBoxOptions: {
                    items: periodLimit._getAvailableIntervals(),
                    value: periodLimit.interval,
                    valueExpr: 'value',
                    displayExpr: 'displayValue',
                    displayCustomValue: true,
                    dropDownOptions: { container: args.editorOptions.dashboardWidgetContainer }
                },
                numberBoxOptions: {
                    value: periodLimit.offset,
                    showSpinButtons: true,
                    step: 1
                }
            };
            ko.applyBindingsToNode(_jquery_helpers_1.$unwrap(itemElement), { template: { name: 'dx-dashboard-flow-mode-settings', data: viewModel } }, context.bindingContext);
        }
    };
};
exports.flowModeSettingsEditor = flowModeSettingsEditor;
const calculationExpressionEditor = options => expressionEditorFormAdapter(() => new _expression_editor_1.CalculationExpressionEditor(options));
exports.calculationExpressionEditor = calculationExpressionEditor;
const filterEditor = options => expressionEditorFormAdapter(() => new _filter_expression_editor_1.FilterExpressionEditorViewModel(options));
exports.filterEditor = filterEditor;
const simpleFilterEditor = options => expressionEditorFormAdapter(() => new _simple_filter_editor_view_model_1.SimpleFilterExpressionEditorViewModel(options));
exports.simpleFilterEditor = simpleFilterEditor;
function expressionEditorFormAdapter(createEditorViewModel) {
    return context => {
        return {
            template: (args, itemElement) => {
                var viewModel = createEditorViewModel();
                ko.applyBindingsToNode(_jquery_helpers_1.$unwrap(itemElement), { template: { name: 'dx-dashboard-expression-editor-view', data: viewModel } }, context.bindingContext);
            }
        };
    };
}
const filePickerEditor = (options) => {
    return {
        template: (args) => {
            var div = document.createElement('div');
            new analytics_widgets_internal_1.dxFileImagePicker(div, Object.assign(Object.assign({}, options), { value: getFieldValue(args), onValueChanged: (e) => {
                    args.component.updateData(args.dataField, e.value);
                } }));
            return div;
        }
    };
};
exports.filePickerEditor = filePickerEditor;
const nestedPropertyGridEditor = (caption) => context => {
    return {
        template: (args, itemElement) => {
            const formatModel = args.component.option('formData')[args.dataField];
            ko.applyBindingsToNode(_jquery_helpers_1.$unwrap(itemElement), { template: { name: 'dx-dashboard-nested-propertygrid-editor', data: {
                        object: formatModel,
                        caption: caption
                    } } }, context.bindingContext);
        }
    };
};
exports.nestedPropertyGridEditor = nestedPropertyGridEditor;
const ruleRangesEditor = (options) => context => {
    return {
        options: options,
        template: (args, itemElement) => {
            var viewModel = new _rule_ranges_editor_1.RuleRangesEditor(options);
            ko.applyBindingsToNode(_jquery_helpers_1.$unwrap(itemElement), { template: { name: 'dx-dashboard-rule-ranges-editor', data: viewModel } }, context.bindingContext);
        }
    };
};
exports.ruleRangesEditor = ruleRangesEditor;
const styleSettingsEditor = (options) => context => {
    return {
        options: options,
        template: (args, itemElement) => {
            const styleSettings = args.component.option('formData')[args.dataField];
            if (!options.restrictToColor) {
                options.getAvailableFontFamilies = () => {
                    const getAvailableFontFamilies = args.component.option('formData').model.condition()._getAvailableFontFamilies;
                    if (getAvailableFontFamilies) {
                        return getAvailableFontFamilies();
                    }
                    return ko.computed(() => []);
                };
            }
            var viewModel = new _style_settings_editor_1.StyleSettingsEditor(styleSettings, options);
            ko.applyBindingsToNode(_jquery_helpers_1.$unwrap(itemElement), { template: { name: 'dx-dashboard-style-settings-editor', data: viewModel } }, context.bindingContext);
        }
    };
};
exports.styleSettingsEditor = styleSettingsEditor;
const conditionTypeEditor = options => context => {
    return {
        options: options,
        template: (args, itemElement) => {
            const viewModel = new _condition_type_editor_1.FormatConditionTypeEditorSurface(options);
            ko.applyBindingsToNode(_jquery_helpers_1.$unwrap(itemElement), { template: { name: 'dx-dashboard-format-rule-condition-type-editor', data: viewModel } }, context.bindingContext);
        }
    };
};
exports.conditionTypeEditor = conditionTypeEditor;
