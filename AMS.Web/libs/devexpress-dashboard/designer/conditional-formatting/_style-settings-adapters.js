/**
* DevExpress Dashboard (_style-settings-adapters.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styleSettingsAdapter = exports.appearanceStyleSettingsAdapter = void 0;
const _default_1 = require("../../data/localization/_default");
const color_1 = require("../../model/color");
const appearance_settings_1 = require("../../model/format-rules/style-settings/appearance-settings");
const bar_style_settings_1 = require("../../model/format-rules/style-settings/bar-style-settings");
const color_style_settings_1 = require("../../model/format-rules/style-settings/color-style-settings");
const icon_settings_1 = require("../../model/format-rules/style-settings/icon-settings");
const _appearance_settings_1 = require("../../model/format-rules/style-settings/metadata/_appearance-settings");
const _icon_settings_1 = require("../../model/format-rules/style-settings/metadata/_icon-settings");
const _style_settings_base_1 = require("../../model/format-rules/style-settings/metadata/_style-settings-base");
const _appearance_settings_provider_1 = require("../../viewer-parts/conditional-formatting/_appearance-settings-provider");
const _style_settings_provider_1 = require("../../viewer-parts/conditional-formatting/_style-settings-provider");
const _cssHelper_1 = require("../../viewer-parts/viewer/_cssHelper");
const _style_settings_palette_1 = require("./_style-settings-palette");
const colorStyleSettingsAdapter = {
    getCssStyles: (item) => {
        const predefinedColor = item.predefinedColor();
        if (predefinedColor === 'Custom' || predefinedColor === _style_settings_base_1.emptyStyleType) {
            return { 'background-color': item.color() && item.color().css };
        }
        return _cssHelper_1.convertCssPropertyWrappersToObject(_appearance_settings_provider_1.appearanceSettingsProvider.toCssProperties(predefinedColor));
    },
    getCssClasses: (item, isEmptyAllowed, isRange) => {
        const isEmpty = isEmptyAllowed && item.predefinedColor() === _style_settings_base_1.emptyStyleType;
        const restrictToColor = true;
        const isGradient = false;
        const isLabel = colorStyleSettingsAdapter.isEmptyCustomStyle(item) || (colorStyleSettingsAdapter.getLabelText(item, isRange, isGradient, restrictToColor) !== '');
        const isTransparent = item.predefinedColor() === 'GradientTransparent';
        return [
            isEmpty ? 'dx-dashboard-appearance-item-empty' : '',
            isLabel ? 'dx-dashboard-appearance-item-label' : '',
            isRange ? 'dx-dashboard-range-appearance-item' : 'dx-dashboard-appearance-item',
            isTransparent && !isRange ? 'dx-dashboard-appearance-item-label dx-dashboard-appearance-item-transparent' : ''
        ];
    },
    getLocalizedCaption: (item) => _default_1.getLocalizationById(_appearance_settings_1.appearanceType.values[item.predefinedColor()]),
    getLabelText: (item, isRange, isGradient) => {
        const labelText = _style_settings_palette_1.Palette.getLabelText(item.predefinedColor(), isGradient ? _default_1.getLocalizationById('DashboardWebStringId.EditorAutomaticValue') : _default_1.getLocalizationById('DashboardWebStringId.FormatConditionRangeSetNoStyleCaption'));
        return (!isRange || isRange && item.predefinedColor() !== _style_settings_base_1.emptyStyleType) ? labelText : '';
    },
    getPredefinedStyle: (item) => item.predefinedColor(),
    setPredefinedStyle: (item, style) => item.predefinedColor(style),
    hasCustomStyle: (item) => item.predefinedColor() === 'Custom',
    isEmptyCustomStyle: (item) => colorStyleSettingsAdapter.hasCustomStyle(item) && !item.color(),
    getCustomColor: (item) => item.color() && item.color().css,
    getCustomAppearance: (item) => null,
    setCustomColor: (item, style) => item.color(style && color_1.Color.fromRgbaString(style)),
    setCustomAppearance: () => { },
};
const iconStyleSettingsAdapter = {
    getCssStyles: () => ({}),
    getCssClasses: (item, isEmptyAllowed, isRange) => {
        if (isEmptyAllowed && item.iconType() === _style_settings_base_1.emptyStyleType) {
            return [
                'dx-dashboard-appearance-item',
                'dx-dashboard-appearance-item-label',
                'dx-dashboard-appearance-item-empty'
            ];
        }
        return [
            isRange ? 'dx-dashboard-rangeicon' : 'dx-dashboard-icon-item',
            _style_settings_provider_1.styleSettingsProvider.toIconCssClass(item.iconType())
        ];
    },
    getLocalizedCaption: (item) => _default_1.getLocalizationById(_icon_settings_1.iconType.values[item.iconType()]),
    getLabelText: (item, isRange, isGradient) => {
        const labelText = _style_settings_palette_1.Palette.getLabelText(item.iconType(), isGradient ? _default_1.getLocalizationById('DashboardWebStringId.EditorAutomaticValue') : _default_1.getLocalizationById('DashboardWebStringId.FormatConditionRangeSetNoStyleCaption'));
        return (!isRange || isRange && item.iconType() !== _style_settings_base_1.emptyStyleType) ? labelText : '';
    },
    getPredefinedStyle: (item) => item.iconType(),
    setPredefinedStyle: (item, style) => item.iconType(style),
    hasCustomStyle: () => false,
    isEmptyCustomStyle: () => false,
    getCustomColor: () => null,
    getCustomAppearance: () => null,
    setCustomColor: () => { },
    setCustomAppearance: () => { },
};
exports.appearanceStyleSettingsAdapter = {
    getCssStyles: (item) => {
        if (item.appearanceType() !== _style_settings_base_1.emptyStyleType && !exports.appearanceStyleSettingsAdapter.hasCustomStyle(item)) {
            return _cssHelper_1.convertCssPropertyWrappersToObject(_appearance_settings_provider_1.appearanceSettingsProvider.toCssProperties(item.appearanceType()));
        }
        const customCss = _cssHelper_1.convertCssPropertyWrappersToObject(_appearance_settings_provider_1.appearanceSettingsProvider.toCustomCssProperties(item));
        return customCss;
    },
    getCssClasses: (item, isEmptyAllowed, isRange, isGradient = false, restrictToColor = false) => {
        const _isEmptyAppearanceItem = () => isEmptyAllowed && item.appearanceType() === _style_settings_base_1.emptyStyleType;
        const _isTransparent = () => item.appearanceType() === 'GradientTransparent';
        const _isLabel = () => (item.appearanceType() === 'GradientTransparent')
            || (exports.appearanceStyleSettingsAdapter.getLabelText(item, isRange, isGradient, restrictToColor) !== '' && !_style_settings_palette_1.Palette.richColors.includes(item.appearanceType()))
            || (exports.appearanceStyleSettingsAdapter.isEmptyCustomStyle(item));
        return [
            isRange ? 'dx-dashboard-range-appearance-item' : 'dx-dashboard-appearance-item',
            _isEmptyAppearanceItem() ? 'dx-dashboard-appearance-item-empty' : '',
            _isLabel() ? 'dx-dashboard-appearance-item-label' : '',
            _isTransparent() && !isRange ? 'dx-dashboard-appearance-item-transparent' : ''
        ];
    },
    getLocalizedCaption: (item) => _default_1.getLocalizationById(_appearance_settings_1.appearanceType.values[item.appearanceType()]),
    getLabelText: (item, isRange, isGradient, restrictToColor) => {
        const customAppearance = exports.appearanceStyleSettingsAdapter.getCustomAppearance(item);
        if (customAppearance && !isGradient) {
            return _style_settings_palette_1.Palette.getCustomLabelText(customAppearance);
        }
        const labelText = _style_settings_palette_1.Palette.getLabelText(item.appearanceType(), isGradient ? _default_1.getLocalizationById('DashboardWebStringId.EditorAutomaticValue') : _default_1.getLocalizationById('DashboardWebStringId.FormatConditionRangeSetNoStyleCaption'));
        return (!restrictToColor && (!isRange || isRange && item.appearanceType() !== _style_settings_base_1.emptyStyleType)
            || (restrictToColor && !isRange && item.appearanceType() === _style_settings_base_1.emptyStyleType)) ? labelText : '';
    },
    getPredefinedStyle: (item) => item.appearanceType(),
    setPredefinedStyle: (item, style) => item.appearanceType(style),
    hasCustomStyle: (item) => item.appearanceType() === 'Custom',
    isEmptyCustomStyle: (item) => {
        return exports.appearanceStyleSettingsAdapter.hasCustomStyle(item)
            && !item.foreColor() && !item.backColor()
            && item.fontStyle() === _appearance_settings_1.fontStyle.defaultVal
            && item.fontFamily() === _appearance_settings_1.fontFamily.defaultVal;
    },
    getCustomColor: (item) => item.backColor() && item.backColor().css,
    getCustomAppearance: (item) => {
        var _a, _b;
        return !exports.appearanceStyleSettingsAdapter.hasCustomStyle(item) || exports.appearanceStyleSettingsAdapter.isEmptyCustomStyle(item) ? null : ({
            fontFamily: item.fontFamily(),
            fontStyle: item.fontStyle(),
            backColor: (_a = item.backColor()) === null || _a === void 0 ? void 0 : _a.css,
            foreColor: (_b = item.foreColor()) === null || _b === void 0 ? void 0 : _b.css
        });
    },
    setCustomColor: (item, style) => item.backColor(style && color_1.Color.fromRgbaString(style)),
    setCustomAppearance: (item, style) => {
        item.fontFamily(style && style.fontFamily);
        item.fontStyle(style ? style.fontStyle : null);
        item.backColor(style && style.backColor && color_1.Color.fromRgbaString(style.backColor));
        item.foreColor(style && style.foreColor && color_1.Color.fromRgbaString(style.foreColor));
    },
};
function styleSettingsAdapter(item, itemType) {
    let adapter;
    switch (itemType || item.constructor) {
        case appearance_settings_1.AppearanceSettings:
            itemType = appearance_settings_1.AppearanceSettings;
            adapter = exports.appearanceStyleSettingsAdapter;
            break;
        case icon_settings_1.IconSettings:
            itemType = icon_settings_1.IconSettings;
            adapter = iconStyleSettingsAdapter;
            break;
        case bar_style_settings_1.BarStyleSettings:
            itemType = bar_style_settings_1.BarStyleSettings;
            adapter = colorStyleSettingsAdapter;
            break;
        case color_style_settings_1.ColorStyleSettings:
            itemType = color_style_settings_1.ColorStyleSettings;
            adapter = colorStyleSettingsAdapter;
            break;
        default:
            throw new Error('Unknown StyleSettings type');
    }
    return {
        itemFactory: () => new itemType(),
        getCssStyles: () => adapter.getCssStyles(item),
        getCssClasses: (isEmptyAllowed, isRange, isGradient) => adapter.getCssClasses(item, isEmptyAllowed, isRange, isGradient),
        getLocalizedCaption: () => adapter.getLocalizedCaption(item),
        getLabelText: (isRange, isGradient, restrictToColor) => adapter.getLabelText(item, isRange, isGradient, restrictToColor),
        getPredefinedStyle: () => adapter.getPredefinedStyle(item),
        setPredefinedStyle: (style) => adapter.setPredefinedStyle(item, style),
        hasCustomStyle: () => adapter.hasCustomStyle(item),
        isEmptyCustomStyle: () => adapter.isEmptyCustomStyle(item),
        getCustomColor: () => adapter.getCustomColor(item),
        getCustomAppearance: () => adapter.getCustomAppearance(item),
        setCustomColor: (style) => adapter.setCustomColor(item, style),
        setCustomAppearance: (style) => adapter.setCustomAppearance(item, style),
    };
}
exports.styleSettingsAdapter = styleSettingsAdapter;
