﻿/**
* DevExpress Dashboard (_style-settings-editor.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleSettingsEditor = void 0;
const ko = require("knockout");
const appearance_settings_1 = require("../../model/format-rules/style-settings/appearance-settings");
const icon_settings_1 = require("../../model/format-rules/style-settings/icon-settings");
const _icon_settings_1 = require("../../model/format-rules/style-settings/metadata/_icon-settings");
const _style_settings_base_1 = require("../../model/format-rules/style-settings/metadata/_style-settings-base");
const _conditional_formatting_custom_color_storage_1 = require("./custom-style-settings/_conditional-formatting-custom-color-storage");
const _style_settings_adapters_1 = require("./_style-settings-adapters");
const _style_settings_palette_1 = require("./_style-settings-palette");
class StyleSettingsEditor {
    constructor(target, params) {
        this.customColorsSupported = false;
        this.allowChangeViewMode = false;
        this.isGradient = false;
        this.isEmptyAllowed = false;
        this.restrictToColor = false;
        this.numberOfCustomStyleItems = 8;
        this.value = target;
        this.isEmptyAllowed = params.isEmptyAllowed;
        this.isGradient = params.appearanceMode === 'GradientColors';
        this.allowChangeViewMode = (this.value() instanceof appearance_settings_1.AppearanceSettings || this.value() instanceof icon_settings_1.IconSettings) && params.allowChangeViewMode;
        this.viewMode = ko.observable(this.value() instanceof icon_settings_1.IconSettings ? 'Icon' : 'Appearance');
        this.getAvailableFontFamilies = params.getAvailableFontFamilies;
        this.customColorsSupported = params.enableCustomStyles;
        if (params.restrictToColor)
            this.restrictToColor = params.restrictToColor;
        this.selectedChanged = params.selectedChanged;
        this.closeEditCell = params.closeEditCell || (() => { });
        const { predefinedStyles, predefinedIcons, customStyles } = this._createDataSources(params.appearanceMode, this.isEmptyAllowed, this.customColorsSupported, this.restrictToColor, this.value, _conditional_formatting_custom_color_storage_1.conditionalFormattingEditor);
        this.list = predefinedStyles;
        this.iconList = predefinedIcons;
        this.customStyleItems = customStyles;
    }
    _setStyleType(styleSettingsModel, saveCustomStyle) {
        const oldSelectedStyle = this.value();
        if (this.value() !== styleSettingsModel) {
            this.value(styleSettingsModel);
        }
        if (this.selectedChanged) {
            this.selectedChanged(oldSelectedStyle, styleSettingsModel);
        }
        this.closeEditCell();
        switch (saveCustomStyle) {
            case 'SaveColor':
                const customColors = this.customStyleItems
                    .map(viewModel => viewModel.item)
                    .filter(model => !!model)
                    .map(model => _style_settings_adapters_1.styleSettingsAdapter(model).getCustomColor());
                _conditional_formatting_custom_color_storage_1.conditionalFormattingEditor.customColorStorage.setValue(customColors);
                break;
            case 'SaveAppearance':
                const customAppearances = this.customStyleItems
                    .map(viewModel => viewModel.item)
                    .filter(model => !!model)
                    .map(model => _style_settings_adapters_1.styleSettingsAdapter(model).getCustomAppearance());
                _conditional_formatting_custom_color_storage_1.conditionalFormattingEditor.customAppearanceStorage.setValue(customAppearances);
                break;
            case 'None':
            default:
                break;
        }
    }
    _createDataSources(mode, isEmptyAllowed, isCustomStyleEnabled, isCustomColorsOnly, selectedValue, customStylesProvider) {
        let predefinedAppearanceItems = [];
        let predefinedIconItems = [];
        let customStyleItems = null;
        let specificCustomItemType = undefined;
        switch (mode) {
            case 'Appearance':
                predefinedAppearanceItems = _style_settings_palette_1.Palette.standard;
                predefinedIconItems = Object.keys(_icon_settings_1.iconType.values).slice(1);
                specificCustomItemType = appearance_settings_1.AppearanceSettings;
                break;
            case 'AllColors':
                predefinedAppearanceItems = _style_settings_palette_1.Palette.allColors;
                break;
            case 'RichColors':
                predefinedAppearanceItems = _style_settings_palette_1.Palette.richColors;
                break;
            case 'GradientColors':
                predefinedAppearanceItems = _style_settings_palette_1.Palette.gradient;
                break;
        }
        if (isEmptyAllowed) {
            predefinedAppearanceItems = [_style_settings_base_1.emptyStyleType].concat(predefinedAppearanceItems);
            predefinedIconItems = predefinedIconItems.length ? [_style_settings_base_1.emptyStyleType].concat(predefinedIconItems) : [];
        }
        if (isCustomStyleEnabled) {
            const selectedItemAdapter = _style_settings_adapters_1.styleSettingsAdapter(selectedValue());
            if (isCustomColorsOnly) {
                customStyleItems = this._getCustomColorStyles(customStylesProvider.customColorStorage, selectedItemAdapter.hasCustomStyle() && selectedItemAdapter.getCustomColor())
                    .map(this.createItemViewModel(this.createCustomColorStyleSettingsModel(selectedValue(), specificCustomItemType), selectedValue));
            }
            else {
                customStyleItems = this._getCustomAppearanceStyles(customStylesProvider.customAppearanceStorage, selectedItemAdapter.hasCustomStyle() && selectedItemAdapter.getCustomAppearance())
                    .map(this.createItemViewModel(this.createCustomAppearanceStyleSettingsModel(selectedValue(), specificCustomItemType), selectedValue));
            }
        }
        return {
            predefinedStyles: predefinedAppearanceItems.map(this.createItemViewModel(this.createStyleSettingsModel(selectedValue(), specificCustomItemType), selectedValue)),
            predefinedIcons: predefinedIconItems.map(this.createItemViewModel(this.createStyleSettingsModel(selectedValue(), icon_settings_1.IconSettings), selectedValue)),
            customStyles: customStyleItems
        };
    }
    _getCustomColorStyles(storage, selectedStyle) {
        const styles = this._getStyles(storage);
        const colorFound = styles.indexOf(selectedStyle) > -1;
        return this._getCustomStyles(storage, styles, selectedStyle, colorFound);
    }
    _getCustomAppearanceStyles(storage, selectedStyle) {
        const styles = this._getStyles(storage);
        const appearanceFound = styles.some(style => {
            if (!style)
                return false;
            return Object.keys(style).every(key => style[key] === selectedStyle[key]);
        });
        return this._getCustomStyles(storage, styles, selectedStyle, appearanceFound);
    }
    _getStyles(storage) {
        const savedStyles = (storage && storage.getValue() || []);
        return savedStyles.concat(Array.apply(null, Array(Math.max(this.numberOfCustomStyleItems - savedStyles.length, 0))));
    }
    _getCustomStyles(storage, styles, selectedStyle, styleExists) {
        if (!!selectedStyle && !styleExists) {
            let i = 0;
            for (; i < styles.length; i++) {
                if (!styles[i]) {
                    styles[i] = selectedStyle;
                    storage.setValue(styles);
                    break;
                }
            }
            if (styles.length === i) {
                styles[styles.length - 1] = selectedStyle;
            }
        }
        return styles;
    }
    createStyleSettingsModel(selectedValue, stylesModelType) {
        return (item) => {
            const model = _style_settings_adapters_1.styleSettingsAdapter(selectedValue, stylesModelType).itemFactory();
            _style_settings_adapters_1.styleSettingsAdapter(model).setPredefinedStyle(item);
            return model;
        };
    }
    createCustomColorStyleSettingsModel(selectedValue, stylesModelType) {
        return (color) => {
            const model = this.createStyleSettingsModel(selectedValue, stylesModelType)('Custom');
            color && _style_settings_adapters_1.styleSettingsAdapter(model).setCustomColor(color);
            return model;
        };
    }
    createCustomAppearanceStyleSettingsModel(selectedValue, stylesModelType) {
        return (appearance) => {
            const model = this.createStyleSettingsModel(selectedValue, stylesModelType)('Custom');
            appearance && _style_settings_adapters_1.styleSettingsAdapter(model).setCustomAppearance(appearance);
            return model;
        };
    }
    createItemViewModel(modelFactory, selectedValue) {
        return (item) => {
            const itemModel = modelFactory(item);
            return {
                item: itemModel,
                clickHandler: (saveCustomStyle) => this._setStyleType(itemModel, saveCustomStyle),
                isSelected: ko.computed(() => !!itemModel.equals(selectedValue())),
                isEmptyAllowed: this.isEmptyAllowed,
                isRange: false,
                isGradient: this.isGradient,
                restrictToColor: this.restrictToColor,
                getAvailableFontFamilies: this.getAvailableFontFamilies
            };
        };
    }
}
exports.StyleSettingsEditor = StyleSettingsEditor;
ko.components.register('dx-dashboard-style-settings-editor', {
    viewModel: {
        createViewModel: (params) => {
            return new StyleSettingsEditor(ko.unwrap(params).target, ko.unwrap(params).options);
        }
    },
    template: { element: 'dx-dashboard-style-settings-editor' }
});
