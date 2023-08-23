﻿/**
* DevExpress Dashboard (_docking-layout-fullscreen-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullscreenItemModel = void 0;
const ko = require("knockout");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _interfaces_1 = require("../internal/_interfaces");
const _layout_item_1 = require("./core/_layout-item");
class FullscreenItemModel {
    constructor(dashboardContext, localContext, repaintRequest = _jquery_helpers_1.createJQueryCallbacks()) {
        this.dashboardContext = dashboardContext;
        this.localContext = localContext;
        this.repaintRequest = repaintRequest;
        this._dashboardItem = ko.observable(null);
        this._visible = ko.observable(false);
        this.dashboardItem = ko.computed(() => this._dashboardItem());
        this.visible = ko.computed(() => this._visible());
        this.viewModel = ko.computed(() => {
            return {
                dashboardItem: this.dashboardItem(),
                dashboardContext: this.dashboardContext,
                localContext: this.localContext,
                repaintRequest: this.repaintRequest,
                getSizeController: (element) => new _interfaces_1.SingleItemSizeController(element.closest('.dx-dashboard-fullscreen-item-base'), this.repaintRequest, _layout_item_1.SplitterSize)
            };
        });
    }
    get maximizedItemName() {
        if (this._visible() && this.dashboardItem()) {
            return this.dashboardItem().componentName();
        }
        else {
            return '';
        }
    }
    maximizeItem(dashboardItem) {
        this._dashboardItem(dashboardItem);
        this._visible(true);
    }
    restoreDownItem() {
        this._visible(false);
    }
}
exports.FullscreenItemModel = FullscreenItemModel;
