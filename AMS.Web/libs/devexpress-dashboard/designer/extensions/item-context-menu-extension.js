﻿/**
* DevExpress Dashboard (item-context-menu-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardItemMenuExtension = void 0;
const ko = require("knockout");
const control_options_1 = require("../../common/control-options");
const _docking_layout_controller_1 = require("../../common/docking-layout/_docking-layout-controller");
const _interfaces_1 = require("../../common/internal/_interfaces");
const disposable_object_1 = require("../../model/disposable-object");
const _dashboard_item_menu_1 = require("../items/_dashboard-item-menu");
const name = 'itemMenu';
const nameAlias = 'item-menu';
class DashboardItemMenuExtension extends disposable_object_1.DisposableObject {
    constructor(dashboardControl) {
        super();
        this.dashboardControl = dashboardControl;
        this.name = name;
        this._itemContextMenu = ko.observable();
    }
    start() {
        this.dashboardControl._actualLayoutController.subscribe(layoutController => this._updateExtension(layoutController));
        this._updateExtension(this.dashboardControl._actualLayoutController());
    }
    stop() {
    }
    processKeyEvent(keyEventType, eventArgs) {
        if (keyEventType === 'keydown' && eventArgs.keyCode === _interfaces_1.KeyCodes.Esc) {
            let menu = this._itemContextMenu();
            if (menu && menu instanceof _dashboard_item_menu_1.DashboardItemMenu) {
                if (menu.isSecondaryPanelVisible()) {
                    menu.hideBindingProperties();
                    return true;
                }
                else if (menu.propertiesController.mainModel()) {
                    menu.hideBindingProperties();
                    return true;
                }
                else if (menu.menuItemDetailVisible()) {
                    menu.hideBindingPanel();
                    return true;
                }
            }
        }
        return false;
    }
    menuItemClick(menuItemId) {
        let menu = this._itemContextMenu();
        if (menu && menu instanceof _dashboard_item_menu_1.DashboardItemMenu) {
            var contextMenuItem = menu.contextMenuItems().filter(item => item.menuItemId === menuItemId)[0];
            if (contextMenuItem) {
                menu.menuItemClick(contextMenuItem.menuItemId);
            }
        }
    }
    _updateExtension(layoutController) {
        var that = this;
        if (layoutController != null && layoutController instanceof _docking_layout_controller_1.DockingLayoutController) {
            layoutController.contextMenu = (layoutItem) => {
                return {
                    data: {
                        dockingLayoutController: layoutController,
                        layoutItem: layoutItem,
                        itemMenuViewModelContainer: that._itemContextMenu,
                        notificationController: that.dashboardControl.notificationController
                    },
                    name: 'dx-dashboard-item-menu-holder'
                };
            };
        }
    }
}
exports.DashboardItemMenuExtension = DashboardItemMenuExtension;
control_options_1.designerExtensions[nameAlias] = (dashboardControl, options) => new DashboardItemMenuExtension(dashboardControl);
control_options_1.extensionNameMap[nameAlias] = name;
