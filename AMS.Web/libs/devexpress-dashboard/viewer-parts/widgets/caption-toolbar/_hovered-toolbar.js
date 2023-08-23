﻿/**
* DevExpress Dashboard (_hovered-toolbar.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoveredDashboardCaptionToolbar = void 0;
const $ = require("jquery");
const _caption_toolbar_arranger_1 = require("./_caption-toolbar-arranger");
const _caption_toolbar_base_1 = require("./_caption-toolbar-base");
const _caption_toolbar_css_classes_1 = require("./_caption-toolbar-css-classes");
class HoveredDashboardCaptionToolbar extends _caption_toolbar_base_1.DashboardCaptionToolbarBase {
    constructor(_container, _controlContainer, _popupContainer, encodeHtml, _hasBorder) {
        super(_container, _controlContainer, _popupContainer, encodeHtml);
        this._hasBorder = _hasBorder;
        this._containerHovered = false;
    }
    dispose() {
        if (this._popupContainer) {
            $.fn.constructor(this._popupContainer).off('mouseover.captionPanel');
            $.fn.constructor(this._popupContainer).off('mouseleave.captionPanel');
        }
        super.dispose();
    }
    _appendToContainer(toolbarDiv) {
        let toggleHoverState = (hovered) => {
            if (this._containerHovered !== hovered) {
                this._containerHovered = hovered;
                this._updateToolbar();
            }
        };
        $.fn.constructor(this._popupContainer).on('mouseover.captionPanel', () => toggleHoverState(true));
        $.fn.constructor(this._popupContainer).on('mouseleave.captionPanel', () => toggleHoverState(false));
        return super._appendToContainer(toolbarDiv);
    }
    update(options) {
        let heightChanded = super.update(options);
        if (this._hasBorder) {
            this._toolbarDiv.classList.add(_caption_toolbar_css_classes_1.cssClasses.captionBorder);
        }
        return heightChanded;
    }
    _getVisibleItems() {
        return _caption_toolbar_arranger_1.arrangeHoveredToolbarItems(this._options, this._containerHovered, this.disabled);
    }
    _createInstance() {
        return new HoveredDashboardCaptionToolbar(undefined, undefined, undefined, this.encodeHtml, this._hasBorder);
    }
    _processToolbarBeforeGettingSize(toolbar) {
        toolbar.setHoverState(true);
    }
    setHoverState(hovered) {
        this._containerHovered = hovered;
    }
}
exports.HoveredDashboardCaptionToolbar = HoveredDashboardCaptionToolbar;
