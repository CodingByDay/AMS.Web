﻿/**
* DevExpress Dashboard (card-row-element.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { TypedSerializableModel } from '../../serializable-model';
export declare abstract class CardRowElement extends TypedSerializableModel {
    hAlignment: ko.Observable<string>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare abstract class CardRowTextElementBase extends CardRowElement {
    color: ko.Observable<number>;
    predefinedForeColor: ko.Observable<string>;
    fontFamily: ko.Observable<string>;
    fontSize: ko.Observable<number>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class CardRowDataElement extends CardRowTextElementBase {
    valueType: ko.Observable<string>;
    dimensionIndex: ko.Observable<number>;
    title: ko.Computed<string>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    protected _getDefaultItemType(): string;
}
export declare class CardRowTextElement extends CardRowTextElementBase {
    text: ko.Observable<string>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    protected _getDefaultItemType(): string;
}
export declare class CardRowIndicatorElement extends CardRowElement {
    size: ko.Observable<number>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    protected _getDefaultItemType(): string;
}
