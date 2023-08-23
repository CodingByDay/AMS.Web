﻿/**
* DevExpress Dashboard (chorolpeth-map-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DataItemLink } from '../../data-item/data-item';
import { Dimension } from '../../data-item/dimension';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { ChoroplethMap, DeltaMap, ValueMap } from './chorolpeth-map';
import { MapItem } from './map-item';
export declare class ChoroplethMapItem extends MapItem {
    static choroplethMapTypesMap: {
        ValueMap: {
            constructor: typeof ValueMap;
            displayName: string;
            icon: string;
        };
        DeltaMap: {
            constructor: typeof DeltaMap;
            displayName: string;
            icon: string;
        };
    };
    private __attributeDimension;
    attributeDimension: ko.Observable<Dimension>;
    maps: ko.ObservableArray<ChoroplethMap>;
    attributeName: ko.Observable<string>;
    tooltipAttributeName: ko.Observable<string>;
    includeSummaryValueToShapeTitle: ko.Observable<boolean>;
    protected _getInteractivityDimensionLinks(): DataItemLink[];
    constructor(modelJson?: any, serializer?: ModelSerializer);
    _clearBindings(): void;
    _createMap(mapJSON: any, serializer?: ModelSerializer): ChoroplethMap;
    protected _getInfoCore(): IDashboardSerializationInfo[];
    protected _getDefaultItemType(): string;
    protected _getLayersCount(): number;
    protected _getLayerName(): string;
    protected _updateContentViewModel(content: any): void;
}
