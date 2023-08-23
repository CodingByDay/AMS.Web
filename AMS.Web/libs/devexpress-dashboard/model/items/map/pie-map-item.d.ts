﻿/**
* DevExpress Dashboard (pie-map-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DataItemLink } from '../../data-item/data-item';
import { Dimension } from '../../data-item/dimension';
import { Measure } from '../../data-item/measure';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { GeoPointMapItemBase } from './geo-point-map-item-base';
import { MapLegend, WeightedLegend } from './map-legend';
export declare class PieMapItem extends GeoPointMapItemBase {
    private __argument;
    argument: ko.Observable<Dimension>;
    private __values;
    values: ko.ObservableArray<Measure>;
    isWeighted: ko.Observable<boolean>;
    legend: MapLegend;
    weightedLegend: WeightedLegend;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    _clearBindings(): void;
    protected _getInfoCore(): IDashboardSerializationInfo[];
    protected _getDefaultItemType(): string;
    protected _getLayersCount(): number;
    protected _getLayerName(): string;
    protected _getSliceDimensions(): Array<DataItemLink>;
    protected _getIsDimensionColoredByDefault(dimension: Dimension): boolean;
    protected _getAreMeasuresColoredByDefault(): boolean;
    protected _getCanColorByMeasures(): boolean;
    protected _getCanColorByDimensions(): boolean;
    _getColorizableDataItemsInfo(): Array<{
        items: Array<DataItemLink>;
        prefixId: string;
    }>;
}
