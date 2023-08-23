﻿/**
* DevExpress Dashboard (rank-calculation.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { RankOrder, RankType } from '../../enums';
import { MeasureCalculation } from './measure-calculation';
export declare class RankCalculation extends MeasureCalculation {
    private static _getRankFunction;
    rankType: ko.Observable<RankType>;
    rankOrder: ko.Observable<RankOrder>;
    get name(): string;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    _createInstance(): RankCalculation;
    _getExpression(argument: string): string;
}
