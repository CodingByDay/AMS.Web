﻿/**
* DevExpress Dashboard (_caption-toolbar-arranger.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrangeStaticToolbarItems = exports.arrangeTitleToolbarItems = exports.arrangeHoveredToolbarItems = exports.arrangeFloatingToolbarItems = void 0;
function arrangeToolbarItems(staticItems = [], actionItems = [], stateItems = [], navigationItems = [], showStaticItemsOnCenter = false) {
    let items = [];
    navigationItems.forEach(button => {
        items.push(Object.assign(Object.assign({}, button), { location: staticItems.length !== 0 ? 'before' : 'after' }));
    });
    staticItems.forEach(button => {
        items.push(Object.assign(Object.assign({}, button), { location: showStaticItemsOnCenter ? 'center' : 'before' }));
    });
    actionItems.forEach(button => {
        items.push(Object.assign(Object.assign({}, button), { location: 'after' }));
    });
    if (actionItems.length !== 0 && stateItems.length !== 0) {
        items.push({
            location: 'after',
            isSeparator: true
        });
    }
    stateItems.forEach(button => {
        items.push(Object.assign(Object.assign({}, button), { location: 'after' }));
    });
    return items;
}
function arrangeFloatingToolbarItems(itemOptions) {
    return arrangeToolbarItems(undefined, itemOptions.actionItems, itemOptions.stateItems, itemOptions.navigationItems);
}
exports.arrangeFloatingToolbarItems = arrangeFloatingToolbarItems;
function arrangeHoveredToolbarItems(itemOptions, containerHovered, disabled) {
    return arrangeToolbarItems(itemOptions.staticItems, containerHovered && !disabled ? itemOptions.actionItems : undefined, itemOptions.stateItems, itemOptions.navigationItems);
}
exports.arrangeHoveredToolbarItems = arrangeHoveredToolbarItems;
function arrangeTitleToolbarItems(itemOptions, showStaticItemsOnCenter) {
    return arrangeToolbarItems(itemOptions.staticItems, itemOptions.actionItems, itemOptions.stateItems, itemOptions.navigationItems, showStaticItemsOnCenter);
}
exports.arrangeTitleToolbarItems = arrangeTitleToolbarItems;
function arrangeStaticToolbarItems(itemOptions, disabled) {
    return arrangeToolbarItems(itemOptions.staticItems, disabled ? undefined : itemOptions.actionItems, itemOptions.stateItems, itemOptions.navigationItems);
}
exports.arrangeStaticToolbarItems = arrangeStaticToolbarItems;
