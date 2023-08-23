﻿/**
* DevExpress Dashboard (_default-palette.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultDashboardPalette = void 0;
class DefaultDashboardPalette {
    static getColor(index) {
        return this.colors[index % this.colors.length];
    }
    static getNextColor(currentColorIndex, existedColors) {
        let index = currentColorIndex;
        let nextColor = this.getColor(index++);
        while (existedColors.some(color => color === nextColor)) {
            if (index % this.colors.length === currentColorIndex) {
                index = this.colors.indexOf(existedColors[existedColors.length - 1]);
                return this.getColor(index + 1);
            }
            nextColor = this.getColor(index++);
        }
        return nextColor;
    }
}
exports.DefaultDashboardPalette = DefaultDashboardPalette;
DefaultDashboardPalette.colors = [
    'rgba(95,139,149,1)',
    'rgba(186,77,81,1)',
    'rgba(175,138,83,1)',
    'rgba(149,95,113,1)',
    'rgba(133,150,102,1)',
    'rgba(126,104,140,1)',
    'rgba(95,109,149,1)',
    'rgba(172,86,156,1)',
    'rgba(166,175,83,1)',
    'rgba(149,113,95,1)',
    'rgba(93,158,129,1)',
    'rgba(166,119,155,1)',
    'rgba(74,161,170,1)',
    'rgba(113,129,197,1)',
    'rgba(196,133,61,1)',
    'rgba(187,194,137,1)',
    'rgba(157,83,97,1)',
    'rgba(83,110,190,1)',
    'rgba(92,87,126,1)',
    'rgba(227,166,83,1)'
];
