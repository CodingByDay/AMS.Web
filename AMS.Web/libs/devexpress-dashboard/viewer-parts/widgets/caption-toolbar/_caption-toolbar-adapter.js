﻿/**
* DevExpress Dashboard (_caption-toolbar-adapter.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardCaptionToolbarAdapter = void 0;
const tooltip_1 = require("devextreme/ui/tooltip");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _utils_1 = require("../../../data/_utils");
const _render_helper_1 = require("../_render-helper");
const _caption_toolbar_css_classes_1 = require("./_caption-toolbar-css-classes");
const _popup_menu_creator_1 = require("./_popup-menu-creator");
class DashboardCaptionToolbarAdapter {
    constructor(_encodeHtml) {
        this._encodeHtml = _encodeHtml;
    }
    createToolbarItem(item, controlContainer, popupContainer, onMenuItemClick) {
        if (item.isSeparator)
            return this._createSeparatorItem(item);
        this._validate(item);
        let toolbarItem = {
            location: item.location
        };
        if (item.type === 'button' || item.type === 'menu') {
            toolbarItem.widget = 'dxButton';
            toolbarItem.options = this._createToolbarItemOptions(item, controlContainer, popupContainer, onMenuItemClick);
        }
        else {
            if (item.template) {
                toolbarItem.template = item.template;
            }
            else if (item.text) {
                toolbarItem.template = () => {
                    let textDiv = document.createElement('div');
                    textDiv.classList.add(_caption_toolbar_css_classes_1.cssClasses.ellipsisText);
                    _render_helper_1.RenderHelper.html(textDiv, item.text, this._encodeHtml);
                    return textDiv;
                };
            }
            else {
                return undefined;
            }
        }
        return toolbarItem;
    }
    _applyText(item, text) {
        if (this._encodeHtml === false) {
            item.html = text;
        }
        else {
            item.text = text;
        }
    }
    _createToolbarItemOptions(item, controlContainer, popupContainer, onMenuItemClick) {
        var _a;
        let itemOptions = {};
        if (item.template === undefined) {
            let classNames = this._fillCssClasses(item);
            if (classNames.length > 0) {
                itemOptions.elementAttr = {
                    class: classNames.join(' ')
                };
            }
        }
        if (item.tooltip) {
            itemOptions.onContentReady = (data) => {
                let options = this._createTooltipOptions(item.tooltip, data.element, popupContainer);
                let toolTipElement = document.createElement('div');
                toolTipElement.classList.add(item.tooltip['className']);
                new tooltip_1.default(toolTipElement, options);
                _jquery_helpers_1.$unwrap(data.element).appendChild(toolTipElement);
            };
        }
        else if (item.hint) {
            itemOptions.hint = item.hint;
        }
        if (item.template) {
            itemOptions.template = item.template;
        }
        else if (item.icon) {
            itemOptions.template = (buttonData, contentElement) => {
                return _utils_1.createSvgIconElement(item.icon);
            };
            if (!!((_a = itemOptions.elementAttr) === null || _a === void 0 ? void 0 : _a.class)) {
                itemOptions.elementAttr.class += ' dx-button-has-icon';
            }
            else
                itemOptions.elementAttr = { class: 'dx-button-has-icon' };
        }
        else if (item.text) {
            this._applyText(itemOptions, item.text);
        }
        if (item.type === 'button' && item.click) {
            itemOptions.onClick = data => item.click(data.element);
        }
        else if (item.type === 'menu' && item.menu && (item.menu.items && item.menu.items.length > 0 || item.menu.itemTemplate)) {
            itemOptions.onClick = data => _popup_menu_creator_1.PopupMenuCreator.toggleMenu(_jquery_helpers_1.$unwrap(data.element).querySelector('.dx-button-content'), item.menu, popupContainer, controlContainer, onMenuItemClick);
        }
        if (!!item.disabled) {
            itemOptions.disabled = item.disabled;
        }
        return itemOptions;
    }
    _createTooltipOptions(tooltip, target, container) {
        let contentTemplate = typeof tooltip === 'string' ? (element) => _render_helper_1.RenderHelper.html(_jquery_helpers_1.$unwrap(element), tooltip, this._encodeHtml) : tooltip.template;
        return {
            target: target,
            contentTemplate: contentTemplate,
            showEvent: 'mouseenter',
            hideEvent: 'mouseleave',
            container,
        };
    }
    _fillCssClasses(item) {
        let classNames = [];
        if (item.checked && item.type === 'button')
            classNames.push(_caption_toolbar_css_classes_1.cssClasses.checked);
        if (item.icon) {
            classNames.push(item.icon);
        }
        else if (item.text) {
            classNames.push(_caption_toolbar_css_classes_1.cssClasses.textButton);
        }
        return classNames;
    }
    _validate(item) {
        let menu = item.menu;
        let isIconMenuItem = item.type === 'menu' && menu && menu.type === 'icons';
        if (isIconMenuItem && menu.columnCount !== undefined && menu.columnCount < 1)
            throw new Error('The columnCount property must be greater than zero.');
    }
    _createSeparatorItem(item) {
        return {
            location: item.location,
            html: '<div class="' + _caption_toolbar_css_classes_1.cssClasses.captionPanelSeparator + '"></div>'
        };
    }
}
exports.DashboardCaptionToolbarAdapter = DashboardCaptionToolbarAdapter;
