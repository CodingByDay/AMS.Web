﻿/**
* DevExpress Dashboard (filter-panel-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterPanelExtension = void 0;
const ko = require("knockout");
const control_options_1 = require("../../common/control-options");
const model_1 = require("../../model");
const _dashboard_item_menu_1 = require("../items/_dashboard-item-menu");
const _item_filter_properties_composer_1 = require("../items/_item-filter-properties-composer");
const name = 'itemFilterPanel';
const nameAlias = 'item-filter-panel';
class FilterPanelExtension {
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
        if (menu instanceof _dashboard_item_menu_1.DashboardItemMenu && item instanceof model_1.DataDashboardItem) {
            menu.contextMenuItems.push({
                menuItemId: nameAlias,
                icon: 'dx-dashboard-item-filter',
                title: 'DashboardWebStringId.Filters',
                panelWidth: _dashboard_item_menu_1.DashboardItemMenuSizes.OptionsPanelWidth(),
                templateName: 'dx-dashboard-options',
                detailVisible: ko.observable(false),
                showMenu: () => {
                    var composer = new _item_filter_properties_composer_1.ItemFilterPropertiesComposer(this.dashboardControl._dataSourceBrowser);
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
                index: 150
            });
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
exports.FilterPanelExtension = FilterPanelExtension;
control_options_1.designerExtensions[nameAlias] = (dashboardControl, options) => new FilterPanelExtension(dashboardControl);
control_options_1.extensionNameMap[nameAlias] = name;
