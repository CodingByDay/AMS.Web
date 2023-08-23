﻿/**
* DevExpress Dashboard (card-layout-template-element.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { CardRowDataElementType } from '../../enums';
import { SerializableModel } from '../../serializable-model';
export declare abstract class CardLayoutTemplateElementBase extends SerializableModel {
    visible: ko.Observable<boolean>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    abstract _getTitle(dimensionNames?: string[]): ko.Computed<string>;
    _createEditorModel(dimensionNames?: string[]): {
        title: ko.Computed<string>;
        checked: ko.Observable<boolean>;
    };
    getInfo(): ISerializationInfoArray;
    _initDefault(visible?: boolean, valueType?: CardRowDataElementType, dimenstionIndex?: number): void;
}
export declare class CardLayoutTemplateDeltaElement extends CardLayoutTemplateElementBase {
    constructor(modelJson?: any, serializer?: ModelSerializer);
    _getTitle(): ko.Computed<string>;
}
export declare class CardLayoutTemplateSparklineElement extends CardLayoutTemplateElementBase {
    constructor(modelJson?: any, serializer?: ModelSerializer);
    _getTitle(): ko.Computed<string>;
}
export declare class CardLayoutTemplateDataElement extends CardLayoutTemplateElementBase {
    valueType: ko.Observable<CardRowDataElementType>;
    dimensionIndex: ko.Observable<number>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    _getTitle(dimensionNames: string[]): ko.Computed<any>;
    getInfo(): ISerializationInfoArray;
    _initDefault(visible: boolean, valueType: CardRowDataElementType, dimenstionIndex?: number): void;
    _getEditorProperty(valueType: CardRowDataElementType, dimensionIndex?: number, dimensionNames?: string[]): {
        value: CardRowDataElementType;
        displayText: any;
        dimensionIndex: number;
        key: string;
    };
    _createEditorModel(dimensionNames: string[]): {
        lookupDataSource: {
            value: CardRowDataElementType;
            displayText: any;
            dimensionIndex: number;
            key: string;
        }[];
        selectedItem: ko.PureComputed<any>;
        title: ko.Computed<string>;
        checked: ko.Observable<boolean>;
    };
}
