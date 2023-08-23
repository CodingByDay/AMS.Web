﻿/**
* DevExpress Dashboard (_aggregated-data-source.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ItemDataDimension, ItemDataMeasure } from '../../../data';
import { itemData } from '../../../data/item-data/_item-data';
import { GridDataSourceInfo } from './_data-inspector-view-model';
export interface AggregatedDataSourceArgs {
    addSparklineTotal: boolean;
    sparklineMeasures: string[];
}
export declare function generateAggregatedSource(itemData: itemData, args: AggregatedDataSourceArgs): GridDataSourceInfo;
export declare function dataInspectorItemDataDimensionComparer(x: ItemDataDimension, y: ItemDataDimension, data: itemData): boolean;
export declare function dataInspectorItemDataMeasureComparer(x: ItemDataMeasure, y: ItemDataMeasure, data: itemData, addSparklineTotal: boolean, sparklineMeasures: string[]): boolean;
