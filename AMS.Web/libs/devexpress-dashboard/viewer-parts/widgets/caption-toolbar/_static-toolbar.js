﻿/**
* DevExpress Dashboard (_static-toolbar.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticCaptionToolbar = void 0;
const _caption_toolbar_arranger_1 = require("./_caption-toolbar-arranger");
const _caption_toolbar_base_1 = require("./_caption-toolbar-base");
const _caption_toolbar_css_classes_1 = require("./_caption-toolbar-css-classes");
class StaticCaptionToolbar extends _caption_toolbar_base_1.DashboardCaptionToolbarBase {
    constructor(_container, _controlContainer, _popupContainer, encodeHtml, _className, _hasBorder, allowHideEmptyToolbar) {
        super(_container, _controlContainer, _popupContainer, encodeHtml);
        this._className = _className;
        this._hasBorder = _hasBorder;
        this.allowHideEmptyToolbar = allowHideEmptyToolbar;
    }
    calcHeight(options) {
        if (this._visible(options)) {
            return super.calcHeight(options);
        }
        else {
            return 0;
        }
    }
    calcMinWidth(options) {
        if (this._visible(options)) {
            return super.calcMinWidth(options);
        }
        else {
            return 0;
        }
    }
    update(options) {
        let heightChanded = false;
        if (this._visible(options)) {
            heightChanded = super.update(options);
            if (this._hasBorder) {
                this._toolbarDiv.classList.add(_caption_toolbar_css_classes_1.cssClasses.captionBorder);
            }
        }
        else if (this._initialized) {
            this.dispose();
            heightChanded = true;
        }
        return heightChanded;
    }
    _getVisibleItems() {
        return _caption_toolbar_arranger_1.arrangeStaticToolbarItems(this._options, this._disabled);
    }
    _createInstance() {
        return new StaticCaptionToolbar(undefined, undefined, undefined, this.encodeHtml, this._className, this._hasBorder, this.allowHideEmptyToolbar);
    }
    _visible(options) {
        return !this.allowHideEmptyToolbar || options.actionItems.length > 0 || options.navigationItems.length > 0 || options.stateItems.length > 0 || options.staticItems.length > 0;
    }
}
exports.StaticCaptionToolbar = StaticCaptionToolbar;
