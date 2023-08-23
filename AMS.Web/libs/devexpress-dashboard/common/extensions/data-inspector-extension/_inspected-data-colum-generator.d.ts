/**
* DevExpress Dashboard (_inspected-data-colum-generator.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ItemDataAxisName, ItemDataMeasure } from '../../../data';
import { itemData } from '../../../data/item-data/_item-data';
export declare function getSortedAxes(itemData: itemData, skipSparklineAxis?: boolean): ItemDataAxisName[];
export declare function getMeasureColumns(itemData: itemData): ItemDataMeasure[];
export declare function getSortedColumns(itemData: itemData): string[];
