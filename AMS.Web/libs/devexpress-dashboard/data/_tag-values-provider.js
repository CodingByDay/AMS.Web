﻿/**
* DevExpress Dashboard (_tag-values-provider.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagValuesProvider = void 0;
exports.tagValuesProvider = {
    getTag: function (listSource, tagDataMembers, rowIndex) {
        var values = null;
        if (tagDataMembers === null)
            return values;
        values = [];
        for (var i = 0; i < tagDataMembers.length; i++) {
            values.push(listSource.getRowValue(rowIndex, tagDataMembers[i]));
        }
        return this.getTagByValues(values);
    },
    getTagByValues: function (values) {
        if (!values || values.length === 0)
            return null;
        return values;
    }
};
