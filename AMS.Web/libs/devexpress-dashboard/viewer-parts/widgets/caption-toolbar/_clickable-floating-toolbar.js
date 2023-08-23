﻿/**
* DevExpress Dashboard (_clickable-floating-toolbar.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickableFloatingCaptionToolbar = void 0;
const events_1 = require("devextreme/events");
const _z_index_1 = require("../../../data/_z-index");
const _floating_toolbar_base_1 = require("./_floating-toolbar-base");
class ClickableFloatingCaptionToolbar extends _floating_toolbar_base_1.FloatingCaptionToolbarBase {
    constructor(_container, _controlContainer, _popupContainer, encodeHtml, isBottomPosition, itemHasOwnContent) {
        super(_container, _controlContainer, _popupContainer, encodeHtml, isBottomPosition);
        this._itemHasOwnContent = itemHasOwnContent;
    }
    static registerToolbar(toolbar) {
        if (ClickableFloatingCaptionToolbar._toolbars.indexOf(toolbar) === -1) {
            ClickableFloatingCaptionToolbar._toolbars.push(toolbar);
        }
    }
    static unregisterToolbar(toolbar) {
        var toolbarIndex = ClickableFloatingCaptionToolbar._toolbars.indexOf(toolbar);
        if (toolbarIndex > -1) {
            ClickableFloatingCaptionToolbar._toolbars.splice(toolbarIndex, 1);
        }
    }
    static activateToolbar(toolbar) {
        ClickableFloatingCaptionToolbar._toolbars
            .filter(t => t !== toolbar)
            .forEach(t => t.hideFloatingPanel());
    }
    update(options) {
        let heightChanded = super.update(options);
        if (this._getVisibleItems().length > 0) {
            if (this._floatingPanel.isVisible()) {
                this._disableShield();
            }
            else {
                this._enableShield();
            }
        }
        else {
            this._disableShield();
        }
        return heightChanded;
    }
    showFloatingPanel() {
        super.showFloatingPanel();
        this._disableShield();
        ClickableFloatingCaptionToolbar.activateToolbar(this);
    }
    hideFloatingPanel() {
        super.hideFloatingPanel();
        this._enableShield();
    }
    dispose() {
        super.dispose();
        events_1.off(this._shieldDiv, 'click.shield');
        ClickableFloatingCaptionToolbar.unregisterToolbar(this);
    }
    _createInstance() {
        return new ClickableFloatingCaptionToolbar(undefined, undefined, undefined, this.encodeHtml, this._isBottomPosition, this._itemHasOwnContent);
    }
    _appendToContainer(toolbarDiv) {
        let floadingPanelDiv = super._appendToContainer(toolbarDiv);
        this._shieldDiv = document.createElement('div');
        this._shieldDiv.style.left = '0';
        this._shieldDiv.style.top = '0';
        this._shieldDiv.style.bottom = '0';
        this._shieldDiv.style.right = '0';
        this._shieldDiv.style.display = 'block';
        if (this._itemHasOwnContent) {
            this._shieldDiv.style.zIndex = (_z_index_1.zIndex.floatingToolbar - 1).toString();
        }
        this._shieldDiv.style.position = 'absolute';
        this._subscribeOnShieldEvents();
        this._container.appendChild(this._shieldDiv);
        ClickableFloatingCaptionToolbar.registerToolbar(this);
        return floadingPanelDiv;
    }
    _subscribeOnShieldEvents() {
        events_1.on(this._shieldDiv, 'click.shield', () => this.showFloatingPanel());
    }
    _disableShield() {
        this._shieldDiv && (this._shieldDiv.style.display = 'none');
    }
    _enableShield() {
        if (this._getVisibleItems().length > 0) {
            this._shieldDiv && (this._shieldDiv.style.display = 'block');
        }
    }
}
exports.ClickableFloatingCaptionToolbar = ClickableFloatingCaptionToolbar;
ClickableFloatingCaptionToolbar._toolbars = [];
