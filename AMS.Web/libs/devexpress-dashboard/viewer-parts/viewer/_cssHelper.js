/**
* DevExpress Dashboard (_cssHelper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCssPropertyWrappersToObject = exports.convertCssPropertyWrappersToString = exports.createCssClass = exports.addToStyles = exports.createStylesElement = exports.getEmptyCssPropertyWrappersArray = exports.createCssPropertyWrapper = void 0;
function createCssPropertyWrapper(propertyName, propertyValue) {
    return { propertyName, propertyValue };
}
exports.createCssPropertyWrapper = createCssPropertyWrapper;
function getEmptyCssPropertyWrappersArray() {
    return [];
}
exports.getEmptyCssPropertyWrappersArray = getEmptyCssPropertyWrappersArray;
function createStylesElement(nonce) {
    var style = document.getElementById('dx-dashboard-styles');
    if (!style) {
        style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.setAttribute('id', 'dx-dashboard-styles');
        if (nonce) {
            style.setAttribute('nonce', nonce);
        }
        document.head.appendChild(style);
    }
}
exports.createStylesElement = createStylesElement;
function addToStyles(styles) {
    var style = document.getElementById('dx-dashboard-styles');
    style.textContent += styles;
    return () => {
        style.textContent = style.textContent.replace(styles, '');
    };
}
exports.addToStyles = addToStyles;
function createCssClass(cssSelector, cssProperties) {
    return addToStyles(cssSelector + ' {' + convertCssPropertyWrappersToString(cssProperties) + '}');
}
exports.createCssClass = createCssClass;
function convertCssPropertyWrappersToString(properties) {
    return properties
        .filter(x => x && x.propertyValue)
        .map(value => value.propertyName + ': ' + value.propertyValue + ';')
        .join(' ');
}
exports.convertCssPropertyWrappersToString = convertCssPropertyWrappersToString;
function convertCssPropertyWrappersToObject(properties) {
    return properties
        .filter(x => x && x.propertyValue)
        .reduce((result, current) => {
        result[current.propertyName] = current.propertyValue;
        return result;
    }, {});
}
exports.convertCssPropertyWrappersToObject = convertCssPropertyWrappersToObject;
