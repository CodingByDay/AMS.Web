﻿/**
* DevExpress Dashboard (measure-calc-window-definition.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { SerializableModel } from '../../serializable-model';
export declare abstract class MeasureCalculationWindowDefinition extends SerializableModel {
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    abstract equals(def: any): boolean;
}
export declare let windowDefinitionsTypesMap: {
    [index: string]: typeof MeasureCalculationWindowDefinition;
};
