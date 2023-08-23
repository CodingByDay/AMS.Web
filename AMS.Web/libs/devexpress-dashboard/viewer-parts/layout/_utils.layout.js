﻿/**
* DevExpress Dashboard (_utils.layout.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepCloneObject = exports.ensureRange = exports.checkRange = exports.defSizeInPercents = exports.defConstraints = exports.getCrossDirection = exports.nonClientElement = exports.constraints = exports.size = void 0;
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
let size = function (w, h) {
    return {
        width: w,
        height: h,
        plus: function (arg) {
            var correctSize = function (value, addition) {
                return (Number.MAX_VALUE - value >= addition) ? value + addition : Number.MAX_VALUE;
            };
            return exports.size(correctSize(this.width, arg.width), correctSize(this.height, arg.height));
        },
        minus: function (arg) {
            return exports.size(this.width - arg.width, this.height - arg.height);
        },
        compareByDirections: function (size) {
            if (!size) {
                return ['width', 'height'];
            }
            else {
                var differentDirections = [];
                if (size.width != this.width)
                    differentDirections.push('width');
                if (size.height != this.height)
                    differentDirections.push('height');
                return differentDirections;
            }
        },
        constrain: function (constraints) {
            var that = this, ensureDirection = function (direction) {
                return exports.ensureRange(that[direction], constraints.min[direction], constraints.max[direction]);
            };
            return exports.size(ensureDirection('width'), ensureDirection('height'));
        },
        clone: function () {
            return exports.size(this.width, this.height);
        }
    };
};
exports.size = size;
let constraints = function (pMin, pMax) {
    return {
        min: pMin,
        max: pMax,
        consolidate: function (sourceConstraints, consolidateDirection) {
            return exports.constraints(this._consolidatePart(sourceConstraints, consolidateDirection, 'min'), this._consolidatePart(sourceConstraints, consolidateDirection, 'max'));
        },
        isFixed: function (direction) {
            if (direction) {
                var differentDirections = this.min.compareByDirections(this.max);
                return differentDirections.indexOf(direction) === -1;
            }
            else {
                return false;
            }
        },
        _consolidatePart: function (sourceConstraints, consolidateDirection, part) {
            var that = this, resultSize = exports.size(), direction = consolidateDirection ? consolidateDirection : 'width', crossDirection = exports.getCrossDirection(direction), consolidateSumFunc = function (currentDirection) {
                var val1 = that[part][currentDirection], val2 = sourceConstraints[part][currentDirection];
                return (val1 === Number.MAX_VALUE || val2 === Number.MAX_VALUE) ? Number.MAX_VALUE : (val1 + val2);
            }, consolidateMaxMinFunc = function (currentDirection, isCross) {
                var val1 = that[part][currentDirection], val2 = sourceConstraints[part][currentDirection];
                return (part === 'min' || isCross) ? Math.max(val1, val2) : Math.min(val1, val2);
            };
            resultSize[direction] = consolidateDirection ? consolidateSumFunc(direction) : consolidateMaxMinFunc(direction, false);
            resultSize[crossDirection] = consolidateMaxMinFunc(crossDirection, !!consolidateDirection);
            return resultSize;
        }
    };
};
exports.constraints = constraints;
let nonClientElement = function (width, height) {
    var resultSize = exports.size(width, height);
    return {
        getBounds: function () {
            return resultSize.clone();
        }
    };
};
exports.nonClientElement = nonClientElement;
let getCrossDirection = function (direction) {
    return direction === 'width' ? 'height' : 'width';
};
exports.getCrossDirection = getCrossDirection;
let defConstraints = function (valueMin, valueMax) {
    var paramValueMin = valueMin === undefined ? 0 : valueMin, paramValueMax = valueMax === undefined ? Number.MAX_VALUE : valueMax;
    return new this.constraints(new this.size(paramValueMin, paramValueMin), new this.size(paramValueMax, paramValueMax));
};
exports.defConstraints = defConstraints;
let defSizeInPercents = function (direction, value) {
    var size = new this.size(1, 1);
    size[direction] = value;
    return size;
};
exports.defSizeInPercents = defSizeInPercents;
let checkRange = function (value, min, max) {
    return min <= value && value <= max;
};
exports.checkRange = checkRange;
let ensureRange = function (value, min, max) {
    return Math.max(Math.min(value, max), min);
};
exports.ensureRange = ensureRange;
let deepCloneObject = function (injectObject, sourceObject, noDeepCopyPropsValues) {
    var copyObj = {};
    _jquery_helpers_1.extend(copyObj, sourceObject);
    for (var prop in noDeepCopyPropsValues)
        delete copyObj[prop];
    _jquery_helpers_1.deepExtend(injectObject, copyObj);
    _jquery_helpers_1.extend(injectObject, noDeepCopyPropsValues);
    return injectObject;
};
exports.deepCloneObject = deepCloneObject;
