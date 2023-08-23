﻿/**
* DevExpress Analytics (core\elements\paddingModel.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../serializer/utils';
import { ISerializationInfoArray } from '../../serializer/serializationInfo';
export declare class PaddingModel extends Disposable {
    left: ko.Observable<number> | ko.Computed<number>;
    right: ko.Observable<number> | ko.Computed<number>;
    top: ko.Observable<number> | ko.Computed<number>;
    bottom: ko.Observable<number> | ko.Computed<number>;
    dpi: ko.Observable<number> | ko.Computed<number>;
    static defaultVal: string;
    static unitProperties: string[];
    getInfo(): ISerializationInfoArray;
    resetValue(): void;
    isEmpty(): boolean;
    applyFromString(value: string): this;
    static from(val: any): PaddingModel;
    toString(): string;
    _toString(inner?: boolean): string;
    constructor(left?: ko.Observable<number> | ko.Computed<number>, right?: ko.Observable<number> | ko.Computed<number>, top?: ko.Observable<number> | ko.Computed<number>, bottom?: ko.Observable<number> | ko.Computed<number>, dpi?: ko.Observable<number> | ko.Computed<number>);
    all: ko.Computed<number>;
}
