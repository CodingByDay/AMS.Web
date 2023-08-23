﻿/**
* DevExpress Dashboard (_grid-item-viewer-adapter.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridItemViewerAdapter = void 0;
const ko = require("knockout");
const _data_item_viewer_adapter_1 = require("./_data-item-viewer-adapter");
class GridItemViewerAdapter extends _data_item_viewer_adapter_1.DataItemViewerAdapter {
    attachToModel(viewerItem, dataDashboardItem) {
        super.attachToModel(viewerItem, dataDashboardItem);
        viewerItem.clientStateUpdate.add(dataDashboardItem._processItemClientStateUpdate);
        viewerItem.clientFilterChanged.add(dataDashboardItem._processClientFilterChanged);
        viewerItem.clientFilterStateChanged.add(dataDashboardItem._processClientFilterStateChanged);
        viewerItem.gridWidthOptionsChanged = (state) => {
            if (this.context.isDesignMode()) {
                dataDashboardItem._setColumnWidthOptions(state);
            }
        };
        this.toDispose(ko.computed(() => {
            var gridItemViewer = viewerItem;
            gridItemViewer.resetClientStateOnUpdate = this.context.isDesignMode();
            gridItemViewer.manualyResetClientState = !this.context.isDesignMode();
        }));
    }
    detachFromModel(viewerItem, dataDashboardItem) {
        super.detachFromModel(viewerItem, dataDashboardItem);
        viewerItem.gridWidthOptionsChanged = null;
        viewerItem.clientStateUpdate.remove(dataDashboardItem._processItemClientStateUpdate);
    }
}
exports.GridItemViewerAdapter = GridItemViewerAdapter;
