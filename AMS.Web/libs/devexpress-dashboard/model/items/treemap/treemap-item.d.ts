﻿/**
* DevExpress Dashboard (treemap-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ColorSchemeEntry } from '../../colorization/color-scheme-entry';
import { DataItemLink } from '../../data-item/data-item';
import { Dimension } from '../../data-item/dimension';
import { Measure } from '../../data-item/measure';
import { DashboardTreemapLayoutAlgorithm, DashboardTreemapLayoutDirection, TreemapValueType } from '../../enums';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { DataDashboardItem } from '../data-dashboard-item';
import { DashboardItemColoringOptions } from '../options/coloring-options';
import { DashboardItemInteractivityOptions } from '../options/interactivity-options';
export declare class TreemapItem extends DataDashboardItem {
    private __values;
    values: ko.ObservableArray<Measure>;
    private __arguments;
    arguments: ko.ObservableArray<Dimension>;
    layoutAlgorithm: ko.Observable<DashboardTreemapLayoutAlgorithm>;
    layoutDirection: ko.Observable<DashboardTreemapLayoutDirection>;
    tilesLabelContentType: ko.Observable<TreemapValueType>;
    tilesTooltipContentType: ko.Observable<TreemapValueType>;
    groupsLabelContentType: ko.Observable<TreemapValueType>;
    groupsTooltipContentType: ko.Observable<TreemapValueType>;
    interactivityOptions: DashboardItemInteractivityOptions;
    colorScheme: ko.ObservableArray<ColorSchemeEntry>;
    coloringOptions: DashboardItemColoringOptions;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfo[];
    _clearBindings(): void;
    _isCalculationSupported(): boolean;
    protected _getDefaultItemType(): string;
    protected _getCanColorByMeasures(): boolean;
    protected _getCanColorByDimensions(): boolean;
    protected _getAreMeasuresColoredByDefault(): boolean;
    protected _getIsDimensionColoredByDefault(dimension: Dimension): boolean;
    protected _getMasterFilterMode(): string;
    protected _getDrillDownEnabled(): boolean;
    protected _getIgnoreMasterFilter(): boolean;
    protected _getInteractivityDimensionLinks(): DataItemLink[];
    protected _getLayersCount(): number;
    protected _getLayerName(): string;
    _getColorizableDataItemsInfo(): Array<{
        items: Array<DataItemLink>;
        prefixId: string;
    }>;
    _isSortingEnabled(): boolean;
}
