﻿/**
* DevExpress Analytics (core\elements\size.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { sizeFake } from '../_metadata';
export class Size {
    constructor(width, height) {
        this.isPropertyDisabled = (name) => void 0;
        this.height = ko.observable(height).extend({ 'dxdnum': { min: 2 } });
        this.width = ko.observable(width).extend({ 'dxdnum': { min: 2 } });
    }
    getInfo() {
        return sizeFake;
    }
    static fromString(value = '0, 0') {
        var components = value.split(',');
        return new Size(parseFloat(components[0]), parseFloat(components[1]));
    }
    toString() {
        return this.width() + ', ' + this.height();
    }
}
Size.unitProperties = ['width', 'height'];
