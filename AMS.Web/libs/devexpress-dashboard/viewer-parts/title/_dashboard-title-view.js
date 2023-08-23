﻿/**
* DevExpress Dashboard (_dashboard-title-view.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardTitleView = void 0;
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _title_toolbar_1 = require("../widgets/caption-toolbar/_title-toolbar");
const _dashboard_title_toolbar_adapter_1 = require("./_dashboard-title-toolbar-adapter");
class DashboardTitleView {
    constructor() {
        this.onUpdated = _jquery_helpers_1.createJQueryCallbacks();
    }
    get _visible() {
        return this._titleViewModel && this._titleViewModel.Visible;
    }
    initialize(container, controlContainer, encodeHtml, options, titleViewModel) {
        this._options = options;
        this._titleViewModel = titleViewModel;
        if (this._visible) {
            this._captionToolbar = new _title_toolbar_1.DashboardTitleToolbar(container, controlContainer, container, encodeHtml);
        }
    }
    calcHeight(masterFilterValues) {
        if (this._visible) {
            let options = _dashboard_title_toolbar_adapter_1.DashboardTitleToolbarAdapter.getTitleOptions(this._titleViewModel, masterFilterValues, this._options.showExportDialog, this._options.showParametersDialog, this._options.allowExport);
            this._raiseUpdated(options);
            return this._captionToolbar.calcHeight(this._convertToToolbarOptions(options));
        }
        return 0;
    }
    update(masterFilterValues) {
        if (this._visible) {
            let options = _dashboard_title_toolbar_adapter_1.DashboardTitleToolbarAdapter.getTitleOptions(this._titleViewModel, masterFilterValues, this._options.showExportDialog, this._options.showParametersDialog, this._options.allowExport);
            this._raiseUpdated(options);
            this._captionToolbar.update(this._convertToToolbarOptions(options), this._titleViewModel.LayoutModel.Alignment === 'Center');
        }
    }
    resize() {
        if (this._visible) {
            this._captionToolbar.onResize();
        }
    }
    _convertToToolbarOptions(options) {
        return {
            staticItems: options.contentItems,
            actionItems: options.actionItems,
            stateItems: []
        };
    }
    _raiseUpdated(option) {
        this.onUpdated.fire(option);
    }
}
exports.DashboardTitleView = DashboardTitleView;
