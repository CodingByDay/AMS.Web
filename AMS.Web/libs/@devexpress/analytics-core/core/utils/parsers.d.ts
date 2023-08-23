﻿/**
* DevExpress Analytics (core\utils\parsers.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export declare function floatFromModel(val: string): ko.Observable<number>;
export declare function fromEnum(value: string): ko.Observable<string>;
export declare function parseBool(val: any): ko.Observable<any>;
export declare function colorFromString(val: string): ko.Observable<string>;
export declare function saveAsInt(val: number): string;
export declare function colorToInt(color: string): number;
export declare function intToColor(color: number, hasAlpha?: boolean): string;
export declare function colorToString(val: string): string;
