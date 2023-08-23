﻿/**
* DevExpress Dashboard (difference-calculation.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DifferenceTarget, DifferenceType } from '../../enums';
import { MeasureCalculation } from './measure-calculation';
export declare class DifferenceCalculation extends MeasureCalculation {
    private static getLookupShiftExpression;
    target: ko.Observable<DifferenceTarget>;
    differenceType: ko.Observable<DifferenceType>;
    get name(): string;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    get lookupShiftExpression(): string;
    getInfo(): ISerializationInfoArray;
    _createInstance(): DifferenceCalculation;
    _getExpression(argument: string): string;
}
