﻿/**
* DevExpress Dashboard (options-panel-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsPanelExtension = void 0;
const ko = require("knockout");
const control_options_1 = require("../../common/control-options");
const _options_manager_1 = require("../../common/internal/_options-manager");
const _dashboard_item_menu_1 = require("../items/_dashboard-item-menu");
const name = 'itemOptionsPanel';
const nameAlias = 'item-options-panel';
class OptionsPanelExtension {
    constructor(dashboardControl, options = {}) {
        this.dashboardControl = dashboardControl;
        this.name = name;
        this._subscriptions = [];
        this._perMenuSubscriptions = [];
        this._customizeTabsHandlers = [];
        this._optionsManager = new _options_manager_1.OptionsManager();
        this._optionsManager.initialize({
            extensionName: name,
            dashboardControl: dashboardControl,
            defaultOptions: {},
            eventsHolder: this,
            initOptions: options,
            optionChanged: (args) => null
        });
    }
    _contextMenuSubscriber(itemContextMenu) {
        if (!!itemContextMenu) {
            var item = this.dashboardControl._actualLayoutController().selectedDashboardItem();
            this._updateContextMenu(itemContextMenu, item, this.dashboardControl.dashboard(), this.dashboardControl._dataSourceBrowser);
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
        this._perMenuSubscriptions.forEach(s => s.dispose());
        this._perMenuSubscriptions = [];
        this._subscriptions.forEach(s => s.dispose());
        this._subscriptions = [];
    }
    _updateContextMenu(menu, item, dashboard, dataSourceBrowser) {
        let composer;
        if (menu.selectedItemSurface) {
            composer = menu.selectedItemSurface.getPropertiesComposer();
            menu.selectedItemSurface.customizeDashboardItemTabs = (args) => {
                this._optionsManager.raiseEvent('customizeSections', args);
            };
        }
        menu.contextMenuItems.push({
            menuItemId: nameAlias,
            icon: 'dx-dashboard-properties',
            title: 'DashboardWebStringId.Options',
            panelWidth: _dashboard_item_menu_1.DashboardItemMenuSizes.OptionsPanelWidth(),
            templateName: 'dx-dashboard-options',
            detailVisible: ko.observable(false),
            showMenu: () => {
                let args = { dataSourceBrowser, dashboard, propertiesController: menu.propertiesController };
                let tabs = composer.composeTabs(item, args);
                this._customizeTabsHandlers.forEach(handler => handler(tabs, item));
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
            index: 300
        });
    }
    _subscribeTabsChanged(handler) {
        if (this._customizeTabsHandlers.indexOf(handler) === -1) {
            this._customizeTabsHandlers.push(handler);
        }
        return {
            dispose: () => {
                this._customizeTabsHandlers.splice(this._customizeTabsHandlers.indexOf(handler), 1);
            }
        };
    }
}
exports.OptionsPanelExtension = OptionsPanelExtension;
control_options_1.designerExtensions[nameAlias] = (dashboardControl, options) => new OptionsPanelExtension(dashboardControl, options);
control_options_1.extensionNameMap[nameAlias] = name;
