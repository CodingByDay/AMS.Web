﻿/**
* DevExpress Dashboard (_floating-toolbar-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatingCaptionToolbarBase = void 0;
const _caption_toolbar_arranger_1 = require("./_caption-toolbar-arranger");
const _caption_toolbar_base_1 = require("./_caption-toolbar-base");
const _caption_toolbar_css_classes_1 = require("./_caption-toolbar-css-classes");
const _floating_panel_1 = require("./_floating-panel");
class FloatingCaptionToolbarBase extends _caption_toolbar_base_1.DashboardCaptionToolbarBase {
    constructor(_container, _controlContainer, _popupContainer, encodeHtml, _isBottomPosition) {
        super(_container, _controlContainer, _popupContainer, encodeHtml);
        this._isBottomPosition = _isBottomPosition;
    }
    set isBottomFloatingTypePosition(isBottom) {
        this._isBottomPosition = isBottom;
    }
    update(options) {
        this._floatingPanel && this._floatingPanel.resetSizeCache();
        return super.update(options);
    }
    calcHeight() {
        return 0;
    }
    onResize() {
        super.onResize();
        if (this._initialized) {
            this._floatingPanel.repaint();
        }
    }
    showFloatingPanel() {
        this._floatingPanel.show();
        this._toolbar.repaint();
    }
    hideFloatingPanel() {
        this._floatingPanel.hide();
        this._toolbar.repaint();
    }
    dispose() {
        super.dispose();
        this._floatingPanel && this._floatingPanel.dispose();
    }
    _appendToContainer(toolbarDiv) {
        let floatingPanelDiv = document.createElement('div');
        floatingPanelDiv.classList.add(_caption_toolbar_css_classes_1.cssClasses.floatingContainer);
        this._container.prepend(floatingPanelDiv);
        this._floatingPanel = this._createFloatingPanel(toolbarDiv, floatingPanelDiv, false);
        return floatingPanelDiv;
    }
    _updateToolbar() {
        super._updateToolbar();
        this._repaintFloatingPanel();
    }
    _repaintFloatingPanel() {
        if (this._floatingPanel) {
            this._floatingPanel.repaint();
        }
    }
    _getVisibleItems() {
        return _caption_toolbar_arranger_1.arrangeFloatingToolbarItems(this._options);
    }
    _createInstance() {
        return new FloatingCaptionToolbarBase(undefined, undefined, undefined, this.encodeHtml, this._isBottomPosition);
    }
    _getToolbarItems(items) {
        return items.map(item => this._adapter.createToolbarItem(item, this._controlContainer, this._popupContainer, () => this.hideFloatingPanel())).filter(item => item !== undefined);
    }
    _createFloatingPanel(toolbarDiv, floatingPanelDiv, preview) {
        return new _floating_panel_1.FloatingPanel({
            toolbarDiv,
            floatingPanelDiv: floatingPanelDiv,
            preview,
            container: this._container,
            bottomPosition: this._isBottomPosition
        });
    }
}
exports.FloatingCaptionToolbarBase = FloatingCaptionToolbarBase;
