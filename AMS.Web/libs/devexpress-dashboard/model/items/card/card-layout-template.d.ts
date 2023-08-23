﻿/**
* DevExpress Dashboard (card-layout-template.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { SerializableModel } from '../../serializable-model';
import { CardLayout } from './card-layout';
import { CardLayoutTemplateDataElement, CardLayoutTemplateDeltaElement, CardLayoutTemplateSparklineElement } from './card-layout-template-element';
export declare type CardLayoutTemplateType = 'Stretched' | 'Centered' | 'Lightweight' | 'Compact' | 'Custom' | 'None';
export declare abstract class CardLayoutTemplate extends SerializableModel {
    title: string;
    minWidth: ko.Observable<number>;
    maxWidth: ko.Observable<number>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    abstract _collectProperties(dimensionNames: string[]): Array<any>;
    abstract getType(): string;
    abstract _createInstance(): CardLayoutTemplate;
    getInfo(): ISerializationInfoArray;
    _resetToDefaults(): void;
    clone(): CardLayoutTemplate;
    private _clone;
}
export declare class CardEmptyLayoutTemplate extends CardLayoutTemplate {
    isEmpty: ko.Observable<boolean>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    _collectProperties(dimensionNames: string[]): any[];
    getType(): CardLayoutTemplateType;
    getInfo(): any[];
    _createInstance(): CardLayoutTemplate;
}
export declare class CardCustomLayoutTemplate extends CardLayoutTemplate {
    layout: CardLayout;
    type: ko.Observable<string>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    _collectProperties(dimensionNames: string[]): Array<any>;
    _resetToDefaults(): void;
    getType(): string;
    _createInstance(): CardLayoutTemplate;
}
export declare class CardCenteredLayoutTemplate extends CardLayoutTemplate {
    mainValue: CardLayoutTemplateDataElement;
    subValue: CardLayoutTemplateDataElement;
    bottomValue: CardLayoutTemplateDataElement;
    bottomSubValue1: CardLayoutTemplateDataElement;
    bottomSubValue2: CardLayoutTemplateDataElement;
    deltaIndicator: CardLayoutTemplateDeltaElement;
    sparkline: CardLayoutTemplateSparklineElement;
    type: ko.Observable<string>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    _collectProperties(dimensionNames: string[]): Array<any>;
    _resetToDefaults(): void;
    getType(): string;
    _createInstance(): CardLayoutTemplate;
}
export declare class CardStretchedLayoutTemplate extends CardLayoutTemplate {
    topValue: CardLayoutTemplateDataElement;
    mainValue: CardLayoutTemplateDataElement;
    subValue: CardLayoutTemplateDataElement;
    bottomValue1: CardLayoutTemplateDataElement;
    bottomValue2: CardLayoutTemplateDataElement;
    deltaIndicator: CardLayoutTemplateDeltaElement;
    sparkline: CardLayoutTemplateSparklineElement;
    type: ko.Observable<string>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    _collectProperties(dimensionNames: string[]): Array<any>;
    _resetToDefaults(): void;
    getType(): string;
    _createInstance(): CardLayoutTemplate;
}
export declare class CardLightweightLayoutTemplate extends CardLayoutTemplate {
    mainValue: CardLayoutTemplateDataElement;
    subValue: CardLayoutTemplateDataElement;
    bottomValue: CardLayoutTemplateDataElement;
    deltaIndicator: CardLayoutTemplateDeltaElement;
    sparkline: CardLayoutTemplateSparklineElement;
    type: ko.Observable<string>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    _collectProperties(dimensionNames: string[]): Array<any>;
    _resetToDefaults(): void;
    getType(): string;
    _createInstance(): CardLayoutTemplate;
}
export declare class CardCompactLayoutTemplate extends CardLayoutTemplate {
    mainValue: CardLayoutTemplateDataElement;
    subValue: CardLayoutTemplateDataElement;
    bottomValue: CardLayoutTemplateDataElement;
    bottomSubValue1: CardLayoutTemplateDataElement;
    bottomSubValue2: CardLayoutTemplateDataElement;
    deltaIndicator: CardLayoutTemplateDeltaElement;
    sparkline: CardLayoutTemplateSparklineElement;
    type: ko.Observable<string>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    _collectProperties(dimensionNames: string[]): Array<any>;
    _resetToDefaults(): void;
    getType(): string;
    _createInstance(): CardLayoutTemplate;
}
