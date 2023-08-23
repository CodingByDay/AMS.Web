﻿/**
* DevExpress Dashboard (_item-viewer-adapter-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemViewerAdapterBase = void 0;
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const disposable_object_1 = require("../../../model/disposable-object");
const _date_utils_1 = require("../../../model/internal/_date-utils");
const custom_item_1 = require("../../../model/items/custom-item/custom-item");
const _base_item_1 = require("../../../viewer-parts/viewer-items/_base-item");
const _viewer_item_factory_1 = require("../../../viewer-parts/_viewer-item-factory");
const custom_viewer_item_1 = require("../../custom-viewer-item/custom-viewer-item");
class ItemViewerAdapterBase extends disposable_object_1.DisposableObject {
    constructor(dashboardItem, element, context, localContext, beforeRender = (item) => { }, onDisposed = () => { }) {
        super();
        this.dashboardItem = dashboardItem;
        this.element = element;
        this.context = context;
        this.localContext = localContext;
        this.beforeRender = beforeRender;
        this.onDisposed = onDisposed;
        this.modelSubscriptions = [];
        this.itemUpdated = (item) => { };
        this.updateServerContentHandler = (newContent) => {
            if (newContent) {
                this.ensureViewerItem(!this.item, newContent);
                this.item.hideLoadingPanel();
            }
            else if (!!this.item) {
                this.item.showLoadingPanel();
            }
            this.itemUpdated(this.item);
        };
    }
    get name() {
        return this.dashboardItem.componentName();
    }
    get _isDesignMode() {
        var ignoreDesignMode = this.localContext && this.localContext.ignoreDesignMode || false;
        if (ignoreDesignMode) {
            return false;
        }
        else {
            return this.context.isDesignMode();
        }
    }
    ensureViewerItem(onlyCreation, content) {
        this.ensureViewerItemCore(onlyCreation, content);
    }
    initialize() {
        let content = this.dashboardItem._getFullServerContent();
        if (content) {
            this.ensureViewerItem(true, content);
            this.itemUpdated(this.item);
        }
        this.modelSubscriptions.push(this.dashboardItem._subcribeServerContent(this.updateServerContentHandler));
    }
    dispose() {
        super.dispose();
        this.modelSubscriptions.forEach(subscription => subscription.dispose());
        if (this.item) {
            if (!!this.context.viewerItemDispose) {
                this.context.viewerItemDispose.fire(this.dashboardItem, this.item);
            }
            if (this.localContext) {
                this.localContext.viewerItemDispose.fire(this.dashboardItem, this.item);
            }
            this.detachFromModel(this.item, this.dashboardItem);
            this.item.dispose();
        }
        this.item = null;
        this.onDisposed();
    }
    resume() {
        this.modelSubscriptions.push(this.dashboardItem._subcribeServerContent(this.updateServerContentHandler));
        this.attachToModel(this.item, this.dashboardItem);
        this.ensureViewerItemCore(false, this.dashboardItem._getFullServerContent());
    }
    suspend() {
        if (!!this.item) {
            this.detachFromModel(this.item, this.dashboardItem);
        }
    }
    ensureViewerItemCore(onlyCreation, content, additionalData) {
        if (!!this.context.beforeApplyViewerItemOptions) {
            this.context.beforeApplyViewerItemOptions.fire(this.dashboardItem, content, onlyCreation, additionalData);
        }
        if (!!this.localContext) {
            this.localContext.beforeApplyViewerItemOptions.fire(this.dashboardItem, content, onlyCreation);
        }
        if (onlyCreation) {
            this.dashboardItem._viewerItemCreated(true);
            this.item = this.createDashboardViewerItem(this.element, content, this.dashboardItem);
        }
        else {
            this.updateItemContent(content);
        }
    }
    updateItemContent(content) {
        this.item.updateContent(content);
    }
    createDashboardViewerItem(element, content, dashboardItem) {
        element.innerHTML = '';
        content.parentContainer = _jquery_helpers_1.closest(element, '.dx-dashboard-container');
        content.controlContainer = _base_item_1.getControlContainer(element);
        if (this.localContext && this.localContext.boundaryContainer) {
            content.boundaryContainer = this.localContext.boundaryContainer;
        }
        let visualMode = this.localContext && this.localContext.visualMode && this.localContext.visualMode() || null;
        var viewerItem;
        if (this.dashboardItem instanceof custom_item_1.CustomItem) {
            if (visualMode === 'caption') {
                viewerItem = new custom_viewer_item_1.CustomItemViewer(this.dashboardItem, _jquery_helpers_1.wrapPublicElement(element), content);
            }
            else {
                var viewerItemCreator = this.context.viewerItemCreator[this.dashboardItem.customItemType()];
                if (!!viewerItemCreator) {
                    viewerItem = viewerItemCreator(this.dashboardItem, _jquery_helpers_1.wrapPublicElement(element), content);
                }
            }
        }
        if (!viewerItem) {
            var viewerItemFactory = (this.localContext && this.localContext.itemFactory) || _viewer_item_factory_1.defaultViewerItemFactory;
            viewerItem = viewerItemFactory.createItem(element, content);
        }
        if (!viewerItem) {
            throw new Error('ViewerItem is not created.');
        }
        if (!!this.context.viewerItemCreated) {
            this.context.viewerItemCreated.fire(this.dashboardItem, viewerItem);
        }
        if (this.localContext) {
            if (this.localContext.visualMode) {
                viewerItem.visualMode = this.localContext.visualMode();
            }
            this.localContext.viewerItemCreated.fire(this.dashboardItem, viewerItem);
            viewerItem.addContextCaptionToolbarOptions = (toolbarOptions) => {
                this.context.addContextToolbarItems.fire(toolbarOptions, this.dashboardItem);
                this.localContext.addContextToolbarItems.fire(toolbarOptions, this.dashboardItem);
            };
            if (this.localContext.createCaptionToolbar) {
                viewerItem.createCaptionToolbar = this.localContext.createCaptionToolbar;
            }
        }
        this.attachToModel(viewerItem, dashboardItem);
        this.beforeRender(viewerItem);
        viewerItem.dateToString = _date_utils_1.fromUtcDateToString;
        viewerItem.render();
        return viewerItem;
    }
    attachToModel(viewerItem, dashboardItem) {
        viewerItem.allowMultiselection = dashboardItem._allowMultiselection();
        this.modelSubscriptions.push(dashboardItem._allowMultiselection.subscribe(newValue => {
            viewerItem.allowMultiselection = newValue;
            viewerItem.forceUpdateInteractivity();
        }));
        viewerItem.allowMultiselectionChanged = (allowed) => {
            dashboardItem._allowMultiselection(allowed);
        };
    }
    detachFromModel(viewerItem, dashboardItem) {
        this.modelSubscriptions.forEach(subscription => subscription.dispose());
        viewerItem.allowMultiselectionChanged = () => { };
    }
}
exports.ItemViewerAdapterBase = ItemViewerAdapterBase;
