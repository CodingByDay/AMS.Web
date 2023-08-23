﻿/**
* DevExpress Dashboard (calculation.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { SerializableModel } from '../../serializable-model';
import { MeasureCalculation } from './measure-calculation';
export declare let _currentCalculationInfo: (model: {
    calculationType: ko.Observable<string>;
}) => Array<IDashboardSerializationInfo>;
export declare class Calculation extends SerializableModel {
    calculationType: ko.Observable<string>;
    calculation: ko.Observable<MeasureCalculation>;
    constructor(modelJson?: {}, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    isEmpty(): boolean;
}
