﻿/**
* DevExpress Dashboard (chart-legend.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ChartLegendInsidePosition, ChartLegendOutsidePosition } from '../../enums';
import { SerializableModel } from '../../serializable-model';
export declare class ChartLegend extends SerializableModel {
    outsidePosition: ko.Observable<ChartLegendOutsidePosition>;
    insidePosition: ko.Observable<ChartLegendInsidePosition>;
    isInsideDiagram: ko.Observable<boolean>;
    visible: ko.Observable<boolean>;
    constructor(JSON?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
