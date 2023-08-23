﻿/**
* DevExpress Analytics (core\utils\_units.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export function roundingXDecimals(value, useFloor = false, x = 3) {
    return (useFloor ? Math.floor : Math.round)(value * Math.pow(10, x)) / Math.pow(10, x);
}
export function unitsToPixel(val, measureUnit, zoom = 1) {
    var result;
    if (measureUnit === 'Pixels') {
        result = 1 * val;
    }
    else if (measureUnit === 'TenthsOfAMillimeter') {
        result = val * 3.78 / 10;
    }
    else {
        result = val * 96 / 100;
    }
    result = result * (zoom);
    return roundingXDecimals(result, true);
}
export function pixelToUnits(val, measureUnit, zoom) {
    var result;
    if (measureUnit === 'Pixels') {
        result = 1 * val;
    }
    else if (measureUnit === 'TenthsOfAMillimeter') {
        result = val / 3.78 * 10;
    }
    else {
        result = val / 96 * 100;
    }
    result = result / (zoom);
    return roundingXDecimals(result);
}
export function createUnitProperty(model, target, propertyName, property, measureUnit, zoom, afterCreation) {
    var lastVal = 0;
    target[propertyName] = ko.pureComputed({
        read: () => {
            var val = property(model)(), newVal = unitsToPixel(val, measureUnit.peek(), zoom());
            if (Math.abs(newVal - lastVal) > 0.2) {
                lastVal = newVal;
                return lastVal;
            }
            return lastVal;
        },
        write: (val) => {
            if (Math.abs(val - lastVal) <= 0.2)
                return;
            lastVal = val;
            var result = pixelToUnits(val, measureUnit.peek(), zoom());
            property(model)(result);
        }
    });
    afterCreation(target[propertyName]);
}
export function createUnitProperties(model, target, properties, measureUnit, zoom, afterCreation) {
    if (!properties)
        return;
    Object.keys(properties).forEach(propertyName => {
        createUnitProperty(model, target, propertyName, properties[propertyName], measureUnit, zoom, afterCreation);
    });
}
