﻿/**
* DevExpress Dashboard (interactivity-panel.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractivityPanelExtension = void 0;
const ko = require("knockout");
const control_options_1 = require("../../common/control-options");
const _dashboard_item_menu_1 = require("../items/_dashboard-item-menu");
const _interactivity_properties_composer_1 = require("../items/_interactivity-properties-composer");
const name = 'itemInteractivityPanel';
const nameAlias = 'item-interactivity-panel';
class InteractivityPanelExtension {
    constructor(dashboardControl) {
        this.dashboardControl = dashboardControl;
        this.name = name;
        this._subscriptions = [];
    }
    _contextMenuSubscriber(itemContextMenu) {
        if (!!itemContextMenu) {
            var item = this.dashboardControl._actualLayoutController().selectedDashboardItem();
            this._updateContextMenu(itemContextMenu, item);
        }
    }
    _updateContextMenu(menu, item) {
        if (item._isInteractivityAllowed()) {
            if (menu instanceof _dashboard_item_menu_1.DashboardItemMenu) {
                menu.contextMenuItems.push({
                    menuItemId: nameAlias,
                    icon: 'dx-dashboard-interactivity',
                    title: 'DashboardWebStringId.Interactivity',
                    panelWidth: _dashboard_item_menu_1.DashboardItemMenuSizes.OptionsPanelWidth(),
                    templateName: 'dx-dashboard-options',
                    detailVisible: ko.observable(false),
                    showMenu: () => {
                        var composer = new _interactivity_properties_composer_1.InteractivityPropertiesComposer(menu.propertiesController);
                        var tabs = composer.composeTabs(item);
                        menu.propertiesController.mainModel({
                            data: {
                                model: item,
                                propertiesTabs: ko.observableArray(tabs),
                            }
                        });
                    },
                    customData: {
                        propertiesController: menu.propertiesController,
                    },
                    index: 200
                });
            }
        }
    }
    start() {
        var contextMenuExtension = this.dashboardControl.findExtension('itemMenu');
        if (contextMenuExtension) {
            this._subscriptions.push(contextMenuExtension._itemContextMenu.subscribe(this._contextMenuSubscriber, this));
            this._contextMenuSubscriber(contextMenuExtension._itemContextMenu());
        }
    }
    stop() {
        this._subscriptions.forEach(s => s.dispose());
        this._subscriptions = [];
    }
}
exports.InteractivityPanelExtension = InteractivityPanelExtension;
control_options_1.designerExtensions[nameAlias] = (dashboardControl, options) => new InteractivityPanelExtension(dashboardControl);
control_options_1.extensionNameMap[nameAlias] = name;
