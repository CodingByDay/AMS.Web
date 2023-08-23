﻿/**
* DevExpress Dashboard (_caption-toolbar-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardCaptionToolbarBase = void 0;
const analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
const toolbar_1 = require("devextreme/ui/toolbar");
const $ = require("jquery");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _render_helper_1 = require("../_render-helper");
const _caption_toolbar_adapter_1 = require("./_caption-toolbar-adapter");
const _caption_toolbar_css_classes_1 = require("./_caption-toolbar-css-classes");
const _toolbar_item_size_calculator_1 = require("./_toolbar-item-size-calculator");
class DashboardCaptionToolbarBase {
    constructor(_container, _controlContainer, _popupContainer, encodeHtml = true) {
        this._container = _container;
        this._controlContainer = _controlContainer;
        this._popupContainer = _popupContainer;
        this.encodeHtml = encodeHtml;
        this._className = _caption_toolbar_css_classes_1.cssClasses.caption;
        this._disabled = false;
        this._adapter = new _caption_toolbar_adapter_1.DashboardCaptionToolbarAdapter(encodeHtml);
    }
    get _initialized() {
        return this._toolbar !== undefined;
    }
    get _staticItemsClass() {
        return _caption_toolbar_css_classes_1.cssClasses.toolbarBefore;
    }
    get element() {
        return this._initialized ? _jquery_helpers_1.$unwrap(this._toolbar.element()) : undefined;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        if (this._disabled !== value) {
            this._disabled = value;
            this._updateToolbar();
        }
    }
    update(options) {
        this._options = options;
        let heightChanded = false;
        if (!this._toolbar) {
            this._toolbarDiv = document.createElement('div');
            this._className.split(' ').forEach(className => this._toolbarDiv.classList.add(className));
            if (this._container)
                this._toolbarContainer = this._appendToContainer(this._toolbarDiv);
            this._toolbar = new toolbar_1.default(this._toolbarDiv, this._getToolbarOptions());
            heightChanded = true;
        }
        else {
            this._updateToolbar();
        }
        return heightChanded;
    }
    calcHeight(options) {
        let toolbar = this._createInstance();
        if (toolbar) {
            this._processToolbarBeforeGettingSize(toolbar);
            toolbar.update(options);
            let height = _render_helper_1.RenderHelper.getElementBox(toolbar.element).height;
            toolbar.dispose();
            return height;
        }
        return 0;
    }
    calcMinWidth(options) {
        let toolbar = this._createInstance();
        if (toolbar) {
            this._processToolbarBeforeGettingSize(toolbar);
            toolbar.update(options);
            let proccesSize = () => {
                let getWidth = (selector) => {
                    return toolbar.element.querySelector('.' + selector).getBoundingClientRect().width;
                };
                let w = getWidth(_caption_toolbar_css_classes_1.cssClasses.toolbarBefore) +
                    getWidth(_caption_toolbar_css_classes_1.cssClasses.toolbarCenter) +
                    getWidth(_caption_toolbar_css_classes_1.cssClasses.toolbarAfter);
                return w;
            };
            let width = _render_helper_1.RenderHelper.processElement($.fn.constructor(toolbar.element), proccesSize);
            toolbar.dispose();
            return width;
        }
        return 0;
    }
    onResize() {
        if (this._initialized) {
            this._toolbar.repaint();
            this._resizeStaticToolbarItems();
        }
    }
    dispose() {
        if (this._toolbarContainer) {
            this._toolbarContainer.parentNode && this._toolbarContainer.parentNode.removeChild(this._toolbarContainer);
            this._toolbarContainer = undefined;
        }
        if (this._toolbar) {
            this._toolbar.dispose();
            this._toolbar = undefined;
        }
    }
    _updateToolbar() {
        if (this._toolbar) {
            this._toolbar.option(this._getToolbarOptions());
        }
    }
    _createInstance() {
        return undefined;
    }
    _getToolbarOptions() {
        return {
            items: this._getToolbarItems(this._getVisibleItems()),
            onContentReady: (data) => {
                this._resizeStaticToolbarItems();
            }
        };
    }
    _getVisibleItems() {
        return [];
    }
    _getToolbarItems(items) {
        return items.map(item => this._adapter.createToolbarItem(item, this._controlContainer, this._popupContainer)).filter(item => item !== undefined);
    }
    _appendToContainer(toolbarDiv) {
        $.fn.constructor(this._container).prepend(toolbarDiv);
        return toolbarDiv;
    }
    _resizeStaticToolbarItems(toolbarDiv = this._toolbarDiv) {
        let staticElements = $.fn.constructor(toolbarDiv).find('.' + this._staticItemsClass).find('.' + _caption_toolbar_css_classes_1.cssClasses.ellipsisText).toArray();
        let toolbarWidth = $.fn.constructor(toolbarDiv).width();
        if (staticElements.length > 0 && toolbarWidth > 0) {
            let afterSectionWidth = $.fn.constructor(toolbarDiv).find('.' + _caption_toolbar_css_classes_1.cssClasses.toolbarAfter).get(0).getBoundingClientRect().width;
            let staticSectionMaxWidth = toolbarWidth - afterSectionWidth;
            let staticSectionWidth = $.fn.constructor(toolbarDiv).find('.' + this._staticItemsClass).get(0).getBoundingClientRect().width;
            let itemsMaxWidth = _toolbar_item_size_calculator_1.calcMaxWidth(staticElements.map(item => $.fn.constructor(item).outerWidth()), staticSectionWidth, staticSectionMaxWidth);
            itemsMaxWidth.map((maxWidth, i) => {
                if (maxWidth !== undefined) {
                    $.fn.constructor(staticElements[i]).closest('.' + _caption_toolbar_css_classes_1.cssClasses.toolbarItem).css('maxWidth', maxWidth + 'px');
                }
            });
        }
    }
    _processToolbarBeforeGettingSize(toolbar) {
    }
}
exports.DashboardCaptionToolbarBase = DashboardCaptionToolbarBase;
analytics_widgets_internal_1.registerBaseBinding('dxToolbar', 'options');
