﻿/**
* DevExpress Dashboard (card-row.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { TypedSerializableModel } from '../../serializable-model';
import { SparklineOptions } from '../options/sparkline-options';
import { CardRowDataElement, CardRowElement, CardRowIndicatorElement, CardRowTextElement } from './card-row-element';
export declare abstract class CardRowBase extends TypedSerializableModel {
    vAlignment: ko.Observable<string>;
    indent: ko.Observable<number>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class CardRow extends CardRowBase {
    static elementItemTypes: {
        CardRowDataElement: {
            constructor: typeof CardRowDataElement;
        };
        CardRowIndicatorElement: {
            constructor: typeof CardRowIndicatorElement;
        };
        CardRowTextElement: {
            constructor: typeof CardRowTextElement;
        };
    };
    elements: ko.ObservableArray<CardRowElement>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    createRowElement(elementJSON: any, serializer: ModelSerializer): CardRowDataElement;
    getInfo(): ISerializationInfoArray;
    protected _getDefaultItemType(): string;
}
export declare class CardSparklineRow extends CardRowBase {
    height: ko.Observable<number>;
    sparklineOptions: SparklineOptions;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    protected _getDefaultItemType(): string;
}
