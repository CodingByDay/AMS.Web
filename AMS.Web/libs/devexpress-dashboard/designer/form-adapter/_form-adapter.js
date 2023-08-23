﻿/**
* DevExpress Dashboard (_form-adapter.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformValuesDictionary = exports.updateFormItemsCore = exports.twoWayUpdateInterval = void 0;
const form_1 = require("devextreme/ui/form");
const ko = require("knockout");
const _utils_1 = require("../../data/_utils");
const _default_1 = require("../../data/localization/_default");
const _form_adapter_editors_1 = require("./_form-adapter-editors");
exports.twoWayUpdateInterval = 1;
function extractFormAdapterItem(serializableInfo) {
    if (serializableInfo.formAdapterItem) {
        return serializableInfo.formAdapterItem;
    }
    return mapEditor(serializableInfo);
}
function mapEditor(serializableInfo) {
    if (!serializableInfo.simpleFormAdapterItem) {
        return null;
    }
    switch (serializableInfo.simpleFormAdapterItem) {
        case 'dateBoxEditor':
            return _form_adapter_editors_1.dateBoxEditor();
        case 'colorBoxEditor':
            return _form_adapter_editors_1.colorBoxEditor();
        case 'numberBoxEditor':
            const editorOptions = serializableInfo.editorOptions;
            return _form_adapter_editors_1.numberBoxEditor(editorOptions);
        case 'checkBoxEditor':
            return _form_adapter_editors_1.checkBoxEditor({ text: _default_1.getLocalizationById(serializableInfo.displayName) });
        case 'textBoxEditor':
            return _form_adapter_editors_1.textBoxEditor();
        case 'guidEditor':
            return _form_adapter_editors_1.guidEditor();
        case 'selectBoxEditor':
            return _form_adapter_editors_1.selectBoxEditor(getEditorValues(serializableInfo));
        case 'onOffButtonGroupEditor':
            return _form_adapter_editors_1.buttonGroupEditor([{ value: true, displayValueId: 'DashboardWebStringId.ButtonOn' }, { value: false, displayValueId: 'DashboardWebStringId.ButtonOff' }]);
        case 'yesNoButtonGroupEditor':
            return _form_adapter_editors_1.buttonGroupEditor([{ value: true, displayValueId: 'DashboardWebStringId.ButtonYes' }, { value: false, displayValueId: 'DashboardWebStringId.ButtonNo' }]);
        case 'buttonGroupEditor':
            return _form_adapter_editors_1.buttonGroupEditor(getEditorValues(serializableInfo));
        case 'discreteContinuousButtonGroupEditor':
            return _form_adapter_editors_1.buttonGroupEditor([{ value: true, displayValueId: 'DashboardWebStringId.ButtonDiscrete' }, { value: false, displayValueId: 'DashboardWebStringId.ButtonContinuous' }]);
        case 'listEditor':
            return _form_adapter_editors_1.listEditor(getEditorValues(serializableInfo));
        default:
            throw new Error('Unsupported simple formAdapterItem type');
    }
}
function getFormAdapterItemOptions(serializationInfo, propertiesWrapper, bindingContext) {
    const dynamicEditor = propertiesWrapper.getDynamicEditor ? propertiesWrapper.getDynamicEditor(serializationInfo.propertyName) : null;
    const formAdapterItemProvider = dynamicEditor || serializationInfo;
    const formAdapterItem = extractFormAdapterItem(formAdapterItemProvider);
    const formAdapterContext = {
        bindingContext: bindingContext,
        widgetContainer: bindingContext.$root.getWidgetContainer()
    };
    return (typeof formAdapterItem === 'function') ? formAdapterItem(formAdapterContext) : formAdapterItem;
}
function getFormItems(target, context) {
    return target
        .getInfo()
        .map(serializationInfo => {
        if (serializationInfo.dxFormItem) {
            return serializationInfo.dxFormItem;
        }
        let formAdapterItemOptions = getFormAdapterItemOptions(serializationInfo, target, context);
        if (!formAdapterItemOptions) {
            return null;
        }
        return {
            dataField: serializationInfo.propertyName,
            name: serializationInfo.propertyName,
            label: Object.assign({ text: _default_1.getLocalizationById(serializationInfo.displayName), visible: !!serializationInfo.displayName }, formAdapterItemOptions.label),
            visible: target.isPropertyVisible ? target.isPropertyVisible(serializationInfo.propertyName) : true,
            validationRules: [...(serializationInfo.validationRules || []), ...(formAdapterItemOptions.validationRules || [])],
            editorType: formAdapterItemOptions.editorType,
            template: formAdapterItemOptions.template,
            customEditorType: formAdapterItemOptions.customEditorType,
            editorOptions: Object.assign(Object.assign({ disabled: target.isPropertyDisabled ? target.isPropertyDisabled(serializationInfo.propertyName) : false }, formAdapterItemOptions.editorOptions), serializationInfo.editorOptions)
        };
    }).filter(i => !!i);
}
function getItemComparableOptions(propertyName, target, context) {
    const info = target.getInfo().filter(info => info.propertyName === propertyName)[0];
    const itemOptions = info && getFormAdapterItemOptions(info, target, context);
    return itemOptions && itemOptions.comparableEditorOptions || [];
}
function updateFormItemsCore(form, target, bindingContext, propertiesToForceUpdate = []) {
    form.beginUpdate();
    getFormItems(target, bindingContext).forEach(newItem => {
        const itemOptions = form.itemOption(newItem.dataField);
        if (itemOptions.visible !== newItem.visible) {
            form.itemOption(newItem.dataField, 'visible', newItem.visible);
        }
        if (itemOptions.editorOptions && newItem.editorOptions) {
            const isOptionsChanged = ['disabled', ...getItemComparableOptions(newItem.dataField, target, bindingContext)]
                .reduce((acc, prop) => acc || (newItem.editorOptions[prop] !== itemOptions.editorOptions[prop]), false);
            isOptionsChanged && form.itemOption(newItem.dataField, 'editorOptions', newItem.editorOptions);
        }
        if (itemOptions['customEditorType'] !== newItem['customEditorType'] || itemOptions.editorType !== newItem.editorType ||
            _utils_1.type.isDefined(propertiesToForceUpdate) && propertiesToForceUpdate.filter(f => f === newItem.dataField).length > 0) {
            form.itemOption(newItem.dataField, newItem);
        }
    });
    form.endUpdate();
}
exports.updateFormItemsCore = updateFormItemsCore;
function transformValuesDictionary(values) {
    return Object.keys(values).map(k => ({ value: k, displayValueId: values[k] }));
}
exports.transformValuesDictionary = transformValuesDictionary;
function getEditorValues(propertyEditorInfo) {
    if (propertyEditorInfo.values) {
        let values = ko.unwrap(propertyEditorInfo.values);
        return transformValuesDictionary(values);
    }
    else if (propertyEditorInfo.valuesArray)
        return propertyEditorInfo.valuesArray.map((val) => ({ value: val.value, displayValueId: val.displayValue }));
    return undefined;
}
ko.bindingHandlers['dx-dashboard-form-adapter'] = {
    init: function (element, valueAccessor, _, __, bindingContext) {
        let subscriptions = [];
        const params = ko.unwrap(valueAccessor());
        const target = ko.unwrap(params.target);
        const onFormInitialized = ko.unwrap(params.onFormInitialized);
        const updateFormItems = (form, propertiesToForceUpdate) => {
            updateFormItemsCore(form, target, bindingContext, propertiesToForceUpdate);
        };
        let twoWayTimeout;
        let twoWayPropsUpdated = [];
        const clearTwoWayTimeout = (propsToClear) => {
            twoWayPropsUpdated = twoWayPropsUpdated.filter(tw => propsToClear.filter(tc => tc === tw).length === 0);
            if (twoWayPropsUpdated.length === 0) {
                clearTimeout(twoWayTimeout);
                twoWayTimeout = null;
            }
        };
        const updateTwoWay = (prop) => {
            clearTimeout(twoWayTimeout);
            twoWayPropsUpdated.push(prop);
            twoWayTimeout = setTimeout(() => {
                let force = twoWayPropsUpdated;
                clearTwoWayTimeout(twoWayPropsUpdated);
                updateFormItems(form, force);
            }, exports.twoWayUpdateInterval);
        };
        const form = new form_1.default(element, {
            formData: target,
            colCount: 1,
            labelLocation: 'top',
            showColonAfterLabel: false,
            items: getFormItems(target, bindingContext),
            onContentReady: (e) => {
                target.onContentReady && target.onContentReady(e);
            },
            onInitialized: (e) => {
                onFormInitialized && onFormInitialized(e);
                target.onInitialized && target.onInitialized(e);
            },
            onFieldDataChanged: (e) => {
                if (twoWayTimeout)
                    clearTwoWayTimeout([e.dataField]);
                updateFormItems(e.component);
                target.onFieldDataChanged && target.onFieldDataChanged(e);
            }
        });
        target.assignValidationPovider(form);
        target.getInfo()
            .filter(propInfo => propInfo.externalUpdateCallback)
            .forEach(propInfo => subscriptions.push(propInfo.externalUpdateCallback(({ forceValidate }) => {
            updateFormItems(form);
            if (forceValidate)
                form.validate();
        })));
        target.getInfo()
            .filter(propInfo => propInfo.isTwoWay)
            .forEach(propInfo => {
            let property = target[propInfo.propertyName];
            if (property && ko.isObservable(property)) {
                subscriptions.push(property.subscribe(newValue => {
                    updateTwoWay(propInfo.propertyName);
                }));
            }
        });
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            target.assignValidationPovider(null);
            subscriptions.forEach(d => d.dispose());
            subscriptions = [];
        });
        return { controlsDescendantBindings: true };
    }
};
