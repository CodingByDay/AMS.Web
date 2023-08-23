﻿/**
* DevExpress Dashboard (_floating-panel.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatingPanel = void 0;
const ui_overlay_1 = require("devextreme/ui/overlay/ui.overlay");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _z_index_1 = require("../../../data/_z-index");
const _caption_toolbar_css_classes_1 = require("./_caption-toolbar-css-classes");
class FloatingPanel {
    constructor(options) {
        this.PREVIEW_TOOLBAR_WIDTH = 15;
        this._maxWidth = undefined;
        let position = options.bottomPosition ? 'bottom right' : 'top right';
        this._container = options.container;
        this._preview = options.preview;
        this._floatingPanelDiv = options.floatingPanelDiv;
        let overlayOptions = {
            shading: false,
            animation: false,
            width: 'auto',
            height: 'auto',
            contentTemplate: (contentElement) => {
                _jquery_helpers_1.$unwrap(contentElement).appendChild(options.toolbarDiv);
            },
            hideOnOutsideClick: false,
            position: {
                boundary: options.container,
                my: position,
                at: position,
                offset: options.bottomPosition ? '2 2' : '2 -2',
                of: options.container
            },
            onShowing: (e) => {
                var wrapper = _jquery_helpers_1.$unwrap(e.component._$wrapper);
                var baseZIndex = _z_index_1.zIndex.floatingToolbar;
                wrapper.style.zIndex = (options.preview ? baseZIndex : baseZIndex + 1).toString();
                var overlayContent = wrapper.querySelector('.dx-overlay-content');
                if (overlayContent) {
                    overlayContent.style.zIndex = wrapper.style.zIndex + 1;
                }
            },
            wrapperAttr: {
                class: _caption_toolbar_css_classes_1.cssClasses.floatingContainer
            }
        };
        overlayOptions = Object.assign(Object.assign({}, overlayOptions), { target: options.container, container: options.container, closeOnSwipe: false, propagateOutsideClick: true });
        this._overlay = new ui_overlay_1.default(options.floatingPanelDiv, overlayOptions);
    }
    _getToolbarWidth() {
        return this._preview ? this.PREVIEW_TOOLBAR_WIDTH : this._calculateToolbarWidth();
    }
    _calculateToolbarWidth() {
        if (!this._maxWidth) {
            let toolbarItemGroupsContainer = this._container.querySelector(`.${_caption_toolbar_css_classes_1.cssClasses.floatingContainer} .dx-toolbar-items-container`);
            let toolbarItemGroups = toolbarItemGroupsContainer && Array.prototype.slice.call(toolbarItemGroupsContainer.childNodes) || [];
            this._maxWidth = Math.min(_jquery_helpers_1.getOuterWidth(this._container), toolbarItemGroups
                .filter(child => !!child.innerHTML)
                .reduce((acc, child) => acc + _jquery_helpers_1.getOuterWidth(child), 0));
        }
        return this._maxWidth;
    }
    show() {
        this._overlay.show();
        this._overlay.option('width', this._getToolbarWidth());
    }
    hide() {
        this._overlay.hide();
    }
    repaint() {
        let newWidth = this._getToolbarWidth();
        if (this._overlay.option('width') === newWidth) {
            this._overlay.repaint();
        }
        else {
            this._overlay.option('width', this._getToolbarWidth());
        }
    }
    isVisible() {
        return this._overlay.option('visible');
    }
    resetSizeCache() {
        this._maxWidth = undefined;
    }
    dispose() {
        this._overlay.dispose();
    }
}
exports.FloatingPanel = FloatingPanel;
