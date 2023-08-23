﻿/**
* DevExpress Dashboard (_map-item-viewer-adapter.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapItemViewerAdapter = void 0;
const _geo_point_map_item_base_1 = require("../../../viewer-parts/viewer-items/_geo-point-map-item-base");
const _data_item_viewer_adapter_1 = require("./_data-item-viewer-adapter");
class MapItemViewerAdapter extends _data_item_viewer_adapter_1.DataItemViewerAdapter {
    updateItemContent(content) {
        this.item.isViewportLocked = this.dashboardItem.lockNavigation();
        super.updateItemContent(content);
        if (this.dashboardItem._clientState()) {
            this.item.updateClientState(this.dashboardItem._clientState());
        }
    }
    createDashboardViewerItem(element, content, dashboardItem) {
        var viewerItem = super.createDashboardViewerItem(element, content, dashboardItem);
        viewerItem.isInitialExtentChanged = dashboardItem._initialExtentChanged();
        if (dashboardItem._clientState()) {
            viewerItem.updateClientState(this.dashboardItem._clientState());
        }
        viewerItem.initialDataRequest();
        if (viewerItem instanceof _geo_point_map_item_base_1.geoPointMapItemBase) {
            viewerItem.forceUpdateClientState();
        }
        return viewerItem;
    }
    attachToModel(viewerItem, dataDashboardItem) {
        super.attachToModel(viewerItem, dataDashboardItem);
        viewerItem.clientStateUpdate.add(dataDashboardItem._processItemClientStateUpdate);
        viewerItem.dataRequest.add(dataDashboardItem._processDataRequest);
        this.modelSubscriptions.push(dataDashboardItem._initialExtentChanged.subscribe(newValue => {
            viewerItem.isInitialExtentChanged = newValue;
            if (!viewerItem.isInitialExtentChanged) {
                if (this._isDesignMode) {
                    let fullViewport = viewerItem.options.FullViewport;
                    viewerItem.onInitialExtent(fullViewport);
                    dataDashboardItem.viewport._set(fullViewport, true);
                }
                else {
                    viewerItem.onInitialExtent();
                }
            }
            viewerItem.updateCaptionToolbar();
        }));
        viewerItem.viewportChangedCallback = (viewport) => {
            if (this._isDesignMode) {
                dataDashboardItem.viewport._set(viewport, false);
            }
        };
        viewerItem.initialExtentChanged = (changed) => {
            dataDashboardItem._initialExtentChanged(changed);
        };
    }
    detachFromModel(viewerItem, dataDashboardItem) {
        super.detachFromModel(viewerItem, dataDashboardItem);
        viewerItem.viewportChangedCallback = null;
        viewerItem.initialExtentChanged = null;
        viewerItem.clientStateUpdate.remove(dataDashboardItem._processItemClientStateUpdate);
        viewerItem.dataRequest.remove(dataDashboardItem._processDataRequest);
    }
    resume() {
        super.resume();
        this.item.initialDataRequest();
    }
}
exports.MapItemViewerAdapter = MapItemViewerAdapter;
