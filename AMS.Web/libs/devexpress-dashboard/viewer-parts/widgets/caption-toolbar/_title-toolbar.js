﻿/**
* DevExpress Dashboard (_title-toolbar.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardTitleToolbar = void 0;
const _caption_toolbar_arranger_1 = require("./_caption-toolbar-arranger");
const _caption_toolbar_base_1 = require("./_caption-toolbar-base");
const _caption_toolbar_css_classes_1 = require("./_caption-toolbar-css-classes");
class DashboardTitleToolbar extends _caption_toolbar_base_1.DashboardCaptionToolbarBase {
    constructor(_container, _controlContainer, _popupContainer, encodeHtml, allowHideEmptyToolbar = false, _optionalClass) {
        super(_container, _controlContainer, _popupContainer, encodeHtml);
        this.allowHideEmptyToolbar = allowHideEmptyToolbar;
        this._optionalClass = _optionalClass;
        this._showStaticItemsOnCenter = false;
        this._className = this._optionalClass ? [this._optionalClass, _caption_toolbar_css_classes_1.cssClasses.title].join(' ') : _caption_toolbar_css_classes_1.cssClasses.title;
    }
    get _staticItemsClass() {
        return this._showStaticItemsOnCenter ? _caption_toolbar_css_classes_1.cssClasses.toolbarCenter : _caption_toolbar_css_classes_1.cssClasses.toolbarBefore;
    }
    calcHeight(options) {
        if (this._visible(options)) {
            return super.calcHeight(options);
        }
        else {
            return 0;
        }
    }
    update(options, showStaticItemsOnCenter) {
        this._showStaticItemsOnCenter = showStaticItemsOnCenter || false;
        let heightChanded = false;
        if (this._visible(options)) {
            heightChanded = super.update(options);
        }
        else if (this._initialized) {
            this.dispose();
            heightChanded = true;
        }
        return heightChanded;
    }
    _getVisibleItems() {
        return _caption_toolbar_arranger_1.arrangeTitleToolbarItems(this._options, this._showStaticItemsOnCenter);
    }
    _createInstance() {
        return new DashboardTitleToolbar(undefined, undefined, undefined, this.encodeHtml, this.allowHideEmptyToolbar, this._optionalClass);
    }
    _visible(options) {
        return !this.allowHideEmptyToolbar || options.actionItems.length > 0 || options.navigationItems.length > 0 || options.stateItems.length > 0 || options.staticItems.length > 0;
    }
}
exports.DashboardTitleToolbar = DashboardTitleToolbar;
