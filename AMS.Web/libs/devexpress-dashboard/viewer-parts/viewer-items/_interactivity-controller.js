﻿/**
* DevExpress Dashboard (_interactivity-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactivityController = exports.dashboardSelectionMode = void 0;
const class_1 = require("devextreme/core/class");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _utils_1 = require("../../data/_utils");
exports.dashboardSelectionMode = {
    none: 'None',
    single: 'Single',
    multiple: 'Multiple'
};
exports.interactivityController = class_1.default.inherit({
    ctor: function ctor(getTuples) {
        var that = this;
        that._getTuples = getTuples;
        that.selectionChanged = _jquery_helpers_1.createJQueryCallbacks();
    },
    clickAction: function (tuples, isEmpty = false) {
        if (isEmpty) {
            this.selectionChanged.fire(null);
        }
        else if (this.selectionMode !== exports.dashboardSelectionMode.none) {
            var that = this, isMultipleMode = that.selectionMode === exports.dashboardSelectionMode.multiple, currentTuples = isMultipleMode ? that._getTuples().slice() : [], selectedTuples = [], changed = false;
            tuples.forEach(tuple => {
                if (that._allowSelectTuple(tuple)) {
                    var arrayIndex = isMultipleMode ? _utils_1.checkArrayContainsTuple(currentTuples, tuple) : undefined;
                    if (arrayIndex == undefined) {
                        selectedTuples.push(tuple);
                    }
                    else {
                        currentTuples.splice(arrayIndex, 1);
                    }
                    changed = true;
                }
            });
            if (changed) {
                that.selectionChanged.fire(currentTuples.concat(selectedTuples));
            }
        }
    },
    setOptions: function (selectionMode) {
        this.selectionMode = selectionMode;
    },
    _allowSelectTuple: function (tuple) {
        var allowSelect = true;
        tuple.forEach(axisValue => {
            if (!_utils_1.allowSelectValue(axisValue.value)) {
                allowSelect = false;
                return false;
            }
        });
        return allowSelect;
    }
});
