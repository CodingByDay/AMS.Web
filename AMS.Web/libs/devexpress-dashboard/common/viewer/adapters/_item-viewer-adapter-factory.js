﻿/**
* DevExpress Dashboard (_item-viewer-adapter-factory.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewerItemAdaptersManager = void 0;
const disposable_object_1 = require("../../../model/disposable-object");
const dashboard_item_1 = require("../../../model/items/dashboard-item");
const data_dashboard_item_1 = require("../../../model/items/data-dashboard-item");
const date_filter_item_1 = require("../../../model/items/filter-items/date-filter-item");
const grid_item_1 = require("../../../model/items/grid/grid-item");
const map_item_1 = require("../../../model/items/map/map-item");
const pivot_item_1 = require("../../../model/items/pivot/pivot-item");
const range_filter_item_1 = require("../../../model/items/range-filter/range-filter-item");
const _data_item_viewer_adapter_1 = require("./_data-item-viewer-adapter");
const _grid_item_viewer_adapter_1 = require("./_grid-item-viewer-adapter");
const _item_viewer_adapter_base_1 = require("./_item-viewer-adapter-base");
const _map_item_viewer_adapter_1 = require("./_map-item-viewer-adapter");
const _pivot_item_viewer_adapter_1 = require("./_pivot-item-viewer-adapter");
const _predefined_periods_item_viewer_adapter_1 = require("./_predefined-periods-item-viewer-adapter");
class ViewerItemAdapterRecordElement {
    constructor(adapter, visualMode) {
        if (adapter)
            this.setAdapter(adapter, visualMode);
    }
    setAdapter(adapter, visualMode) {
        if (this.storage && (this.storage instanceof _item_viewer_adapter_base_1.ItemViewerAdapterBase || visualMode === 'full'))
            throw new Error('Try to replace a primary dashboard item with the new one');
        if (!visualMode || visualMode === 'full') {
            this.storage = adapter;
        }
        else {
            if (!this.storage)
                this.storage = {};
            if (visualMode === 'caption') {
                this.storage.captionItem = adapter;
            }
            else {
                this.storage.contentItem = adapter;
            }
        }
    }
    suspend() {
        this.processMapRecordElement((adapter) => adapter.suspend());
    }
    resume() {
        this.processMapRecordElement((adapter) => adapter.resume());
    }
    dispose() {
        this.processMapRecordElement((adapter) => adapter.dispose());
        this.storage = null;
    }
    processMapRecordElement(handler) {
        if (!this.storage)
            return;
        if (this.storage instanceof _item_viewer_adapter_base_1.ItemViewerAdapterBase) {
            handler(this.storage);
        }
        else {
            this.storage.captionItem && handler(this.storage.captionItem);
            this.storage.contentItem && handler(this.storage.contentItem);
        }
    }
}
class ViewerItemAdaptersManager extends disposable_object_1.DisposableObject {
    constructor() {
        super(...arguments);
        this.viewerItemAdaptersMap = {};
        this.modelSubscriberDict = [
            { type: range_filter_item_1.RangeFilterItem, ctor: _predefined_periods_item_viewer_adapter_1.PredefinedPeriodsItemViewerAdapter },
            { type: date_filter_item_1.DateFilterItem, ctor: _predefined_periods_item_viewer_adapter_1.PredefinedPeriodsItemViewerAdapter },
            { type: grid_item_1.GridItem, ctor: _grid_item_viewer_adapter_1.GridItemViewerAdapter },
            { type: pivot_item_1.PivotItem, ctor: _pivot_item_viewer_adapter_1.PivotItemViewerAdapter },
            { type: map_item_1.MapItem, ctor: _map_item_viewer_adapter_1.MapItemViewerAdapter },
            { type: data_dashboard_item_1.DataDashboardItem, ctor: _data_item_viewer_adapter_1.DataItemViewerAdapter },
            { type: dashboard_item_1.DashboardItem, ctor: _item_viewer_adapter_base_1.ItemViewerAdapterBase }
        ];
        this.createAdapterCore = (dashboardItem, element, context, localContext, beforeRender = (item) => { }) => {
            var modelSubscriberCtor = null;
            for (var i = 0; i < this.modelSubscriberDict.length; i++) {
                if (dashboardItem instanceof this.modelSubscriberDict[i].type) {
                    modelSubscriberCtor = this.modelSubscriberDict[i].ctor;
                    break;
                }
            }
            if (!modelSubscriberCtor) {
                modelSubscriberCtor = this.modelSubscriberDict[this.modelSubscriberDict.length - 1].ctor;
            }
            return (new modelSubscriberCtor(dashboardItem, element, context, localContext, beforeRender, () => this.releaseAdapter(dashboardItem, localContext && localContext.itemCreatingType === 'secondary')));
        };
    }
    releaseAdapter(dashboardItem, isSecondaryAdapter) {
        if (!dashboardItem || !dashboardItem.componentName())
            return;
        let mapRecord = this.viewerItemAdaptersMap[dashboardItem.componentName()];
        if (mapRecord && isSecondaryAdapter) {
            if (mapRecord.secondary) {
                mapRecord.secondary = null;
                mapRecord.primary && mapRecord.primary.resume();
            }
        }
        else {
            delete this.viewerItemAdaptersMap[dashboardItem.componentName()];
        }
    }
    create(dashboardItem, element, context, localContext, beforeRender = (item) => { }) {
        let itemComponentName = dashboardItem.componentName();
        this.viewerItemAdaptersMap[itemComponentName] = this.viewerItemAdaptersMap[itemComponentName] || {};
        let visualMode = localContext && localContext.visualMode && localContext.visualMode() || 'full';
        let newAdapter = this.createAdapterCore(dashboardItem, element, context, localContext, beforeRender);
        let mapRecord = this.viewerItemAdaptersMap[itemComponentName];
        if (localContext && localContext.itemCreatingType === 'secondary') {
            if (visualMode !== 'full')
                throw new Error('Try to create a secondary dashboard item with non-full visual mode');
            mapRecord.primary && mapRecord.primary.suspend();
            mapRecord.secondary = new ViewerItemAdapterRecordElement(newAdapter, visualMode);
        }
        else {
            if (!mapRecord.primary)
                mapRecord.primary = new ViewerItemAdapterRecordElement(newAdapter, visualMode);
            else
                mapRecord.primary.setAdapter(newAdapter, visualMode);
        }
        return newAdapter;
    }
    dispose() {
        Object.keys(this.viewerItemAdaptersMap).forEach(componentName => {
            let mapRecord = this.viewerItemAdaptersMap[componentName];
            if (mapRecord) {
                mapRecord.primary && mapRecord.primary.dispose();
                mapRecord.secondary && mapRecord.secondary.dispose();
            }
            delete this.viewerItemAdaptersMap[componentName];
        });
        super.dispose();
    }
}
exports.ViewerItemAdaptersManager = ViewerItemAdaptersManager;
