﻿/**
* DevExpress Dashboard (_layout-item-placeholder.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardLayoutItemPlaceholder = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const dashboard_layout_node_1 = require("./dashboard-layout-node");
class DashboardLayoutItemPlaceholder extends dashboard_layout_node_1.DashboardLayoutNode {
    get _template() { return 'dx-dashboard-item-placeholder'; }
    constructor(parent, serializer = new analytics_utils_1.ModelSerializer()) {
        super({}, serializer);
        this.parentNode(parent);
    }
    moveTo(itemModel, location) { }
    _delete() { }
    _createViewModel() {
        var baseViewModel = super._createViewModel();
        baseViewModel.create = (modelItemJson, location) => {
            var newItemModel = this.parentNode()._dashboard()._createDashboardLayoutItem(modelItemJson);
            this.parentNode()._addItem(newItemModel);
            return newItemModel._createViewModel();
        };
        baseViewModel.moveTo = (itemModel, location) => { };
        baseViewModel.hasItem = ko.observable(true);
        return baseViewModel;
    }
    _insertItemCore(layoutNodeToInsert, position) {
        if (this.parentNode()) {
            this.parentNode().childNodes.push(layoutNodeToInsert);
        }
    }
    _getDefaultItemType() { return ''; }
}
exports.DashboardLayoutItemPlaceholder = DashboardLayoutItemPlaceholder;
