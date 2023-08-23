﻿/**
* DevExpress Dashboard (_widget-viewer-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.widgetViewerItem = void 0;
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _utils_1 = require("../../data/_utils");
const _widgets_viewer_1 = require("../widgets/widgets-viewer/_widgets-viewer");
const _base_item_1 = require("./_base-item");
class widgetViewerItem extends _base_item_1.baseItem {
    constructor(container, options) {
        super(container, options);
    }
    _clearSelectionUnsafe() {
        this.widgetsViewer.clearSelections();
    }
    getInfoUnsafe() {
        return _jquery_helpers_1.deepExtend(super.getInfoUnsafe(), this.widgetsViewer.getSizeParams());
    }
    renderContentUnsafe(element, changeExisting, afterRenderCallback) {
        var that = this, options = that._getWidgetViewerOptions(), isInAsyncRendering = true;
        options.viewer.onAllItemsRenderComplete = function () {
            if (that.widgetsViewer) {
                afterRenderCallback();
            }
            else {
                isInAsyncRendering = false;
            }
        };
        if (changeExisting && that.widgetsViewer) {
            that.widgetsViewer.option(options);
        }
        else {
            that.widgetsViewer = that.createWidgetViewer(element, options);
        }
        return isInAsyncRendering;
    }
    createWidgetViewer(element, options) {
        return new _widgets_viewer_1.dxWidgetsViewer(element, options);
    }
    _getContainerPositionUnsafe() {
        var that = this, position = super._getContainerPositionUnsafe(), itemInfo = that.getInfo(), scrollSize = itemInfo && itemInfo.scroll && itemInfo.scroll.vertical ? itemInfo.scroll.size : 0;
        position.offsetX -= scrollSize;
        return position;
    }
    _getSpecificWidgetViewerOptions() {
        return {
            itemOptions: {
                encodeHtml: this._isEncodeHtml(),
                itemWidgetOptionsPrepared: (options) => this._raiseItemWidgetOptionsPrepared(options)
            }
        };
    }
    _getWidgetType() {
        return null;
    }
    _isHoverEnabled() {
        return this._selectionMode() !== 'none';
    }
    _configureHover(selectionValues) {
        var hoverEnabled = selectionValues !== null && this._isHoverEnabled() && _utils_1.allowSelectValue(selectionValues);
        return {
            hoverEnabled,
            cursor: hoverEnabled ? 'pointer' : 'default'
        };
    }
    _getWidgetViewerOptions() {
        let viewModel = this.options.ViewModel;
        let contentDescription = viewModel ? viewModel.ContentDescription : undefined;
        if (this.dataController)
            this.dataController.setSourceItemProperties = (sourceItem, element, properties) => this._setSourceItemProperties(sourceItem, element, properties);
        let commonOptions = {
            dataSource: this._getDataSource(),
            viewer: {
                redrawOnResize: false,
                onclick: this._getOnClickHandler(),
                onhover: this._getOnHoverHandler(),
                widgetType: this._getWidgetType(),
                method: contentDescription ? this._convertContentArrangementMode(contentDescription.ArrangementMode) : 'auto',
                count: contentDescription ? contentDescription.LineCount : 1,
                supportAnimation: this._supportAnimation(),
            }
        };
        var resultOptions = _jquery_helpers_1.deepExtend(commonOptions, this._getSpecificWidgetViewerOptions());
        this._ensureOptions(resultOptions);
        return resultOptions;
    }
    _supportAnimation() {
        return false;
    }
    _getDataSource() {
        if (this.dataController)
            return this.dataController.getDataSource();
    }
    _getElementInteractionValue(element, viewModel) {
        return element.tag;
    }
    _getOnClickHandler() {
        var that = this;
        return function (e) {
            that._raiseItemClick(e.item);
        };
    }
    _getOnHoverHandler() {
        var that = this;
        return function (e) {
            that._raiseItemHover(e.item, e.state);
        };
    }
    _convertContentArrangementMode(contentArrangementMode) {
        switch (contentArrangementMode) {
            case 'FixedColumnCount':
                return 'column';
            case 'FixedRowCount':
                return 'row';
            default:
                return 'auto';
        }
    }
    _resizeUnsafe() {
        super._resizeUnsafe();
        this.widgetsViewer.redraw();
    }
    updateContentStateUnsafe() {
        this.widgetsViewer.itemsList.forEach(viewer => {
            viewer.setHoverEnabledState(this._getCustomHoverEnabled());
        });
    }
    _setSourceItemProperties(sourceItem, elementModel, props) {
    }
    _isMultiDataSupported() {
        return true;
    }
    _ensureOptions(options) {
    }
    dispose() {
        super.dispose();
        if (this.widgetsViewer)
            this.widgetsViewer.dispose();
    }
}
exports.widgetViewerItem = widgetViewerItem;
