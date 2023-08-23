﻿/**
* DevExpress Analytics (core\utils\parsers.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { getShortTypeName } from '../internal/_getNameHelpers';
export function floatFromModel(val) {
    return ko.observable(val === undefined || val === null ? null : parseFloat(val));
}
export function fromEnum(value) {
    var shotEnumValueKey = getShortTypeName(value);
    var valuesArrayItem = this.valuesArray && this.valuesArray.filter(item => item.value == shotEnumValueKey)[0];
    return ko.observable((this.values && this.values[shotEnumValueKey] !== undefined || valuesArrayItem) ? shotEnumValueKey : value);
}
export function parseBool(val) {
    return ko.observable(val !== void 0 ? String(val).toLowerCase() === 'true' : val);
}
export function colorFromString(val) {
    var color = (val || '').split(',');
    var result = ko.observable(val);
    if (color.length === 3) {
        result = ko.observable('rgb(' + color.join(', ') + ')');
    }
    else if (color.length === 4) {
        var alpha = Math.round(parseFloat(color[0]) / 255 * 100) / 100;
        color.shift();
        color.push(alpha.toString());
        result = ko.observable('rgba(' + color.join(', ') + ')');
    }
    return result;
}
export function saveAsInt(val) {
    return Math.round(val).toString();
}
export function colorToInt(color) {
    var colorAsString = colorToString(color).split(',');
    return (parseInt(colorAsString[0]) << 24) + (parseInt(colorAsString[1]) << 16) + (parseInt(colorAsString[2]) << 8) + (parseInt(colorAsString[3]));
}
export function intToColor(color, hasAlpha = true) {
    var r = Math.round((color >> 16) & 0xff);
    var g = Math.round((color >> 8) & 0xff);
    var b = Math.round((color) & 0xff);
    if (hasAlpha) {
        var a = Math.round((color >> 24) & 0xff);
        return colorFromString([a, r, g, b].join(', '))();
    }
    else {
        return colorFromString([r, g, b].join(', '))();
    }
}
export function colorToString(val) {
    var color = (val || '').split(', ');
    var result = val;
    if (color.length === 3) {
        color[0] = color[0].split('(')[1];
        color[2] = color[2].split(')')[0];
        result = color.join(',');
    }
    else if (color.length === 4) {
        var alpha = Math.round(parseFloat(color[3]) * 255);
        color.pop();
        color[0] = color[0].split('(')[1];
        result = alpha.toString() + ',' + color.join(',');
    }
    return result;
}
