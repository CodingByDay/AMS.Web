﻿/**
* DevExpress Dashboard (geo-point-map-item-base.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { PrimitiveType } from '../../../data/types';
import { DataItemLink } from '../../data-item/data-item';
import { Dimension } from '../../data-item/dimension';
import { DimensionFilterValues } from '../../data-item/_dimension-filter-values';
import { KnockoutEntry } from '../../internal/_knockout-utils';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { MapItem } from './map-item';
export declare abstract class GeoPointMapItemBase extends MapItem {
    get _actualSelectionValues(): KnockoutEntry<Array<Array<any>>>;
    private __latitude;
    private __longitude;
    latitude: ko.Observable<Dimension>;
    longitude: ko.Observable<Dimension>;
    private __tooltipDimensions;
    tooltipDimensions: ko.ObservableArray<Dimension>;
    enableClustering: ko.Observable<boolean>;
    private _selectedClusters;
    _clustersContent: ko.Observable<{
        Cluster: {
            Latitude: number;
            Longitude: number;
        };
        Points: Array<Array<PrimitiveType>>;
    }[]>;
    _processDataRequest: () => void;
    _actualSelectedValues: ko.Computed<PrimitiveType[][]>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    _clearBindings(): void;
    protected _getInfoCore(): IDashboardSerializationInfo[];
    protected _getInteractivityDimensionLinks(): DataItemLink[];
    _getExportingSelection(): any[];
    _getDisplayFilterValues(limitCount?: number): Array<DimensionFilterValues>;
    protected _getSliceDimensions(): Array<DataItemLink>;
    protected _updateContentViewModel(content: any): void;
    _setSelectionData(selection: Array<Array<number>>): void;
    _isTopNEnabled(dataItem: Dimension): boolean;
}
