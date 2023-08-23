﻿/**
* DevExpress Dashboard (_choropleth-map-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Properties as dxVectorMapOptions } from 'devextreme/viz/vector_map';
import { dataControllerBase } from '../../data/data-controllers/_data-controller-base';
import { ItemDataDeltaValue, ItemDataMeasureValue } from '../../data/item-data/item-data-definitions';
import { itemDataTupleValues } from '../../data/item-data/_item-data-tuple';
import { DeltaValueType } from '../../model/enums';
import { DataPoint } from './_base-item';
import { mapItem } from './_map-item';
export interface MapDeltaColorizerViewModel {
    AttributeName: string;
    ActualValueName: string;
    TargetValueName: string;
    DeltaValueName: string;
    ActualValueId: string;
    TargetValueId: string;
    DeltaValueId: string;
    DeltaValueType: DeltaValueType;
}
export declare class choroplethMapItem extends mapItem {
    private _dataController;
    protected get dataController(): dataControllerBase;
    protected set dataController(dataController: dataControllerBase);
    constructor(container: HTMLElement, options: any);
    selectTuple(tuple: itemDataTupleValues, state: any): void;
    protected _setSelectionUnsafe(values: any): void;
    protected updateContentStateUnsafe(): void;
    protected renderContentUnsafe(element: HTMLElement, changeExisting: boolean, afterRenderCallback?: any): boolean;
    _getChoroplethMapViewerOptions(): dxVectorMapOptions;
    _getColorLegend(legendViewModel: any, measureDescriptor: any): any;
    _fillMeasureToolTip(mapDataSourceItem: any, attribute: any, tooltipMeasures: any): void;
    _fillValueMapDataSourceAttrs(mapDataSource: any, choroplethColorizer: any, tooltipMeasures: any, mapItems: any): void;
    _fillDeltaMapDataSourceAttrs(mapDataSource: any, choroplethColorizer: MapDeltaColorizerViewModel, tooltipMeasures: any, mapItems: any): void;
    _correctAttributesTitle(attributes: any, displayText: any): void;
    _getDeltaValue(deltaValue: ItemDataDeltaValue, deltaValueType: DeltaValueType): ItemDataMeasureValue;
    _findAttributeValueByName(attributes: any, attributeName: any): any;
    _getRangeStops(choroplethColorizer: any): any[];
    _convertIndicatorType(type: any): string;
    _getDeltaColorValue(indicatorType: any, isGood: any): -1 | 0.5 | 2.5 | 1.5;
    _getArea(viewModel: any, colors: any, rangeStops: any): {
        colorGroupingField: string;
        colorGroups: any;
        palette: any;
        customize: (items: any) => void;
        selectionMode: string;
        label: {
            enabled: any;
            dataField: string;
        };
    };
    _getDataPoint(element: any): DataPoint;
    _getElementInteractionValue(element: any, viewModel?: any): any[];
}
