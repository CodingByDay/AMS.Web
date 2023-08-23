﻿/**
* DevExpress Dashboard (_custom-appearance-dialog.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAppearanceDialog = void 0;
const button_group_1 = require("devextreme/ui/button_group");
const list_1 = require("devextreme/ui/list");
const themes_1 = require("devextreme/ui/themes");
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const _form_adapter_editors_1 = require("../../form-adapter/_form-adapter-editors");
class CustomAppearanceDialog {
    constructor(setAppearance, availableFontFamilies) {
        this.setAppearance = setAppearance;
        this.availableFontFamilies = availableFontFamilies;
        this.visible = ko.observable(false);
        this.isMaterial = themes_1.default.isMaterial(themes_1.default.current());
        this.appearancePreview = ko.observable(null);
        this.colorBox = (dataField, labelLocaleId) => ({
            dataField,
            label: {
                text: _default_1.getLocalizationById(labelLocaleId)
            },
            cssClass: 'dx-dashboard-appearance-layout-item',
            editorType: 'dxColorBox',
            editorOptions: {
                editAlphaChannel: true,
            }
        });
        this.buttonGroup = (args) => {
            const buttonGroupHolder = document.createElement('div');
            const options = {
                items: this.fontStyles,
                keyExpr: 'dataField',
                selectionMode: 'multiple',
                selectedItemKeys: this.appearancePreview().fontStyles,
                stylingMode: 'outlined',
                onSelectionChanged(e) {
                    args.component.updateData(args.dataField, e.component.option('selectedItemKeys'));
                }
            };
            new button_group_1.default(buttonGroupHolder, options);
            return buttonGroupHolder;
        };
        this.styleButtons = () => ({
            dataField: 'fontStyles',
            cssClass: 'dx-dashboard-appearance-item-wrapper dx-dashboard-appearance-layout-item',
            label: {
                visible: false,
            },
            template: this.buttonGroup
        });
        this.fontStyle = (type, labelLocaleId) => ({
            icon: type.toLocaleLowerCase(),
            hint: _default_1.getLocalizationById(labelLocaleId),
            dataField: type,
            elementAttr: {
                class: 'dx-dashboard-appearance-item-font-style-button'
            }
        });
        this.fontStyles = [
            this.fontStyle('Bold', 'DashboardStringId.FormatConditionAppearanceFontBold'),
            this.fontStyle('Italic', 'DashboardStringId.FormatConditionAppearanceFontItalic'),
            this.fontStyle('Underline', 'DashboardStringId.FormatConditionAppearanceFontUnderline')
        ];
        this.appearanceSettingsGroup = () => ({
            itemType: 'group',
            colCount: 3,
            cssClass: 'dx-dashboard-appearance-layout',
            items: [
                this.colorBox('backColor', 'DashboardWebStringId.ConditionalFormatting.Appearance.BackColor'),
                this.colorBox('foreColor', 'DashboardWebStringId.ConditionalFormatting.Appearance.ForeColor'),
                this.styleButtons()
            ]
        });
        this.fontFamilyEditor = (fontFamilies) => (args) => {
            var _a;
            const listHolder = document.createElement('div');
            listHolder.classList.add('dx-dashboard-appearance-font-family-editor-list');
            listHolder.classList.add('dx-dashboard-appearance-bordered-item');
            listHolder.classList.add('dx-dashboard-form-open');
            const initialValue = _form_adapter_editors_1.getFieldValue(args);
            const options = {
                dataSource: fontFamilies,
                selectionMode: 'single',
                searchEnabled: true,
                searchMode: 'contains',
                searchEditorOptions: {
                    placeholder: _default_1.getLocalizationById('DashboardWebStringId.SearchFontFamilies')
                },
                disabled: ((_a = args.editorOptions) === null || _a === void 0 ? void 0 : _a.disabled) || undefined,
                pageLoadMode: 'scrollBottom',
                selectedItems: [initialValue],
                onItemClick: (e) => args.component.updateData(args.dataField, e.itemData),
            };
            new list_1.default(listHolder, options);
            return listHolder;
        };
        this.fontFamily = (fontFamilies) => ({
            dataField: 'fontFamily',
            label: {
                visible: false,
            },
            template: this.fontFamilyEditor(fontFamilies)
        });
        this.styledTextPreviewEditor = () => {
            const previewHolder = document.createElement('div');
            previewHolder.classList.add('dx-dashboard-text-preview');
            previewHolder.classList.add('dx-dashboard-appearance-bordered-item');
            previewHolder.textContent = 'Preview';
            if (this.appearancePreview().backColor)
                previewHolder.style.backgroundColor = this.appearancePreview().backColor;
            if (this.appearancePreview().foreColor)
                previewHolder.style.color = this.appearancePreview().foreColor;
            if (this.appearancePreview().fontFamily)
                previewHolder.style.fontFamily = this.appearancePreview().fontFamily;
            if (this.appearancePreview().fontStyles.indexOf('Italic') !== -1)
                previewHolder.style.fontStyle = 'italic';
            if (this.appearancePreview().fontStyles.indexOf('Bold') !== -1)
                previewHolder.style.fontWeight = 'bold';
            if (this.appearancePreview().fontStyles.indexOf('Underline') !== -1)
                previewHolder.style.textDecoration = 'underline';
            return previewHolder;
        };
        this.preview = {
            dataField: 'preview',
            label: {
                visible: false
            },
            template: this.styledTextPreviewEditor
        };
        this.buttonItems = ko.observableArray([{
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    type: 'default',
                    text: _default_1.getLocalizationById('DashboardWebStringId.ConditionalFormatting.Save'), onClick: () => {
                        this.setAppearance(this.getValue());
                        this.visible(false);
                    }
                }
            }, {
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    text: _default_1.getLocalizationById('DashboardStringId.ButtonCancel'), onClick: () => this.visible(false)
                }
            }]);
        this.popupOptions = {
            toolbarItems: this.buttonItems,
            visible: this.visible,
            height: this.isMaterial ? '450px' : '470px',
            width: '750px',
            minWidth: '450px',
            maxWidth: '70%',
            showCloseButton: true,
            wrapperAttr: {
                class: 'dx-dropdowneditor-overlay'
            },
            title: _default_1.getLocalizationById('DashboardWebStringId.ConditionalFormatting.CustomStyleSettings'),
        };
        this.items = [
            this.appearanceSettingsGroup(),
            {
                itemType: 'group',
                cssClass: 'dx-dashboard-appearance-font-family-editor',
                items: [this.fontFamily(this.availableFontFamilies)]
            },
            {
                itemType: 'group',
                items: [this.preview]
            }
        ];
        this.formOptions = {
            formData: this.appearancePreview,
            items: this.items,
            height: '100%',
            labelLocation: 'top',
            showColonAfterLabel: false,
            onFieldDataChanged: (e) => {
                e.component.itemOption('preview', this.appearancePreview());
            }
        };
    }
    show(appearance) {
        var _a, _b, _c, _d;
        const selectedStyles = ((_a = appearance === null || appearance === void 0 ? void 0 : appearance.fontStyle) === null || _a === void 0 ? void 0 : _a.split(',').filter(item => !!item).map(item => item.trim())) || [];
        this.appearancePreview({
            backColor: (_b = appearance === null || appearance === void 0 ? void 0 : appearance.backColor) !== null && _b !== void 0 ? _b : '#FFFFFF',
            foreColor: (_c = appearance === null || appearance === void 0 ? void 0 : appearance.foreColor) !== null && _c !== void 0 ? _c : '#000000',
            fontFamily: (_d = appearance === null || appearance === void 0 ? void 0 : appearance.fontFamily) !== null && _d !== void 0 ? _d : null,
            fontStyles: selectedStyles
        });
        this.visible(true);
    }
    getValue() {
        const appearance = {
            backColor: this.appearancePreview().backColor || '#FFFFFF',
            foreColor: this.appearancePreview().foreColor || '#000000',
            fontFamily: this.appearancePreview().fontFamily,
            fontStyle: this.appearancePreview().fontStyles.length ? this.appearancePreview().fontStyles.join(', ') : null
        };
        return appearance;
    }
}
exports.CustomAppearanceDialog = CustomAppearanceDialog;
