/**
* DevExpress Dashboard (_predefined-periods-item-viewer-adapter.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredefinedPeriodsItemViewerAdapter = void 0;
const _data_item_viewer_adapter_1 = require("./_data-item-viewer-adapter");
class PredefinedPeriodsItemViewerAdapter extends _data_item_viewer_adapter_1.DataItemViewerAdapter {
    attachToModel(viewerItem, rangeFilterItem) {
        super.attachToModel(viewerItem, rangeFilterItem);
        if (rangeFilterItem.currentSelectedDateTimePeriodName())
            rangeFilterItem._processItemSetPredefinedPeriod(rangeFilterItem.currentSelectedDateTimePeriodName());
        this.toDispose(rangeFilterItem.currentSelectedDateTimePeriodName.subscribe(newValue => {
            viewerItem._setPredefinedRange(newValue);
        }));
        viewerItem.predefinedRangeChanged = (newRange) => {
            rangeFilterItem._processItemSetPredefinedPeriod(newRange);
        };
    }
    detachFromModel(viewerItem, rangeFilterItem) {
        super.detachFromModel(viewerItem, rangeFilterItem);
        viewerItem.predefinedRangeChanged = () => { };
    }
}
exports.PredefinedPeriodsItemViewerAdapter = PredefinedPeriodsItemViewerAdapter;
