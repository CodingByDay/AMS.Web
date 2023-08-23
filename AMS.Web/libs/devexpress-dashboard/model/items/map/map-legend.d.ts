﻿/**
* DevExpress Dashboard (map-legend.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { MapLegendOrientation, MapLegendPosition, WeightedLegendType } from '../../enums';
import { SerializableModel } from '../../serializable-model';
export declare abstract class MapLegendBase extends SerializableModel {
    visible: ko.Observable<boolean>;
    position: ko.Observable<MapLegendPosition>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    abstract getInfo(): ISerializationInfoArray;
}
export declare class WeightedLegend extends MapLegendBase {
    type: ko.Observable<WeightedLegendType>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class MapLegend extends MapLegendBase {
    orientation: ko.Observable<MapLegendOrientation>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
