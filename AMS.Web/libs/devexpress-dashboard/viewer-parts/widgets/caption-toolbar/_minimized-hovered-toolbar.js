﻿/**
* DevExpress Dashboard (_minimized-hovered-toolbar.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinimizedHoveredCaptionToolbar = exports.MinimizedToolbarState = void 0;
const $ = require("jquery");
const _caption_toolbar_css_classes_1 = require("./_caption-toolbar-css-classes");
const _floating_toolbar_base_1 = require("./_floating-toolbar-base");
var MinimizedToolbarState;
(function (MinimizedToolbarState) {
    MinimizedToolbarState[MinimizedToolbarState["Hidden"] = 0] = "Hidden";
    MinimizedToolbarState[MinimizedToolbarState["Minimim"] = 1] = "Minimim";
    MinimizedToolbarState[MinimizedToolbarState["Maximim"] = 2] = "Maximim";
})(MinimizedToolbarState = exports.MinimizedToolbarState || (exports.MinimizedToolbarState = {}));
class MinimizedHoveredCaptionToolbar extends _floating_toolbar_base_1.FloatingCaptionToolbarBase {
    constructor(_container, _controlContainer, _popupContainer, encodeHtml, isBottomPosition) {
        super(_container, _controlContainer, _popupContainer, encodeHtml, isBottomPosition);
        this._toolbarState = MinimizedToolbarState.Hidden;
        this._containerHovered = false;
        this._onContainerHovered = () => {
            this._containerHovered = true;
            this._showPreviewFloatingPanel();
        };
        this._onContainerLeave = () => {
            this._containerHovered = false;
            this._hidePreviewFloatingPanel();
        };
        this._onPreviewHovered = () => {
            this._hidePreviewFloatingPanel();
            this.showFloatingPanel();
            this._floatingPanel.repaint();
            this._toolbarState = MinimizedToolbarState.Maximim;
        };
        this._onToolbarLeave = () => {
            this.hideFloatingPanel();
            this._toolbarState = MinimizedToolbarState.Hidden;
            this._showPreviewFloatingPanel();
        };
    }
    get hasItems() {
        return this._getVisibleItems().length > 0;
    }
    calcMinWidth(options) {
        return 0;
    }
    dispose() {
        if (this._popupContainer) {
            this._popupContainer.removeEventListener('mouseenter', this._onContainerHovered);
            this._popupContainer.removeEventListener('mouseleave', this._onContainerLeave);
        }
        if (this._previewToolbarDiv) {
            this._previewToolbarDiv.removeEventListener('mouseenter', this._onPreviewHovered);
            this._toolbarDiv.removeEventListener('mouseleave', this._onToolbarLeave);
        }
        this._previewFloatingPanel && this._previewFloatingPanel.dispose();
        super.dispose();
    }
    onResize() {
        super.onResize();
        if (this._initialized) {
            this._previewFloatingPanel.repaint();
        }
    }
    _appendToContainer(toolbarDiv) {
        var element = super._appendToContainer(toolbarDiv);
        this._previewToolbarDiv = document.createElement('div');
        this._previewToolbarDiv.classList.add(_caption_toolbar_css_classes_1.cssClasses.toolbarPreview);
        let previewFloatingPanelDiv = document.createElement('div');
        $.fn.constructor(this._container).prepend(previewFloatingPanelDiv);
        this._previewFloatingPanel = this._createFloatingPanel(this._previewToolbarDiv, previewFloatingPanelDiv, true);
        this._previewToolbarDiv.appendChild($.fn.constructor('<svg><use xlink:href="#' + _caption_toolbar_css_classes_1.cssClasses.ellipsisIcon + '" /></svg>').get(0));
        this._popupContainer.addEventListener('mouseenter', this._onContainerHovered);
        this._popupContainer.addEventListener('mouseleave', this._onContainerLeave);
        this._previewToolbarDiv.addEventListener('mouseenter', this._onPreviewHovered);
        this._toolbarDiv.addEventListener('mouseleave', this._onToolbarLeave);
        return element;
    }
    _repaintFloatingPanel() {
        if (!this._floatingPanel || !this._previewFloatingPanel)
            return;
        if (this._containerHovered) {
            if (this._toolbarState === MinimizedToolbarState.Maximim) {
                if (this.hasItems) {
                    this._floatingPanel.repaint();
                }
                else {
                    this.hideFloatingPanel();
                    this._toolbarState = MinimizedToolbarState.Hidden;
                }
            }
            else {
                if (this.hasItems) {
                    this._showPreviewFloatingPanel();
                }
                else {
                    this._hidePreviewFloatingPanel();
                }
            }
        }
        else {
            this.hideFloatingPanel();
            this._hidePreviewFloatingPanel();
        }
    }
    _showPreviewFloatingPanel() {
        if (this._toolbarState != MinimizedToolbarState.Maximim && this.hasItems) {
            this._previewFloatingPanel.show();
            this._toolbarState = MinimizedToolbarState.Minimim;
        }
    }
    _hidePreviewFloatingPanel() {
        this._previewFloatingPanel.hide();
        if (this._toolbarState === MinimizedToolbarState.Minimim)
            this._toolbarState = MinimizedToolbarState.Hidden;
    }
    _createInstance() {
        return new MinimizedHoveredCaptionToolbar(undefined, undefined, undefined, this.encodeHtml, this._isBottomPosition);
    }
}
exports.MinimizedHoveredCaptionToolbar = MinimizedHoveredCaptionToolbar;
