﻿/**
* DevExpress Analytics (core\utils\_arrayutils.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { knockoutArrayWrapper } from '../../serializer/_utils';
export function createObservableReverseArrayMapCollection(elementModels, target, createItem) {
    var array = target();
    elementModels.peek().forEach(item => {
        var surface = createItem(item);
        array.splice(0, 0, surface);
    });
    target.valueHasMutated();
    return elementModels.subscribe((args) => {
        var unwrapedTarget = target();
        var targetLength = unwrapedTarget.length;
        args.forEach((changeSet) => {
            if (changeSet.status === 'deleted') {
                unwrapedTarget.splice(unwrapedTarget.indexOf(changeSet.value.surface), 1);
                targetLength--;
            }
        });
        args.forEach((changeSet) => {
            if (changeSet.status === 'added') {
                unwrapedTarget.splice(targetLength - changeSet.index, 0, createItem(changeSet.value));
                targetLength++;
            }
        });
        target.valueHasMutated();
    }, null, 'arrayChange');
}
export function createObservableArrayMapCollection(elementModels, target, createItem) {
    var array = target();
    elementModels.peek().forEach(item => {
        var surface = createItem(item);
        array.push(surface);
    });
    target.valueHasMutated();
    return elementModels.subscribe((args) => {
        var startIndex = target().length, deleteCount = 0, valuesToAdd = [];
        args.forEach((changeSet) => {
            if (changeSet.status === 'deleted') {
                deleteCount++;
                if (changeSet.index < startIndex) {
                    startIndex = changeSet.index;
                }
            }
        });
        args.forEach((changeSet) => {
            if (changeSet.status === 'added') {
                if (changeSet.index < startIndex) {
                    startIndex = changeSet.index;
                }
                valuesToAdd.push(createItem(changeSet.value));
            }
        });
        target.splice.apply(target, [startIndex, deleteCount].concat(valuesToAdd));
    }, null, 'arrayChange');
}
export function deserializeChildArray(model, parent, creator) {
    var result = Object.keys(model || {}).map(propertyName => creator(model[propertyName]));
    return knockoutArrayWrapper(result, (array, event) => {
        if (event === 'beforeChange') {
            return;
        }
        if (event === 'arrayChange') {
            for (var i = 0; i < array.length; i++) {
                parent !== array[i].value.parentModel() && array[i].value.parentModel(parent);
            }
        }
        else {
            for (var i = 0; i < array.length; i++) {
                parent !== array[i].parentModel() && array[i].parentModel(parent);
            }
        }
    });
}
export function getFirstItemByPropertyValue(array, propertyName, propertyValue, fromIndex) {
    var fromIndex = fromIndex || 0;
    for (var i = fromIndex; i < array.length; i++) {
        var value = ko.isObservable(array[i][propertyName]) ? array[i][propertyName].peek() : array[i][propertyName];
        if (value === propertyValue) {
            return array[i];
        }
    }
    return null;
}
export function findFirstItemMatchesCondition(array, predicate) {
    for (var i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            return array[i];
        }
    }
    return null;
}
export var find = findFirstItemMatchesCondition;
export function binaryIndexOf(ar, el, compare) {
    var m = 0;
    var n = ar.length - 1;
    while (m <= n) {
        var k = (n + m) >> 1;
        var cmp = compare(el, ar[k]);
        if (cmp > 0) {
            m = k + 1;
        }
        else if (cmp < 0) {
            n = k - 1;
        }
        else {
            return k;
        }
    }
    return ~m;
}
export function compareArrays(array1, array2) {
    if (!array1 || !array2)
        return false;
    if (array1.length !== array2.length)
        return false;
    for (var i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i])
            return false;
    }
    return true;
}
