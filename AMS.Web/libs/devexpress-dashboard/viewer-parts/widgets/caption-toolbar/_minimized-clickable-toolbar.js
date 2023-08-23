﻿/**
* DevExpress Dashboard (_minimized-clickable-toolbar.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinimizedClickableCaptionToolbar = void 0;
const events_1 = require("devextreme/events");
const $ = require("jquery");
const _caption_toolbar_css_classes_1 = require("./_caption-toolbar-css-classes");
const _clickable_floating_toolbar_1 = require("./_clickable-floating-toolbar");
class MinimizedClickableCaptionToolbar extends _clickable_floating_toolbar_1.ClickableFloatingCaptionToolbar {
    constructor(_container, _controlContainer, _popupContainer, encodeHtml, isBottomPosition, itemHasOwnContent) {
        super(_container, _controlContainer, _popupContainer, encodeHtml, isBottomPosition, itemHasOwnContent);
    }
    showPreviewFloatingPanel() {
        if (this._getVisibleItems().length > 0) {
            this._previewFloatingPanel.show();
            this._toolbar.repaint();
            this._disableShield();
            _clickable_floating_toolbar_1.ClickableFloatingCaptionToolbar.activateToolbar(this);
        }
    }
    hideFloatingPanel() {
        super.hideFloatingPanel();
        this._previewFloatingPanel.hide();
        this._toolbar.repaint();
        this._enableShield();
    }
    dispose() {
        this._previewFloatingPanel && this._previewFloatingPanel.dispose();
        events_1.off(this._previewToolbarDiv, 'click.preview');
        super.dispose();
    }
    _createInstance() {
        return new MinimizedClickableCaptionToolbar(undefined, undefined, undefined, this.encodeHtml, this._isBottomPosition, this._itemHasOwnContent);
    }
    _appendToContainer(toolbarDiv) {
        this._previewToolbarDiv = document.createElement('div');
        this._previewToolbarDiv.classList.add(_caption_toolbar_css_classes_1.cssClasses.toolbarPreview);
        let previewFloatingPanelDiv = document.createElement('div');
        $.fn.constructor(this._container).prepend(previewFloatingPanelDiv);
        this._previewFloatingPanel = this._createFloatingPanel(this._previewToolbarDiv, previewFloatingPanelDiv, true);
        this._previewToolbarDiv.appendChild($.fn.constructor('<svg><use xlink:href="#' + _caption_toolbar_css_classes_1.cssClasses.ellipsisIcon + '" /></svg>').get(0));
        events_1.on(this._previewToolbarDiv, 'click.preview', () => this.showFloatingPanel());
        return super._appendToContainer(toolbarDiv);
    }
    _subscribeOnShieldEvents() {
        events_1.on(this._shieldDiv, 'click.shield', () => this.showPreviewFloatingPanel());
    }
}
exports.MinimizedClickableCaptionToolbar = MinimizedClickableCaptionToolbar;
