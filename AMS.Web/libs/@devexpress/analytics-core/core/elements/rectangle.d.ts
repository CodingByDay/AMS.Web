﻿/**
* DevExpress Analytics (core\elements\rectangle.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export declare class Rectangle {
    constructor(left?: number, top?: number, width?: number, height?: number);
    left: ko.Observable<number>;
    top: ko.Observable<number>;
    width: ko.Observable<number>;
    height: ko.Observable<number>;
    className: string;
}
