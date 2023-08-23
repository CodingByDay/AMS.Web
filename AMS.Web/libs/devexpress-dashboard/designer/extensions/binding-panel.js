﻿/**
* DevExpress Dashboard (binding-panel.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BindingPanelExtension = void 0;
const ko = require("knockout");
const control_options_1 = require("../../common/control-options");
const _options_manager_1 = require("../../common/internal/_options-manager");
const data_dashboard_item_1 = require("../../model/items/data-dashboard-item");
const _dashboard_item_menu_1 = require("../items/_dashboard-item-menu");
const _base_item_surface_1 = require("../items/surfaces/_base-item-surface");
const name = 'itemBindingPanel';
const nameAlias = 'item-binding-panel';
class BindingPanelExtension {
    constructor(dashboardControl, options = {}) {
        this.dashboardControl = dashboardControl;
        this.name = name;
        this._subscriptions = [];
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
    _contextMenuSubscriber(dashboardItemMenu) {
        if (!!dashboardItemMenu) {
            if (this.dashboardControl._actualLayoutController().selectedDashboardItem() instanceof data_dashboard_item_1.DataDashboardItem) {
                this._updateDashboardItemMenu(dashboardItemMenu);
            }
        }
    }
    _updateEmptyItemTemplate(dashboardLayout) {
        if (dashboardLayout && dashboardLayout.emptyItemTemplates) {
            dashboardLayout.emptyItemTemplates.push({
                name: 'dx-dashboard-binding-properties-empty-item',
                data: {
                    isDesignMode: this.dashboardControl.isDesignMode,
                    click: () => {
                        var contextMenuExtension = this.dashboardControl.findExtension('itemMenu');
                        if (contextMenuExtension) {
                            contextMenuExtension.menuItemClick(nameAlias);
                        }
                    }
                }
            });
        }
    }
    _updateDashboardItemMenu(menu) {
        if (menu instanceof _dashboard_item_menu_1.DashboardItemMenu && menu.selectedItemSurface instanceof _base_item_surface_1.DataDashboardItemSurface) {
            const surface = menu.selectedItemSurface;
            if (surface && surface.dataSections && surface.dataSections().length > 0) {
                surface.customizeDataItemContainerTabs = (args) => {
                    this._optionsManager.raiseEvent('customizeDataItemContainerSections', args);
                };
                menu.contextMenuItems.push({
                    menuItemId: nameAlias,
                    icon: 'dx-dashboard-item-options',
                    hint: 'DashboardWebStringId.Bindings',
                    popoverClass: 'dx-dashboard-binding-panel',
                    panelWidth: _dashboard_item_menu_1.DashboardItemMenuSizes.BindingPanelPanelWidth(),
                    templateName: 'dx-dashboard-binding-properties',
                    detailVisible: ko.observable(false),
                    customData: surface,
                    index: 100
                });
            }
        }
    }
    start() {
        this._updateEmptyItemTemplate(this.dashboardControl._actualLayoutController());
        this.dashboardControl._actualLayoutController.subscribe(layoutController => this._updateEmptyItemTemplate(layoutController));
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
exports.BindingPanelExtension = BindingPanelExtension;
control_options_1.designerExtensions[nameAlias] = (dashboardControl, options) => new BindingPanelExtension(dashboardControl, options);
control_options_1.extensionNameMap[nameAlias] = name;
