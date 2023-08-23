﻿/**
* DevExpress Dashboard (chart-axis.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DataItemDateTimeFormat, DataItemNumericFormat } from '../../data-item/data-item-format';
import { LogarithmicBase } from '../../enums';
import { SerializableModel } from '../../serializable-model';
export declare class ChartAxis extends SerializableModel {
    reverse: ko.Observable<boolean>;
    visible: ko.Observable<boolean>;
    titleVisible: ko.Observable<boolean>;
    title: ko.Observable<string>;
    numericFormat: DataItemNumericFormat;
    constructor(JSON?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class ChartAxisX extends ChartAxis {
    enableZooming: ko.Observable<boolean>;
    limitVisiblePoints: ko.Observable<boolean>;
    visiblePointsCount: ko.Observable<number>;
    dateTimeFormat: DataItemDateTimeFormat;
    constructor(JSON?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class ChartAxisY extends ChartAxis {
    alwaysShowZeroLevel: ko.Observable<boolean>;
    showGridLines: ko.Observable<boolean>;
    logarithmic: ko.Observable<boolean>;
    logarithmicBase: ko.Observable<LogarithmicBase>;
    constructor(JSON?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class ScatterChartAxisY extends ChartAxisY {
    constructor(JSON?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class ChartSecondaryAxisY extends ChartAxisY {
    constructor(JSON?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
