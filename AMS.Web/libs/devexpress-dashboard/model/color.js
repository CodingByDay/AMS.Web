﻿/**
* DevExpress Dashboard (color.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
const color_1 = require("devextreme/color");
const ko = require("knockout");
const _appearance_settings_provider_1 = require("../viewer-parts/conditional-formatting/_appearance-settings-provider");
class Color {
    constructor(colorValue) {
        let a = (colorValue >> 0x18) & 0xff, r = (colorValue >> 0x10) & 0xff, g = (colorValue >> 0x8) & 0xff, b = colorValue & 0xff;
        this._dxColor = new color_1.default(this._toRgbaString(r, g, b, a / 255));
    }
    static fromArgb(alpha, red, green, blue) {
        return new Color(Color.toNumber(alpha, red, green, blue));
    }
    static fromRgbaString(rgbaColor) {
        return Color.fromDxColor(new color_1.default(rgbaColor));
    }
    static fromJSON(jsonValue) {
        return new Color(parseInt(jsonValue, 10));
    }
    static fromAppearance(appearanceType) {
        var color = new Color(0);
        color._dxColor = new color_1.default(_appearance_settings_provider_1.appearanceSettingsProvider.backAndGradientColorGroupsToBackColor(appearanceType));
        return color;
    }
    static fromDxColor(dxColor) {
        var color = new Color(0);
        color._dxColor = dxColor;
        return color;
    }
    static toNumber(alpha, red, green, blue) {
        return ((((alpha * 255 << 0x18) | (red << 0x10) | (green << 0x8)) | blue)) & 0xffffffff;
    }
    static toJSON(color) {
        return Color.toNumber(color.A, color.R, color.G, color.B);
    }
    static contrastColor(baseColor) {
        var luminance = 1 - (0.299 * baseColor.R + 0.587 * baseColor.G + 0.114 * baseColor.B) / 255;
        var result = luminance < 0.5 ? 0 : 255;
        return Color.fromArgb(1, result, result, result);
    }
    static _colorFromModel(value) {
        return ko.observable(value ? Color.fromJSON(value) : null);
    }
    static _colorRgbaFromModel(value) {
        return ko.observable(value ? Color.fromJSON(value).css : null);
    }
    static _colorToModel(value) {
        return value ? Color.toJSON(value) : null;
    }
    static _colorRgbaToModel(rgbaColor) {
        return rgbaColor ? Color.fromRgbaString(rgbaColor).toNumber() : null;
    }
    toNumber() {
        return Color.toNumber(this.A, this.R, this.G, this.B);
    }
    static toHex(colorValue) {
        return new Color(colorValue).toHex();
    }
    static equals(color1, color2) {
        return (!color1 && !color2) || (color1 && color2 && color1.toNumber() === color2.toNumber());
    }
    get A() { return this._dxColor.a; }
    get R() { return this._dxColor.r; }
    get G() { return this._dxColor.g; }
    get B() { return this._dxColor.b; }
    get css() { return this._toRgbaString(this.R, this.G, this.B, this.A); }
    blend(blendColor, opacity) {
        return this._dxColor.blend(blendColor._dxColor, opacity);
    }
    toHex() {
        return this._dxColor.toHex();
    }
    _toRgbaString(r, g, b, a) {
        return 'rgba(' + [r, g, b, a].join(',') + ')';
    }
}
exports.Color = Color;
