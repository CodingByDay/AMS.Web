﻿/**
* DevExpress Dashboard (_dashboard-layout-creator.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardLayoutCreator = void 0;
const dashboard_tab_page_1 = require("../items/tab-container-item/dashboard-tab-page");
const tab_container_item_1 = require("../items/tab-container-item/tab-container-item");
const dashboard_layout_group_1 = require("./dashboard-layout-group");
class DashboardLayoutCreator {
    constructor(_clientWidth = 1, _clientHeight = 1, _dashboard) {
        this._clientWidth = _clientWidth;
        this._clientHeight = _clientHeight;
        this._dashboard = _dashboard;
        this._layoutRoot = this._dashboard.layout();
        this.rebuildLayout();
    }
    rebuildLayout() {
        this._removeIncorrectLayoutNodes();
        if (this._layoutRoot.childNodes().length === 0) {
            this._layoutRoot.childNodes.push(new dashboard_layout_group_1.DashboardLayoutGroup());
        }
        this._createLayoutNodes(this._dashboard.items().filter(item => item instanceof tab_container_item_1.TabContainerItem));
        this._createLayoutNodes(this._dashboard._tabPages());
        this._createLayoutNodes(this._dashboard.groups());
        this._createLayoutNodes(this._dashboard.items());
    }
    _removeIncorrectLayoutNodes() {
        var layoutNodesToRemove = this._layoutRoot.getNodesRecursive().filter(layoutNode => {
            if (layoutNode.dashboardItem()) {
                var dashboardItem = this._dashboard.findItem(layoutNode.dashboardItem());
                if (!dashboardItem) {
                    return true;
                }
                else if (!!dashboardItem.parentContainer()) {
                    let parent = layoutNode.parentNode();
                    while (parent != this._layoutRoot && parent.dashboardItem() == null)
                        parent = parent.parentNode();
                    if (parent.dashboardItem() !== dashboardItem.parentContainer())
                        return true;
                }
            }
            else if (layoutNode instanceof dashboard_layout_group_1.DashboardLayoutGroup && layoutNode.childNodes().length === 0) {
                return true;
            }
            return false;
        });
        layoutNodesToRemove.forEach(layoutNode => layoutNode.remove());
    }
    _getParentItem(dashboardItem) {
        if (dashboardItem instanceof dashboard_tab_page_1.DashboardTabPage) {
            return this._dashboard.items()
                .filter(item => item instanceof tab_container_item_1.TabContainerItem)
                .filter(tabContainer => tabContainer.tabPages().indexOf(dashboardItem) !== -1)[0];
        }
        return this._dashboard.findItem(dashboardItem.parentContainer());
    }
    _createLayoutNodes(dashboardItems) {
        dashboardItems
            .filter(dashboardItem => !this._layoutRoot.findLayoutItem(dashboardItem))
            .forEach(dashboardItem => {
            var parentNode = null;
            var parentItem = this._getParentItem(dashboardItem);
            if (parentItem) {
                parentNode = this._layoutRoot.findLayoutItem(parentItem);
            }
            if (!parentNode) {
                parentNode = this._layoutRoot.childNodes()[0];
            }
            this._createLayoutNode(dashboardItem, parentNode);
        });
    }
    _createLayoutNode(dashboardItem, layoutGroup) {
        if (layoutGroup.childNodes().length == 0 || this._getParentItem(dashboardItem) instanceof tab_container_item_1.TabContainerItem) {
            layoutGroup.childNodes.push(this._dashboard._createDashboardLayoutNode(dashboardItem));
            return;
        }
        var maxItem = layoutGroup.getItemsRecursive().reduce((acc, layoutNode) => {
            if (acc === null) {
                return layoutNode;
            }
            else {
                if (acc._relativeArea() < layoutNode._relativeArea())
                    return layoutNode;
                return acc;
            }
        }, null);
        var newLayoutNode = this._dashboard._createDashboardLayoutNode(dashboardItem);
        if (maxItem == null) {
            layoutGroup.childNodes.push(newLayoutNode);
            return;
        }
        if (maxItem.parentNode().orientation() === 'Horizontal') {
            if (maxItem._relativeHeight() * this._clientHeight < maxItem._relativeWidth() * this._clientWidth) {
                maxItem.weight(maxItem.weight() / 2);
                newLayoutNode.weight(maxItem.weight());
                maxItem.insert(newLayoutNode, 'right');
            }
            else {
                newLayoutNode.weight(maxItem.weight());
                maxItem.insert(newLayoutNode, 'bottom');
            }
        }
        else {
            if (maxItem._relativeHeight() * this._clientHeight > maxItem._relativeWidth() * this._clientWidth) {
                maxItem.weight(maxItem.weight() / 2);
                newLayoutNode.weight(maxItem.weight());
                maxItem.insert(newLayoutNode, 'bottom');
            }
            else {
                newLayoutNode.weight(maxItem.weight());
                maxItem.insert(newLayoutNode, 'right');
            }
        }
    }
}
exports.DashboardLayoutCreator = DashboardLayoutCreator;
