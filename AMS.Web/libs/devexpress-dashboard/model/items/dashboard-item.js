﻿/**
* DevExpress Dashboard (dashboard-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _common_1 = require("../../data/_common");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _custom_properties_utils_1 = require("../custom-properties/_custom-properties-utils");
const _base_metadata_1 = require("../metadata/_base-metadata");
const serializable_model_1 = require("../serializable-model");
const _interactivity_options_1 = require("./options/metadata/_interactivity-options");
const _pane_content_holder_1 = require("./_pane-content-holder");
class DashboardItem extends serializable_model_1.TypedSerializableModel {
    constructor(dashboardItemJSON = {}, serializer = new analytics_utils_1.ModelSerializer(), info = undefined) {
        super(dashboardItemJSON, serializer, info);
        this._useNeutralFilterMode = ko.observable(false);
        this._uiState = ko.observable('live');
        this._errorState = ko.observable(null);
        this._viewerItemCreated = ko.observable(false);
        this._paneContentHolder = new _pane_content_holder_1.PaneContentHolder();
        this._allowMultiselection = ko.observable(false);
        this._serverContent = ko.observable(null);
        this._actions = ko.computed(() => []);
        this._state = ko.computed(() => null);
        this._dataQueryParams = ko.computed(() => null);
        ko.computed(() => {
            var errorState = this._errorState(), valid = this._paneContentHolder.valid();
            return valid && !errorState;
        }).subscribe(valid => {
            if (valid) {
                var content = _jquery_helpers_1.deepExtend({}, this._paneContentHolder.getContent(_base_metadata_1.PropertyCategory.Data) || {});
                this._updateContentViewModel(content);
                this._updateContentData(content);
                this._extendContentState(content);
                this._serverContent(content);
            }
            else {
                this._serverContent(null);
            }
        });
    }
    static _getCommonItemType(itemType) {
        var commonItemType = itemType.toUpperCase();
        if (commonItemType === 'TEXTBOX') {
            return 'TEXT';
        }
        return commonItemType;
    }
    getUniqueNamePrefix() {
        return super._getUniqueNamePrefix() + 'DashboardItem';
    }
    get _caption() {
        var name = this.name(), layerName = '';
        if (this._getLayersCount() > 0) {
            layerName = this._getLayerName();
            name += !!name && !!layerName ? ' - ' : '';
        }
        return name + layerName;
    }
    _isInteractivityAllowed() {
        return !!this[_interactivity_options_1.commonInteractivityOptions.propertyName];
    }
    _getLayersCount() {
        return 0;
    }
    _getLayerName() {
        return '';
    }
    _updateContentViewModel(content) {
        content.CaptionViewModel = content.CaptionViewModel || {};
        content.CaptionViewModel.Caption = this.name();
        content.CaptionViewModel.Text = this.name();
        content.CaptionViewModel.ShowCaption = this.showCaption();
        content.ViewModel = content.ViewModel || {};
        content.ViewModel.Caption = this.name();
        content.ViewModel.ShowCaption = this.showCaption();
        content.ParentContainer = this.parentContainer();
        content.forceUpdateViewModel = this._paneContentHolder.lastChangeReason === _base_metadata_1.PropertyCategory.ViewModel;
    }
    _updateContentData(content) {
    }
    _updateDataQueryParams(params) {
    }
    _validateSelectionByData(selection) {
    }
    _extendContentState(content) {
    }
    _getDisplayFilterValues(limitCount) {
        return undefined;
    }
    _getDisplayFilterValuesExternal() {
    }
    _getServerContent() {
        let content = this._serverContent();
        var contentCopy = content ? _jquery_helpers_1.deepExtend({}, content) : undefined;
        if (contentCopy) {
            this._extendContentState(contentCopy);
        }
        return contentCopy;
    }
    _getFullServerContent() {
        let serverContent = this._getServerContent();
        return !!serverContent ? Object.assign(Object.assign({}, serverContent), { ContentType: _common_1.contentType.fullContent }) : serverContent;
    }
    _subcribeServerContent(handler) {
        return this._serverContent.subscribe(() => {
            handler(this._getServerContent());
        });
    }
    _getContentCategories() {
        return [_base_metadata_1.PropertyCategory.Initialize];
    }
    _getDataQueryParams() {
        var params = this._dataQueryParams.peek();
        this._updateDataQueryParams(params);
        return params || {};
    }
    _subcribeDataQueryParams(handler) {
        return this._dataQueryParams.subscribe(() => handler(this._getDataQueryParams()));
    }
    _getExportingSelection() {
    }
    _setState(parameter) {
    }
    getInfo() {
        return this._getInfoCore().concat(_custom_properties_utils_1.getCustomPropertiesSerializationInfo(this));
    }
}
exports.DashboardItem = DashboardItem;
