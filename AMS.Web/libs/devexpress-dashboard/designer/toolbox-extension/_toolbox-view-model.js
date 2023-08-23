﻿/**
* DevExpress Dashboard (_toolbox-view-model.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolboxViewModel = void 0;
const ko = require("knockout");
const _drag_item_info_1 = require("../../common/docking-layout/drag-and-drop/_drag-item-info");
const _interfaces_1 = require("../../common/internal/_interfaces");
const index_internal_1 = require("../../model/index.internal");
const _dashboard_item_helper_1 = require("../../model/internal/_dashboard-item_helper");
const _toolbox_extension_1 = require("./_toolbox-extension");
class ToolboxViewModel {
    constructor(menuVisible, _defaultMenuItemData, _menuItems, _toolboxGroups, _toolbarGroups, _layoutDragController) {
        this._defaultMenuItemData = _defaultMenuItemData;
        this._menuItems = _menuItems;
        this._toolboxGroups = _toolboxGroups;
        this._toolbarGroups = _toolbarGroups;
        this._layoutDragController = _layoutDragController;
        this.toolbarHeight = ko.observable(0);
        this.settingsForm = ko.observable();
        this.toggleMenu = () => {
            this.settingsFormVisible(false);
            this.settingsForm(null);
            this.menuVisible(!this.menuVisible());
        };
        this.closeMenu = () => {
            if (this.menuVisible()) {
                this.toggleMenu();
            }
        };
        this.showMenu = () => {
            if (!this.menuVisible()) {
                this.toggleMenu();
            }
        };
        this.menuItemClick = (menuItem) => {
            menuItem.click && menuItem.click();
            if (menuItem.template) {
                this.settingsForm({
                    title: menuItem.title.replace('…', ''),
                    template: menuItem.template,
                    data: !!menuItem.data ? menuItem.data : this._defaultMenuItemData
                });
                this._menuItems().forEach(item => item.selected(item === menuItem));
            }
        };
        this.menuVisible = ko.observable(false);
        this.designerPanelLeft = ko.observable(menuVisible ? 0 : -_toolbox_extension_1.toolboxConstants.leftPanelWidth);
        this.menuItemsSorted = ko.pureComputed(() => {
            return this._menuItems().sort((a, b) => (a.index || Number.MAX_VALUE) - (b.index || Number.MAX_VALUE));
        });
        this.toolboxGroupsSorted = ko.pureComputed(() => {
            return this._toolboxGroups().sort((a, b) => (a.index || Number.MAX_VALUE) - (b.index || Number.MAX_VALUE));
        });
        this.toolbarGroupsSorted = ko.pureComputed(() => {
            return this._toolbarGroups().sort((a, b) => (a.index || Number.MAX_VALUE) - (b.index || Number.MAX_VALUE));
        });
        this.settingsFormVisible = ko.computed({
            read: () => this.menuVisible() && this._menuItems().some(contextMenuItem => contextMenuItem.selected()),
            write: val => this._menuItems().forEach(item => item.selected(val))
        });
    }
    initDragEvents(itemType) {
        let subscription = null;
        return {
            onInitialize: (args) => {
                let controller = this._layoutDragController();
                controller && controller.initExternalElement(args.element, new ToolboxItemDragItemInfo(itemType));
                subscription = index_internal_1.subscribeWithPrev(this._layoutDragController, (prevValue, newValue) => {
                    prevValue && prevValue.cleanExternalElement(args.element);
                    newValue && newValue.initExternalElement(args.element, new ToolboxItemDragItemInfo(itemType));
                });
            },
            onDisposing: (args) => {
                let controller = this._layoutDragController();
                controller && controller.cleanExternalElement(args.element);
                subscription && subscription.dispose();
            }
        };
    }
    processKeyEvent(keyEventType, eventArgs) {
        if (keyEventType === 'keyup') {
            if (eventArgs.altKey) {
                var menuItem = this._menuItems().filter(item => item.hotKey === eventArgs.keyCode)[0];
                if (menuItem) {
                    setTimeout(() => {
                        setTimeout(() => this.menuItemClick(menuItem), this.menuVisible() ? 10 : 250);
                        this.menuVisible(true);
                    }, 1);
                    return true;
                }
            }
        }
        else if (keyEventType === 'keydown') {
            if (eventArgs.keyCode === _interfaces_1.KeyCodes.Esc && this.menuVisible()) {
                this.closeMenu();
                return true;
            }
            else if (eventArgs.altKey && this._menuItems().map(menuItem => menuItem.hotKey).indexOf(eventArgs.keyCode) !== -1) {
                eventArgs.preventDefault();
                return true;
            }
        }
        return false;
    }
    showDesignerPanel() {
        this.designerPanelLeft(0);
    }
    hideDesignerPanel() {
        this.designerPanelLeft(-_toolbox_extension_1.toolboxConstants.leftPanelWidth);
    }
}
exports.ToolboxViewModel = ToolboxViewModel;
class ToolboxItemDragItemInfo extends _drag_item_info_1.DashboardDragItemInfo {
    constructor(_itemType) {
        super();
        this._itemType = _itemType;
    }
    canDrop(layoutItem) {
        return layoutItem.canAttach(_dashboard_item_helper_1.getItemJson(this._itemType));
    }
    drop(dragOverState) {
        dragOverState.targetItem.create(_dashboard_item_helper_1.getItemJson(this._itemType), dragOverState.hoverLocation, dragOverState.targetItemBehavior);
    }
    dragStart() { }
    dragEnd() { }
}
