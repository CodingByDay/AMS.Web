﻿/**
* DevExpress Analytics (core\elements\margins.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { paddingSerializationsInfo } from './paddingModelMetaData';
export class Margins {
    constructor(left, right, top, bottom) {
        this.bottom = ko.observable(bottom);
        this.left = ko.observable(left);
        this.right = ko.observable(right);
        this.top = ko.observable(top);
    }
    getInfo() {
        return paddingSerializationsInfo;
    }
    isEmpty() {
        return this.toString() === Margins.defaultVal;
    }
    static fromString(value = Margins.defaultVal) {
        var components = value.split(',');
        return new Margins(parseFloat(components[0]), parseFloat(components[1]), parseFloat(components[2]), parseFloat(components[3]));
    }
    toString() {
        var result = this.left() + ', ' + this.right() + ', ' + this.top() + ', ' + this.bottom();
        return result;
    }
}
Margins.defaultVal = '100, 100, 100, 100';
Margins.unitProperties = ['left', 'right'];
