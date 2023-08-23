﻿/**
* DevExpress Dashboard (_popup-menu-creator.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopupMenuCreator = void 0;
const list_1 = require("devextreme/ui/list");
const popover_1 = require("devextreme/ui/popover");
require("devextreme/ui/tile_view");
const tile_view_1 = require("devextreme/ui/tile_view");
const _utils_1 = require("../../../data/_utils");
const _caption_toolbar_css_classes_1 = require("./_caption-toolbar-css-classes");
class PopupMenuCreator {
    static toggleMenu(element, menu, container, controlContainer, onMenuItemClick) {
        let popoverOptions = this._createPopoverOptions(element, menu, container, controlContainer);
        let onItemClick = (data) => {
            popover.hide();
            if (onMenuItemClick) {
                onMenuItemClick();
            }
            if (menu.itemClick)
                menu.itemClick(data.itemData, data.itemElement, data.itemIndex);
        };
        if (menu.type === 'icons') {
            popoverOptions.contentTemplate = (contentElement) => {
                let div = document.createElement('div');
                new tile_view_1.default(div, this._createTileViewOptions(menu, onItemClick));
                return div;
            };
        }
        else {
            popoverOptions.contentTemplate = (contentElement) => {
                return new list_1.default(document.createElement('div'), this._createListOptions(menu, onItemClick)).element();
            };
        }
        let popoverClass = menu.type === 'icons' ? _caption_toolbar_css_classes_1.cssClasses.popoverIconMenuWrapper : _caption_toolbar_css_classes_1.cssClasses.popoverListWrapper;
        popoverOptions.wrapperAttr = { class: popoverClass };
        let popoverContainer = this._getPopupContainer(element, 'dx-dashboard-popover-marker');
        var popover = popover_1.default.getInstance(popoverContainer);
        if (popover) {
            popover.option(popoverOptions);
        }
        else {
            popover = new popover_1.default(popoverContainer, popoverOptions);
        }
        popover.toggle(!popover.option('visible'));
    }
    static _createPopoverOptions(element, menu, container, controlContainer) {
        return {
            width: 'auto',
            height: 'auto',
            target: element,
            toolbarItems: menu.type === 'icons' && menu.title ? [{ location: 'center', text: menu.title }] : [],
            animation: {
                show: { type: 'pop', from: { opacity: 1, scale: 0 }, to: { scale: 1 } },
                hide: { type: 'pop', from: { scale: 1 }, to: { scale: 0 } }
            },
            position: {
                my: 'top center',
                at: 'bottom center',
                collision: 'fit flip',
                boundary: controlContainer
            },
            container: container
        };
    }
    static _createTileViewOptions(menu, onItemClick) {
        let itemsCount = menu.items.length;
        let columnCount = menu.columnCount ? Math.min(menu.columnCount, itemsCount) : itemsCount;
        return {
            direction: 'horizontal',
            dataSource: menu.items,
            height: this._icon_menu_element_size * Math.ceil(itemsCount / columnCount),
            itemMargin: 0,
            baseItemHeight: this._icon_menu_element_size,
            baseItemWidth: this._icon_menu_element_size,
            itemTemplate: menu.itemTemplate ? menu.itemTemplate : (itemData, itemIndex, itemElement) => {
                return _utils_1.createSvgIconElement(menu.items[itemIndex]);
            },
            onItemClick: onItemClick
        };
    }
    static _createListOptions(menu, onItemClick) {
        let listOptions = {
            selectionMode: menu.selectionMode || 'none',
            selectedItems: menu.selectedItems || [],
            dataSource: menu.items,
            onItemClick: onItemClick
        };
        if (menu.itemTemplate) {
            listOptions.itemTemplate = menu.itemTemplate;
        }
        return listOptions;
    }
    static _getPopupContainer(element, markerClassName) {
        let popupContainer = element.querySelectorAll('.' + markerClassName);
        if (popupContainer.length > 1) {
            console.log('Multiple popovers');
        }
        else if (popupContainer.length === 0) {
            let div = document.createElement('div');
            div.classList.add(markerClassName);
            element.appendChild(div);
            return div;
        }
        else {
            return popupContainer[0];
        }
    }
}
exports.PopupMenuCreator = PopupMenuCreator;
PopupMenuCreator._icon_menu_element_size = 65;
