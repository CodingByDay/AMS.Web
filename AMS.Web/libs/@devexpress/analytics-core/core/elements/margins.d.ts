﻿/**
* DevExpress Analytics (core\elements\margins.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISerializationInfoArray } from '../../serializer/serializationInfo';
export interface IMargins {
    bottom: ko.Observable<number> | ko.Computed<number>;
    left: ko.Observable<number> | ko.Computed<number>;
    right: ko.Observable<number> | ko.Computed<number>;
    top: ko.Observable<number> | ko.Computed<number>;
}
export declare class Margins implements IMargins {
    static defaultVal: string;
    static unitProperties: string[];
    getInfo(): ISerializationInfoArray;
    constructor(left: any, right: any, top: any, bottom: number);
    isEmpty(): boolean;
    static fromString(value?: string): Margins;
    toString(): string;
    bottom: ko.Observable<number> | ko.Computed<number>;
    left: ko.Observable<number> | ko.Computed<number>;
    right: ko.Observable<number> | ko.Computed<number>;
    top: ko.Observable<number> | ko.Computed<number>;
}
