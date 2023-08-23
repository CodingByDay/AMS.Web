﻿/**
* DevExpress Dashboard (_appearance-settings-provider.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appearanceSettingsProvider = void 0;
const _utils_1 = require("../../data/_utils");
const _cssHelper_1 = require("../viewer/_cssHelper");
const _dx_devextreme_themes_integration_1 = require("../_dx-devextreme-themes-integration");
var AppearanceType = {
    WhiteColor: '#FFFFFF',
    GrayedTextColor: '#D3D3D3',
    LightGradientRedColor: 'rgb(255, 166, 173)',
    LightGradientYellowColor: 'rgb(255, 226, 81)',
    LightGradientGreenColor: 'rgb(139, 210, 78)',
    LightGradientBlueColor: 'rgb(149, 204, 255)',
    LightGradientPurpleColor: 'rgb(223, 166, 232)',
    LightGradientCyanColor: 'rgb(113, 223, 221)',
    LightGradientOrangeColor: 'rgb(255, 182, 90)',
    LightGradientTransparentColor: '#ffffff',
    DarkGradientRedColor: '#AC203D',
    DarkGradientYellowColor: '#FF8A01',
    DarkGradientGreenColor: '#538A31',
    DarkGradientBlueColor: '#4371B0',
    DarkGradientPurpleColor: '#7E53A2',
    DarkGradientCyanColor: '#149BA3',
    DarkGradientOrangeColor: '#D83D00',
    DarkGradientTransparentColor: '#303030',
    LightPaleRedColor: 'rgb(255, 221, 224)',
    LightPaleYellowColor: 'rgb(255, 245, 174)',
    LightPaleGreenColor: 'rgb(208, 239, 172)',
    LightPaleBlueColor: 'rgb(213, 237, 255)',
    LightPalePurpleColor: 'rgb(244, 221, 247)',
    LightPaleCyanColor: 'rgb(194, 244, 243)',
    LightPaleOrangeColor: 'rgb(255, 228, 180)',
    LightPaleGrayColor: 'rgb(234, 234, 234)',
    DarkPaleRedColor: '#5B2D3D',
    DarkPaleYellowColor: '#51492D',
    DarkPaleGreenColor: '#3B4D2D',
    DarkPaleBlueColor: '#2D3F5A',
    DarkPalePurpleColor: '#512D55',
    DarkPaleCyanColor: '#2D4B4B',
    DarkPaleOrangeColor: '#593E2D',
    DarkPaleGrayColor: '#444444',
    LightRedColor: 'rgb(226, 60, 76)',
    LightYellowColor: 'rgb(255, 166, 38)',
    LightGreenColor: 'rgb(101, 172, 80)',
    LightBlueColor: 'rgb(89, 143, 216)',
    LightPurpleColor: 'rgb(148, 105, 184)',
    LightCyanColor: 'rgb(39, 192, 187)',
    LightOrangeColor: 'rgb(255, 92, 12)',
    LightGrayColor: 'rgb(111, 111, 111)',
    DarkRedColor: '#E23C4C',
    DarkYellowColor: '#FFA626',
    DarkGreenColor: '#65AC50',
    DarkBlueColor: '#598FD8',
    DarkPurpleColor: '#9469B8',
    DarkCyanColor: '#27C0BB',
    DarkOrangeColor: '#FF5C0C',
    DarkGrayColor: '#6F6F6F',
    LightDefaultColorizationColor: '#d2d2d2',
    DarkDefaultColorizationColor: '#606060',
};
class appearanceSettingsProvider {
    static getColor(style) {
        let isDark = appearanceSettingsProvider.isDarkColorScheme();
        if (style.AppearanceType === 'Custom')
            return appearanceSettingsProvider._getCustomBackColor(style.Color);
        return appearanceSettingsProvider._getBackColorFromPredefinedStyle(style.AppearanceType, isDark);
    }
    static getDefaultColorizationColor() {
        return appearanceSettingsProvider.isDarkColorScheme() ? AppearanceType.DarkDefaultColorizationColor : AppearanceType.LightDefaultColorizationColor;
    }
    static toCssProperties(appearanceType, drawProperty) {
        const isDark = appearanceSettingsProvider.isDarkColorScheme();
        const styles = _cssHelper_1.getEmptyCssPropertyWrappersArray();
        if (drawProperty == null || drawProperty.shouldDrawBackColorStyle)
            styles.push(_cssHelper_1.createCssPropertyWrapper('background-color', appearanceSettingsProvider._getBackColorFromPredefinedStyle(appearanceType, isDark)));
        if (drawProperty == null || drawProperty.shouldDrawFontStyles)
            styles.push(appearanceSettingsProvider._createFontStyles(appearanceType, isDark));
        return styles;
    }
    static toCustomCssProperties(appearance) {
        var _a;
        const styles = _cssHelper_1.getEmptyCssPropertyWrappersArray();
        if (appearance.backColor()) {
            styles.push(_cssHelper_1.createCssPropertyWrapper('background-color', appearance.backColor().css));
        }
        if (appearance.foreColor()) {
            styles.push(_cssHelper_1.createCssPropertyWrapper('color', appearance.foreColor().css));
        }
        if (appearance.fontFamily()) {
            styles.push(_cssHelper_1.createCssPropertyWrapper('font-family', appearance.fontFamily()));
        }
        const fontOpts = ((_a = appearance.fontStyle()) === null || _a === void 0 ? void 0 : _a.split(',').filter(item => !!item).map(item => item.trim())) || [];
        const fontStyleWrapper = {
            bold: fontOpts.indexOf('Bold') !== -1,
            italic: fontOpts.indexOf('Italic') !== -1,
            underline: fontOpts.indexOf('Underline') !== -1
        };
        fontStyleWrapper.bold ?
            styles.push(this._createFontBold()) :
            styles.push(_cssHelper_1.createCssPropertyWrapper('font-weight', 'initial'));
        fontStyleWrapper.italic ?
            styles.push(this._createFontItalic()) :
            styles.push(_cssHelper_1.createCssPropertyWrapper('font-style', 'initial'));
        fontStyleWrapper.underline ?
            styles.push(this._createFontUnderline()) :
            styles.push(_cssHelper_1.createCssPropertyWrapper('text-decoration', 'initial'));
        return styles;
    }
    static _createFontBold() {
        return _cssHelper_1.createCssPropertyWrapper('font-weight', 'bold');
    }
    static _createFontItalic() {
        return _cssHelper_1.createCssPropertyWrapper('font-style', 'italic');
    }
    static _createFontUnderline() {
        return _cssHelper_1.createCssPropertyWrapper('text-decoration', 'underline');
    }
    static _createFontStyles(appearanceType, isDark) {
        switch (appearanceType) {
            case 'FontBold':
                return this._createFontBold();
            case 'FontItalic':
                return this._createFontItalic();
            case 'FontUnderline':
                return this._createFontUnderline();
            case 'FontGrayed':
                return _cssHelper_1.createCssPropertyWrapper('color', AppearanceType.GrayedTextColor);
            case 'FontRed':
                return _cssHelper_1.createCssPropertyWrapper('color', (isDark ? AppearanceType.DarkRedColor : AppearanceType.LightRedColor));
            case 'FontYellow':
                return _cssHelper_1.createCssPropertyWrapper('color', (isDark ? AppearanceType.DarkYellowColor : AppearanceType.LightYellowColor));
            case 'FontGreen':
                return _cssHelper_1.createCssPropertyWrapper('color', (isDark ? AppearanceType.DarkGreenColor : AppearanceType.LightGreenColor));
            case 'FontBlue':
                return _cssHelper_1.createCssPropertyWrapper('color', (isDark ? AppearanceType.DarkBlueColor : AppearanceType.LightBlueColor));
            default:
                let color = appearanceSettingsProvider.backAndGradientColorGroupsToBackColor(appearanceType);
                if (color !== undefined)
                    return null;
                color = appearanceSettingsProvider._backColorsWithFontGroupToBackColor(appearanceType, isDark);
                if (color !== undefined)
                    return _cssHelper_1.createCssPropertyWrapper('color', AppearanceType.WhiteColor);
                return null;
        }
    }
    static _getBackColorFromPredefinedStyle(appearanceType, isDark) {
        let color = appearanceSettingsProvider.backAndGradientColorGroupsToBackColor(appearanceType);
        if (color !== undefined)
            return color;
        color = appearanceSettingsProvider._backColorsWithFontGroupToBackColor(appearanceType, isDark);
        if (color !== undefined)
            return color;
        return null;
    }
    static backAndGradientColorGroupsToBackColor(appearanceType) {
        var isDark = appearanceSettingsProvider.isDarkColorScheme();
        switch (appearanceType) {
            case 'PaleRed':
                return isDark ? AppearanceType.DarkPaleRedColor : AppearanceType.LightPaleRedColor;
            case 'PaleYellow':
                return isDark ? AppearanceType.DarkPaleYellowColor : AppearanceType.LightPaleYellowColor;
            case 'PaleGreen':
                return isDark ? AppearanceType.DarkPaleGreenColor : AppearanceType.LightPaleGreenColor;
            case 'PaleBlue':
                return isDark ? AppearanceType.DarkPaleBlueColor : AppearanceType.LightPaleBlueColor;
            case 'PalePurple':
                return isDark ? AppearanceType.DarkPalePurpleColor : AppearanceType.LightPalePurpleColor;
            case 'PaleCyan':
                return isDark ? AppearanceType.DarkPaleCyanColor : AppearanceType.LightPaleCyanColor;
            case 'PaleOrange':
                return isDark ? AppearanceType.DarkPaleOrangeColor : AppearanceType.LightPaleOrangeColor;
            case 'PaleGray':
                return isDark ? AppearanceType.DarkPaleGrayColor : AppearanceType.LightPaleGrayColor;
            case 'GradientRed':
                return isDark ? AppearanceType.DarkGradientRedColor : AppearanceType.LightGradientRedColor;
            case 'GradientYellow':
                return isDark ? AppearanceType.DarkGradientYellowColor : AppearanceType.LightGradientYellowColor;
            case 'GradientGreen':
                return isDark ? AppearanceType.DarkGradientGreenColor : AppearanceType.LightGradientGreenColor;
            case 'GradientBlue':
                return isDark ? AppearanceType.DarkGradientBlueColor : AppearanceType.LightGradientBlueColor;
            case 'GradientPurple':
                return isDark ? AppearanceType.DarkGradientPurpleColor : AppearanceType.LightGradientPurpleColor;
            case 'GradientCyan':
                return isDark ? AppearanceType.DarkGradientCyanColor : AppearanceType.LightGradientCyanColor;
            case 'GradientOrange':
                return isDark ? AppearanceType.DarkGradientOrangeColor : AppearanceType.LightGradientOrangeColor;
            case 'GradientTransparent':
                return isDark ? AppearanceType.DarkGradientTransparentColor : AppearanceType.LightGradientTransparentColor;
            default: {
            }
        }
    }
    static _backColorsWithFontGroupToBackColor(appearanceType, isDark) {
        switch (appearanceType) {
            case 'Red':
                return isDark ? AppearanceType.DarkRedColor : AppearanceType.LightRedColor;
            case 'Yellow':
                return isDark ? AppearanceType.DarkYellowColor : AppearanceType.LightYellowColor;
            case 'Green':
                return isDark ? AppearanceType.DarkGreenColor : AppearanceType.LightGreenColor;
            case 'Blue':
                return isDark ? AppearanceType.DarkBlueColor : AppearanceType.LightBlueColor;
            case 'Purple':
                return isDark ? AppearanceType.DarkPurpleColor : AppearanceType.LightPurpleColor;
            case 'Cyan':
                return isDark ? AppearanceType.DarkCyanColor : AppearanceType.LightCyanColor;
            case 'Orange':
                return isDark ? AppearanceType.DarkOrangeColor : AppearanceType.LightOrangeColor;
            case 'Gray':
                return isDark ? AppearanceType.DarkGrayColor : AppearanceType.LightGrayColor;
            default: {
            }
        }
    }
    static _getCustomBackColor(color) {
        if (color.toHex)
            return color.toHex();
        return _utils_1.toColor(color);
    }
    static isDarkColorScheme() {
        return _dx_devextreme_themes_integration_1.getBaseColorScheme() === 'dark';
    }
}
exports.appearanceSettingsProvider = appearanceSettingsProvider;
