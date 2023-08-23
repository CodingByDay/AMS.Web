﻿/**
* DevExpress Dashboard (running-total-calculation.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { SummaryType } from '../../enums';
import { MeasureCalculation } from './measure-calculation';
export declare class RunningTotalCalculation extends MeasureCalculation {
    summaryType: ko.Observable<SummaryType>;
    get name(): string;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    _createInstance(): RunningTotalCalculation;
    _getExpression(argument: string): string;
}
