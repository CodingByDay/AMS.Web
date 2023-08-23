﻿/**
* DevExpress Dashboard (toolbox-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolboxExtension = void 0;
const ko = require("knockout");
const _helpers_1 = require("../../common/_helpers");
const control_options_1 = require("../../common/control-options");
const _docking_layout_controller_1 = require("../../common/docking-layout/_docking-layout-controller");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const model_1 = require("../../model");
const disposable_object_1 = require("../../model/disposable-object");
const index_internal_1 = require("../../model/index.internal");
const _dashboard_item_helper_1 = require("../../model/internal/_dashboard-item_helper");
const _obsolete_helper_1 = require("../../model/internal/_obsolete-helper");
const serializable_model_1 = require("../../model/serializable-model");
const _toolbox_extension_1 = require("./_toolbox-extension");
const _toolbox_view_model_1 = require("./_toolbox-view-model");
const toolbox_items_1 = require("./toolbox-items");
const name = 'toolbox';
const nameAlias = 'toolbox';
class ToolboxExtension extends disposable_object_1.DisposableObject {
    constructor(dashboardControl) {
        super();
        this.dashboardControl = dashboardControl;
        this.name = name;
        this.menuItems = ko.observableArray();
        this.addMenuItem = (menuItem) => {
            if (!!this._findMenuItem(menuItem.id)) {
                throw Error("The '" + menuItem.id + "' menu item already exists.");
            }
            this.menuItems.push(menuItem);
        };
        this.removeMenuItem = (menuItemId) => {
            var menuItem = this._findMenuItem(menuItemId);
            this.menuItems.remove(menuItem);
        };
        this.selectMenuItem = (menuItem) => {
            if (!!menuItem) {
                this._viewModel.menuVisible(true);
                this._viewModel.menuItemClick(menuItem);
            }
        };
        this.toolboxGroups = ko.observableArray();
        this.addToolboxItem = (groupName, toolboxItem) => {
            var group = this._findToolboxGroup(groupName);
            if (!!group) {
                group.items.push(toolboxItem);
            }
            else {
                throw Error("The '" + groupName + "' group does not exist.");
            }
        };
        this.removeToolboxItem = (groupName, toolboxItemName) => {
            var group = this._findToolboxGroup(groupName);
            if (group) {
                this._unregisterToolboxItem(group, toolboxItemName);
            }
            else {
                throw Error("The '" + groupName + "' group does not exist.");
            }
        };
        this.toolbarGroups = ko.observableArray();
        this.addToolbarItem = (groupName, toolbarItem) => {
            var group = this.toolbarGroups().filter(group => group.name === groupName)[0];
            if (!!group) {
                group.items.push(toolbarItem);
            }
            else {
                throw Error("The '" + groupName + "' group does not exist.");
            }
        };
        this.removeToolbarItem = (groupName, toolbarItemName) => {
            var group = this.toolbarGroups().filter(group => group.name === groupName)[0];
            if (!!group) {
                var toolbarItem = group.items().filter(item => item.name === toolbarItemName)[0];
                group.items.remove(toolbarItem);
            }
            else {
                throw Error("The '" + groupName + "' group does not exist.");
            }
        };
        this.showPanelAsync = (options) => {
            return this._showPanelAsync(options, _helpers_1.CancellationToken.None);
        };
        this._showPanelAsync = (options, cancellationToken) => {
            var def = _jquery_helpers_1.createJQueryDeferred();
            if (cancellationToken.canceled)
                def.reject();
            else {
                this._viewModel.showDesignerPanel();
                setTimeout(() => {
                    if (!cancellationToken.canceled) {
                        options.surfaceLeft = _toolbox_extension_1.toolboxConstants.leftPanelWidth;
                        def.resolve(options);
                    }
                    else {
                        def.reject();
                    }
                }, 500);
            }
            return def.promise();
        };
        this.hidePanelAsync = (options) => {
            return this._hidePanelAsync(options, _helpers_1.CancellationToken.None);
        };
        this._hidePanelAsync = (options, cancellationToken) => {
            var def = _jquery_helpers_1.createJQueryDeferred();
            if (cancellationToken.canceled)
                def.reject();
            else {
                this._viewModel.hideDesignerPanel();
                setTimeout(() => {
                    if (!cancellationToken.canceled) {
                        options.surfaceLeft = 0;
                        def.resolve(options);
                    }
                    else {
                        def.reject();
                    }
                }, 500);
            }
            return def.promise();
        };
        this._layoutItemPlaceholderService = (layoutItem) => {
            var currentDashboardItem = layoutItem._parent().viewModel.model;
            return {
                data: {
                    dashboardItems: ko.computed(() => {
                        var placeholderItems = [];
                        this._viewModel.toolboxGroupsSorted().forEach(group => {
                            group
                                .items()
                                .filter(toolboxItem => model_1.DashboardLayoutNode._canAttach(currentDashboardItem, { '@ItemType': toolboxItem.type }))
                                .forEach(toolboxItem => {
                                placeholderItems.push({
                                    type: toolboxItem.type,
                                    name: toolboxItem.name,
                                    iconName: toolboxItem.icon,
                                    title: toolboxItem.title
                                });
                            });
                        });
                        return placeholderItems;
                    }),
                    addDashboardItem: (data) => {
                        layoutItem.create(_dashboard_item_helper_1.getItemJson(data.type), 'left');
                    }
                },
                name: 'dx-toolbox-extension-layout-item-placeholder'
            };
        };
        let cancelableDesignerToViewerAction = {
            orderNo: 40,
            action: (options) => {
                this.closeMenu();
                return this.hidePanelAsync(options);
            },
            cancelableAction: (options, cancellationToken) => {
                this.closeMenu();
                return this._hidePanelAsync(options, cancellationToken);
            }
        };
        this.designerToViewerAction = cancelableDesignerToViewerAction;
        let cancelableViewerToDesignerAction = {
            orderNo: 40,
            action: this.showPanelAsync,
            cancelableAction: this._showPanelAsync
        };
        this.viewerToDesignerAction = cancelableViewerToDesignerAction;
        this._createDefaultGroups();
        let draggableController = index_internal_1.safeComputed({ dockingLayoutController: this.dashboardControl._dockingLayoutAdapter._dockingLayoutController }, (args) => {
            if (args.dockingLayoutController) {
                return args.dockingLayoutController.dragController;
            }
        });
        this.toDispose(draggableController);
        this._viewModel = new _toolbox_view_model_1.ToolboxViewModel(dashboardControl.isDesignMode(), this.dashboardControl, this.menuItems, this.toolboxGroups, this.toolbarGroups, draggableController);
        this.template = {
            data: this._viewModel,
            name: 'dx-dashboard-toolbox-extension'
        };
        if (dashboardControl.isDesignMode()) {
            dashboardControl.surfaceLeft(_toolbox_extension_1.toolboxConstants.leftPanelWidth);
        }
        dashboardControl.subscribeExtensionsChanged({
            added: (extension) => {
                if (extension.name === 'dashboardPanel') {
                    this._switchToViewerToolbar = new toolbox_items_1.DashboardToolbarGroup('viewer-button', '', 100);
                    var toViewerItem = new toolbox_items_1.DashboardToolbarItem('toviewer', () => dashboardControl.switchToViewer());
                    toViewerItem.template = 'dx-dashboard-working-mode-extension-viewer-button';
                    toViewerItem.disabled = ko.pureComputed(() => !!this.dashboardControl.dashboard());
                    this._switchToViewerToolbar.items.push(toViewerItem);
                    this.toolbarGroups.push(this._switchToViewerToolbar);
                }
            },
            deleted: (extension) => {
                if (extension.name === 'dashboardPanel') {
                    this.toolbarGroups.remove(this._switchToViewerToolbar);
                }
            }
        });
        _obsolete_helper_1.defineObsoleteProperty({
            target: this,
            memberName: 'settingsForm',
            oldMemberDisplayName: 'DevExpress.Dashboard.Designer.ToolboxExtension.settingsForm',
            newMemberDisplayName: 'DevExpress.Dasbhoard.Designer.DashboardMenuItem.template',
            action: () => { return this._viewModel.settingsForm; }
        });
        _obsolete_helper_1.defineObsoleteProperty({
            target: this,
            memberName: 'settingsFormVisible',
            oldMemberDisplayName: 'DevExpress.Dashboard.Designer.ToolboxExtension.settingsFormVisible',
            newMemberDisplayName: 'DevExpress.Dasbhoard.Designer.DashboardMenuItem.template',
            action: () => { return this._viewModel.settingsFormVisible; }
        });
        _obsolete_helper_1.defineObsoleteProperty({
            target: this,
            memberName: 'toggleMenu',
            oldMemberDisplayName: 'DevExpress.Dashboard.Designer.ToolboxExtension.toggleMenu',
            newMemberDisplayName: 'DevExpress.Dasbhoard.Designer.ToolboxExtension.openMenu/closeMenu',
            action: () => { return this._viewModel.toggleMenu; }
        });
        _obsolete_helper_1.defineObsoleteMethod({
            target: this,
            memberName: 'menuItemClick',
            oldMemberDisplayName: 'DevExpress.Dashboard.Designer.ToolboxExtension.menuItemClick',
            newMemberDisplayName: 'DevExpress.Dasbhoard.Designer.ToolboxExtension.selectMenuItem',
            action: (menuItem) => { return this._viewModel.menuItemClick(menuItem); }
        });
    }
    get menuVisible() { return this._viewModel.menuVisible; }
    openMenu() {
        this._viewModel.showMenu();
    }
    closeMenu() {
        this._viewModel.closeMenu();
    }
    processKeyEvent(keyEventType, eventArgs) {
        return this._viewModel.processKeyEvent(keyEventType, eventArgs);
    }
    start() {
        var standardItems = Object.keys(serializable_model_1.itemTypesMap).filter(key => !serializable_model_1.itemTypesMap[key].customItemType);
        var itemTypeNames = standardItems.sort((t1, t2) => serializable_model_1.itemTypesMap[t1].index - serializable_model_1.itemTypesMap[t2].index);
        itemTypeNames.forEach(itemTypeName => this._registerToolboxItem(itemTypeName, serializable_model_1.itemTypesMap[itemTypeName]));
        this.dashboardControl.extensions.forEach(extension => this._registerCustomItemToolbox(extension));
        this.toDispose(this.dashboardControl.subscribeExtensionsChanged({
            added: (extension) => {
                this._registerCustomItemToolbox(extension);
            },
            deleted: (extension) => {
                this.toolboxGroups().forEach(group => this._unregisterToolboxItem(group, extension.name));
            }
        }));
        index_internal_1.subscribeAndPerform(this.dashboardControl._actualLayoutController, (layout) => {
            if (layout && layout instanceof _docking_layout_controller_1.DockingLayoutController) {
                layout.layoutItemPlaceholderService = this._layoutItemPlaceholderService;
            }
        });
    }
    stop() {
        this.dashboardControl.surfaceLeft(0);
    }
    _registerCustomItemToolbox(extension) {
        var customItemExtension = extension;
        if (customItemExtension.metaData) {
            this._registerToolboxItem(customItemExtension.name, customItemExtension.metaData);
        }
    }
    _createDefaultGroups() {
        this.toolboxGroups.push(new toolbox_items_1.DashboardToolboxGroup('common', 'DashboardWebStringId.AccordionTab.Common', 100));
        this.toolboxGroups.push(new toolbox_items_1.DashboardToolboxGroup('maps', 'DashboardStringId.DescriptionMaps', 110));
        this.toolboxGroups.push(new toolbox_items_1.DashboardToolboxGroup('filter', 'DashboardWebStringId.DataSources.Filter', 120));
        this.toolboxGroups.push(new toolbox_items_1.DashboardToolboxGroup('layout', 'DashboardWebStringId.AccordionTab.Layout', 130));
    }
    _registerToolboxItem(itemTypeName, itemDescription) {
        var group = this._findToolboxGroup(itemDescription.groupName) || this._findToolboxGroup('custom');
        if (!group) {
            group = new toolbox_items_1.DashboardToolboxGroup('custom', 'DashboardStringId.CustomItems', 130);
            this.toolboxGroups.push(group);
        }
        var itemClickHandlerCreator = (type) => () => {
            var layout = this.dashboardControl._actualLayoutController();
            layout && layout instanceof _docking_layout_controller_1.DockingLayoutController && layout.addDashboardItem({ type: type });
        };
        var item = new toolbox_items_1.DashboardToolboxItem(itemTypeName, itemClickHandlerCreator(itemTypeName), _dashboard_item_helper_1.getIconName(itemTypeName, itemDescription.icon), itemDescription.title, itemTypeName);
        item.disabled = ko.computed(() => !this.dashboardControl.dashboard());
        group.items.push(item);
        return itemClickHandlerCreator;
    }
    _unregisterToolboxItem(group, toolboxItemName) {
        var toolboxItem = group.items().filter(item => item.name === toolboxItemName)[0];
        if (!!toolboxItem) {
            group.items.remove(toolboxItem);
        }
    }
    _findToolboxGroup(groupName) {
        return this.toolboxGroups().filter(gr => gr.name === groupName)[0];
    }
    _findMenuItem(menuItemId) {
        return this.menuItems().filter(mi => mi.id === menuItemId)[0];
    }
}
exports.ToolboxExtension = ToolboxExtension;
control_options_1.designerExtensions[nameAlias] = (dashboardControl, options) => new ToolboxExtension(dashboardControl);
control_options_1.extensionNameMap[nameAlias] = name;
