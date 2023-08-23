﻿/**
* DevExpress Dashboard (_style-settings-palette.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Palette = void 0;
const _default_1 = require("../../data/localization/_default");
const _style_settings_base_1 = require("../../model/format-rules/style-settings/metadata/_style-settings-base");
exports.Palette = {
    standard: [
        'PaleRed',
        'PaleYellow',
        'PaleGreen',
        'PaleBlue',
        'PalePurple',
        'PaleCyan',
        'PaleOrange',
        'PaleGray',
        'Red',
        'Yellow',
        'Green',
        'Blue',
        'Purple',
        'Cyan',
        'Orange',
        'Gray',
        'FontBold',
        'FontItalic',
        'FontUnderline',
        'FontGrayed',
        'FontRed',
        'FontYellow',
        'FontGreen',
        'FontBlue'
    ],
    richColors: [
        'Red',
        'Yellow',
        'Green',
        'Blue',
        'Purple',
        'Cyan',
        'Orange',
        'Gray',
    ],
    allColors: [
        'PaleRed',
        'PaleYellow',
        'PaleGreen',
        'PaleBlue',
        'PalePurple',
        'PaleCyan',
        'PaleOrange',
        'PaleGray',
        'Red',
        'Yellow',
        'Green',
        'Blue',
        'Purple',
        'Cyan',
        'Orange',
        'Gray'
    ],
    gradient: [
        'GradientRed',
        'GradientYellow',
        'GradientGreen',
        'GradientBlue',
        'GradientPurple',
        'GradientCyan',
        'GradientOrange',
        'GradientTransparent'
    ],
    getLabelText: (type, empty) => {
        switch (type) {
            case _style_settings_base_1.emptyStyleType: return empty ? empty : _default_1.getLocalizationById('DashboardWebStringId.FormatConditionRangeSetNoStyleCaption');
            case 'FontBold': return 'B';
            case 'FontItalic': return 'I';
            case 'FontUnderline': return 'U';
            case 'FontGrayed': return 'Gr';
            case 'FontRed': return 'R';
            case 'FontYellow': return 'Y';
            case 'FontGreen': return 'G';
            case 'FontBlue': return 'B';
            case 'Red':
            case 'Yellow':
            case 'Green':
            case 'Blue':
            case 'Purple':
            case 'Cyan':
            case 'Orange':
            case 'Gray':
                return 'T';
            default: return '';
        }
    },
    getCustomLabelText: (appearance) => {
        if (appearance) {
            return 'T';
        }
        return '';
    }
};
