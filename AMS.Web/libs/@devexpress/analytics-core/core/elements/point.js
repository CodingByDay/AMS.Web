﻿/**
* DevExpress Analytics (core\elements\point.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { locationFake } from '../_metadata';
export class Point {
    constructor(x, y) {
        this.x = ko.observable(x).extend({ 'dxdnum': {} });
        this.y = ko.observable(y).extend({ 'dxdnum': {} });
    }
    getInfo() {
        return locationFake;
    }
    static fromString(value = '0, 0') {
        var components = value.split(',');
        return new Point(parseFloat(components[0]), parseFloat(components[1]));
    }
    toString() {
        return this.x() + ', ' + this.y();
    }
}
Point.unitProperties = ['x', 'y'];
