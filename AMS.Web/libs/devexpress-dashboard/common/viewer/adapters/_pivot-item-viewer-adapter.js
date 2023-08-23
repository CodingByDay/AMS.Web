﻿/**
* DevExpress Dashboard (_pivot-item-viewer-adapter.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PivotItemViewerAdapter = void 0;
const _data_item_viewer_adapter_1 = require("./_data-item-viewer-adapter");
class PivotItemViewerAdapter extends _data_item_viewer_adapter_1.DataItemViewerAdapter {
    constructor() {
        super(...arguments);
        this.expandValueHandler = (_, params) => {
            if (params.isRequestData) {
                this.dashboardItem._processItemExpandingChange({
                    values: params.values,
                    isColumn: params.isColumn
                });
            }
        };
        this.expandStateChangedHandler = (dxPivotState) => {
            var currentState = this.item.getExpandingState(!this.dashboardItem.autoExpandRowGroups(), !this.dashboardItem.autoExpandColumnGroups());
            this.dashboardItem._processExpandingStateChanged(currentState, dxPivotState);
        };
    }
    attachToModel(viewerItem, dataDashboardItem) {
        super.attachToModel(viewerItem, dataDashboardItem);
        viewerItem.expandValue.add(this.expandValueHandler);
        viewerItem.expandStateChanged.add(this.expandStateChangedHandler);
    }
    detachFromModel(viewerItem, dataDashboardItem) {
        viewerItem.expandValue.remove(this.expandValueHandler);
        viewerItem.expandStateChanged.remove(this.expandStateChangedHandler);
        super.detachFromModel(viewerItem, dataDashboardItem);
    }
}
exports.PivotItemViewerAdapter = PivotItemViewerAdapter;
