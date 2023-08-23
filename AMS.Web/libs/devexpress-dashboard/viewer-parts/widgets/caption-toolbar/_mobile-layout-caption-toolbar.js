﻿/**
* DevExpress Dashboard (_mobile-layout-caption-toolbar.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileLayoutCaptionToolbar = void 0;
const _caption_toolbar_css_classes_1 = require("./_caption-toolbar-css-classes");
const _static_toolbar_1 = require("./_static-toolbar");
class MobileLayoutCaptionToolbar {
    constructor(_container, _controlContainer, _popupContainer, _encodeHtml, _className, _hasBorder = false) {
        this._container = _container;
        this._controlContainer = _controlContainer;
        this._popupContainer = _popupContainer;
        this._encodeHtml = _encodeHtml;
        this._className = _className;
        this._hasBorder = _hasBorder;
        this._disabled = false;
    }
    get element() {
        return undefined;
    }
    get disabled() {
        return this._disabled;
    }
    calcHeight(options) {
        let toolbar = this._createInstance();
        toolbar.update(options);
        let height = toolbar._contentToolbar.calcHeight(this._prepareContentToolbarOptions(options)) + toolbar._actionToolbar.calcHeight(this._prepareActionToolbarOptions(options));
        toolbar.dispose();
        return height;
    }
    calcMinWidth(options) {
        return 0;
    }
    update(options) {
        if (!this._contentToolbar) {
            this._contentToolbar = new _static_toolbar_1.StaticCaptionToolbar(this._container, this._controlContainer, this._popupContainer, this._encodeHtml, [this._className, _caption_toolbar_css_classes_1.cssClasses.contentToolbar].join(' '), this._hasBorder, true);
        }
        let contentToolbarOptions = this._prepareContentToolbarOptions(options);
        let contentToolbarHeightChanged = this._contentToolbar.update(contentToolbarOptions);
        if (!this._actionToolbar) {
            let contentToolbarIsHidden = !this._hasItems(contentToolbarOptions);
            this._actionToolbar = new _static_toolbar_1.StaticCaptionToolbar(this._container, this._controlContainer, this._popupContainer, this._encodeHtml, [this._className, _caption_toolbar_css_classes_1.cssClasses.actionToolbar].join(' '), contentToolbarIsHidden && this._hasBorder, true);
        }
        let actualToolbarHeightChanged = this._actionToolbar.update(this._prepareActionToolbarOptions(options));
        this._toolbars = [this._actionToolbar, this._contentToolbar];
        return contentToolbarHeightChanged || actualToolbarHeightChanged;
    }
    onResize() {
        this._toolbars.forEach(toolbar => toolbar.onResize());
    }
    dispose() {
        if (this._toolbars)
            this._toolbars.forEach(toolbar => toolbar.dispose());
    }
    _createInstance() {
        return new MobileLayoutCaptionToolbar(undefined, undefined, undefined, this._encodeHtml, this._className, this._hasBorder);
    }
    _prepareContentToolbarOptions(options) {
        return options ? {
            staticItems: options.staticItems,
            actionItems: [],
            stateItems: [],
            navigationItems: []
        } : undefined;
    }
    _prepareActionToolbarOptions(options) {
        return options ? {
            staticItems: options.navigationItems,
            actionItems: options.actionItems,
            stateItems: options.stateItems,
            navigationItems: []
        } : undefined;
    }
    _hasItems(options) {
        return options.navigationItems.length > 0 || options.actionItems.length > 0 || options.stateItems.length > 0 || options.staticItems.length > 0;
    }
}
exports.MobileLayoutCaptionToolbar = MobileLayoutCaptionToolbar;
