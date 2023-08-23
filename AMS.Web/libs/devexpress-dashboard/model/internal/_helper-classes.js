﻿/**
* DevExpress Dashboard (_helper-classes.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumManager = exports.Guard = exports.isComponentNameValid = exports.NameGenerator = void 0;
const ko = require("knockout");
class NameGenerator {
    static validateName(object, nameCollection, propertyName, startIndex, addWhiteSpace = false) {
        var currentName = ko.unwrap(object[propertyName]);
        if (!NameGenerator.isValidName(currentName, nameCollection, propertyName)) {
            object[propertyName](NameGenerator.generateName(currentName, nameCollection, propertyName, startIndex, addWhiteSpace));
        }
    }
    static isValidName(name, nameCollection, propertyName) {
        return nameCollection.map((value) => ko.unwrap(value[propertyName])).filter((value) => value === name).length === 0;
    }
    static generateName(namePrefix, nameCollection, propertyName, startIndex, addWhiteSpace = false) {
        var getNewName = (index) => {
            return namePrefix + (addWhiteSpace ? ' ' : '') + index;
        };
        var i = startIndex ? startIndex : 0, name = getNewName(i);
        while (!NameGenerator.isValidName(name, nameCollection, propertyName)) {
            name = getNewName(++i);
        }
        return name;
    }
}
exports.NameGenerator = NameGenerator;
function isComponentNameValid(name) {
    return !!(name && (typeof name === 'string') && name.length && name.match(/^[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)*$/));
}
exports.isComponentNameValid = isComponentNameValid;
class Guard {
    static isNotFalsy(object, name) {
        if (!object) {
            throw new Error(name + ' should not be falsy.');
        }
    }
    static requires(condition, message) {
        if (!condition)
            throw new Error(message || 'Required code contract condition is not met.');
    }
}
exports.Guard = Guard;
class EnumManager {
    static getNamesAndValues(enumType) {
        return this.getNames(enumType).map(name => {
            return {
                name: name,
                value: enumType[name]
            };
        });
    }
    static getNames(enumType) {
        return EnumManager._getObjectValues(enumType).filter(value => typeof value === 'string');
    }
    static getValues(enumType) {
        return EnumManager._getObjectValues(enumType).filter(value => typeof value === 'number');
    }
    static _getObjectValues(enumType) {
        return Object.keys(enumType).map(key => enumType[key]);
    }
}
exports.EnumManager = EnumManager;
