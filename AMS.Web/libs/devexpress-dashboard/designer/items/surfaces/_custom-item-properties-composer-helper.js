﻿/**
* DevExpress Dashboard (_custom-item-properties-composer-helper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomItemPropertiesComposerHelper = void 0;
const analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
const analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const _custom_item_metadata_1 = require("../../../model/metadata/_custom-item-metadata");
const _form_adapter_editors_1 = require("../../form-adapter/_form-adapter-editors");
const imageEditor = () => {
    return {
        template: (args) => {
            var div = document.createElement('div');
            new analytics_widgets_internal_1.dxFileImagePicker(div, {
                placeholderId: 'Image',
                accept: 'image/*',
                type: 'img',
                value: _form_adapter_editors_1.getFieldValue(args),
                onValueChanged: (e) => {
                    args.component.updateData(args.dataField, e.value);
                }
            });
            return div;
        }
    };
};
const radioGroupEditor = (values) => ({
    editorType: 'dxRadioGroup',
    editorOptions: {
        dataSource: values,
        valueExpr: 'value',
        displayExpr: 'displayValueId',
    }
});
class CustomItemPropertiesComposerHelper {
    static _getEditorValues(serializableInfo) {
        if (serializableInfo.values) {
            let values = ko.unwrap(serializableInfo.values);
            return Object.keys(values).map(k => ({ value: k, displayValueId: values[k] }));
        }
        else if (serializableInfo.valuesArray)
            return serializableInfo.valuesArray.map((val) => ({ value: val.value, displayValueId: val.displayValue }));
        return undefined;
    }
    static _mapEditor(serializableInfo) {
        if (!serializableInfo.editor) {
            return null;
        }
        switch (serializableInfo.editor) {
            case _custom_item_metadata_1.editorTemplates.date:
                return _form_adapter_editors_1.dateBoxEditor();
            case _custom_item_metadata_1.editorTemplates.numeric:
                return _form_adapter_editors_1.numberBoxEditor();
            case _custom_item_metadata_1.editorTemplates.checkBox:
                return _form_adapter_editors_1.checkBoxEditor({ text: _default_1.getLocalizationById(serializableInfo.displayName) });
            case _custom_item_metadata_1.editorTemplates.text:
                return _form_adapter_editors_1.textBoxEditor();
            case _custom_item_metadata_1.editorTemplates.combobox:
                return _form_adapter_editors_1.selectBoxEditor(CustomItemPropertiesComposerHelper._getEditorValues(serializableInfo));
            case _custom_item_metadata_1.editorTemplates.bool:
                return _form_adapter_editors_1.buttonGroupEditor([{ value: true, displayValueId: 'DashboardWebStringId.ButtonOn' }, { value: false, displayValueId: 'DashboardWebStringId.ButtonOff' }]);
            case _custom_item_metadata_1.editorTemplates.boolYesNo:
                return _form_adapter_editors_1.buttonGroupEditor([{ value: true, displayValueId: 'DashboardWebStringId.ButtonYes' }, { value: false, displayValueId: 'DashboardWebStringId.ButtonNo' }]);
            case _custom_item_metadata_1.editorTemplates.buttonGroup:
                return _form_adapter_editors_1.buttonGroupEditor(CustomItemPropertiesComposerHelper._getEditorValues(serializableInfo));
            case _custom_item_metadata_1.editorTemplates.boolVisibleHidden:
                return _form_adapter_editors_1.buttonGroupEditor([{ value: true, displayValueId: 'DashboardWebStringId.ButtonVisible' }, { value: false, displayValueId: 'DashboardWebStringId.ButtonHidden' }]);
            case _custom_item_metadata_1.editorTemplates.list:
                return _form_adapter_editors_1.listEditor(CustomItemPropertiesComposerHelper._getEditorValues(serializableInfo));
            case _custom_item_metadata_1.editorTemplates.radioGroup:
                return radioGroupEditor(CustomItemPropertiesComposerHelper._getEditorValues(serializableInfo));
            case _custom_item_metadata_1.editorTemplates.image:
                return imageEditor();
            default:
                let template = serializableInfo.editor.header || serializableInfo.editor.custom;
                return (context) => ({
                    customEditorType: template,
                    template: (args, itemElement) => {
                        let element = itemElement;
                        let info = serializableInfo;
                        var editor = new analytics_widgets_1.Editor(info, 0);
                        editor._model(args.component.option('formData'));
                        ko.applyBindingsToNode(element, { template: { name: template, data: editor } }, context.bindingContext);
                    }
                });
        }
    }
    static convertToDashboardSerializationInfo(property) {
        return {
            propertyName: property.propertyName,
            formAdapterItem: Object.assign(Object.assign({}, CustomItemPropertiesComposerHelper._mapEditor(property)), { label: {
                    text: _default_1.getLocalizationById(property.displayName),
                    visible: !!property.displayName,
                }, validationRules: property.validationRules || [] }),
            editorOptions: property.editorOptions,
        };
    }
}
exports.CustomItemPropertiesComposerHelper = CustomItemPropertiesComposerHelper;
