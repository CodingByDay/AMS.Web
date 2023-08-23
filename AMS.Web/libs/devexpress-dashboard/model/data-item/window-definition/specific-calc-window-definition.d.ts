/**
* DevExpress Dashboard (specific-calc-window-definition.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { DataItemLink } from '../data-item';
import { MeasureCalculationWindowDefinition } from './measure-calc-window-definition';
export declare class SpecificWindowDefinition extends MeasureCalculationWindowDefinition {
    dimensions: ko.ObservableArray<DataItemLink>;
    _dimensionsInfoPatcher: (propertyInfo: IDashboardSerializationInfo) => IDashboardSerializationInfo;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    equals(def: any): boolean;
}
