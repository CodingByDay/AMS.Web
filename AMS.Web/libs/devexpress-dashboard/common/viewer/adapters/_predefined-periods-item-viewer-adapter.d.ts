﻿/**
* DevExpress Dashboard (_predefined-periods-item-viewer-adapter.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DateFilterItem } from '../../../model';
import { RangeFilterItem } from '../../../model/items/range-filter/range-filter-item';
import { dateFilterElement } from '../../../viewer-parts/viewer-items/filter-items/_date-filter-element';
import { rangeSelectorItem } from '../../../viewer-parts/viewer-items/range-selector-item/_range-selector-item';
import { DataItemViewerAdapter } from './_data-item-viewer-adapter';
export declare type PredefinedPeriodsItem = RangeFilterItem | DateFilterItem;
export declare type PredefinedPeriodsViewer = rangeSelectorItem | dateFilterElement;
export declare class PredefinedPeriodsItemViewerAdapter extends DataItemViewerAdapter<PredefinedPeriodsViewer, PredefinedPeriodsItem> {
    protected attachToModel(viewerItem: PredefinedPeriodsViewer, rangeFilterItem: PredefinedPeriodsItem): void;
    protected detachFromModel(viewerItem: PredefinedPeriodsViewer, rangeFilterItem: PredefinedPeriodsItem): void;
}
