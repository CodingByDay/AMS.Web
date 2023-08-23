﻿/**
* DevExpress Dashboard (convert.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversionPanelExtension = void 0;
const ko = require("knockout");
const control_options_1 = require("../../common/control-options");
const _utils_1 = require("../../data/_utils");
const _default_1 = require("../../data/localization/_default");
const dashboard_1 = require("../../model/dashboard");
const dashboard_item_1 = require("../../model/items/dashboard-item");
const data_dashboard_item_1 = require("../../model/items/data-dashboard-item");
const serializable_model_1 = require("../../model/serializable-model");
const _dashboard_item_menu_1 = require("../items/_dashboard-item-menu");
const name = 'itemConversionPanel';
const nameAlias = 'item-conversion-panel';
class ConversionPanelExtension {
    constructor(dashboardControl) {
        this.dashboardControl = dashboardControl;
        this.name = name;
        this._subscriptions = [];
    }
    _contextMenuSubscriber(itemContextMenu) {
        if (!!itemContextMenu) {
            var item = this.dashboardControl._actualLayoutController().selectedDashboardItem();
            if (item instanceof data_dashboard_item_1.DataDashboardItem) {
                this._updateContextMenu(itemContextMenu, item, this.dashboardControl.dashboard(), this.dashboardControl._serviceClient());
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
    _updateContextMenu(itemContextMenu, dashboardItem, dashboard, serviceClient) {
        var toolboxExtension = this.dashboardControl.findExtension('toolbox');
        var _convertItem = _utils_1.asyncDebounce(serviceClient.convertItem.bind(serviceClient), (result) => {
            var tmpDashboard = new dashboard_1.Dashboard(result);
            var newItem = tmpDashboard.items()[0];
            newItem.dataSource(dashboardItem.dataSource());
            newItem.componentName(undefined);
            dashboard._changeItem(dashboardItem, newItem);
        });
        const groups = toolboxExtension && toolboxExtension
            .toolboxGroups()
            .map(group => ({
            groupTitle: _default_1.getLocalizationById(group.title),
            items: group.items()
                .filter(item => !!item.type && item.type !== 'Group' && item.type !== 'Image' && item.type !== 'TabContainer' && !serializable_model_1.itemTypesMap[item.type].customItemType)
                .map(item => ({
                title: _default_1.getLocalizationById(item.title),
                icon: item.icon,
                convert: () => _convertItem(dashboardItem, dashboard_item_1.DashboardItem._getCommonItemType(item.type)),
                disabled: dashboardItem.itemType() === item.type,
                type: item.type
            }))
        }))
            .filter(group => group.items.length) || [];
        const viewModel = {
            groups,
            duplicate: () => dashboard._duplicateItem(dashboardItem),
            duplicateActionCaption: _default_1.getLocalizationById('DashboardWebStringId.Duplicate'),
        };
        itemContextMenu.contextMenuItems.push({
            menuItemId: nameAlias,
            icon: 'dx-dashboard-convert',
            title: 'DashboardWebStringId.ConvertTo',
            panelWidth: _dashboard_item_menu_1.DashboardItemMenuSizes.OptionsPanelWidth(),
            templateName: 'dx-dashboard-convert-to',
            detailVisible: ko.observable(false),
            customData: viewModel,
            index: 400
        });
    }
}
exports.ConversionPanelExtension = ConversionPanelExtension;
control_options_1.designerExtensions[nameAlias] = (dashboardControl, options) => new ConversionPanelExtension(dashboardControl);
control_options_1.extensionNameMap[nameAlias] = name;
