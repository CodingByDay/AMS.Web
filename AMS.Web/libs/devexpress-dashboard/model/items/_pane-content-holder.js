﻿/**
* DevExpress Dashboard (_pane-content-holder.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaneContentHolder = exports.getCategoryContentName = void 0;
const ko = require("knockout");
const _base_metadata_1 = require("../metadata/_base-metadata");
var categoriesCompatibilityInfo = {};
categoriesCompatibilityInfo[_base_metadata_1.PropertyCategory.Initialize] = [_base_metadata_1.PropertyCategory.Data, _base_metadata_1.PropertyCategory.Initialize, _base_metadata_1.PropertyCategory.Interactivity, _base_metadata_1.PropertyCategory.ClientState, _base_metadata_1.PropertyCategory.Coloring];
categoriesCompatibilityInfo[_base_metadata_1.PropertyCategory.Data] = [_base_metadata_1.PropertyCategory.Data, _base_metadata_1.PropertyCategory.Initialize, _base_metadata_1.PropertyCategory.Interactivity, _base_metadata_1.PropertyCategory.ClientState, _base_metadata_1.PropertyCategory.Coloring];
categoriesCompatibilityInfo[_base_metadata_1.PropertyCategory.Interactivity] = [_base_metadata_1.PropertyCategory.Data, _base_metadata_1.PropertyCategory.Initialize, _base_metadata_1.PropertyCategory.Interactivity, _base_metadata_1.PropertyCategory.ClientState, _base_metadata_1.PropertyCategory.Coloring];
categoriesCompatibilityInfo[_base_metadata_1.PropertyCategory.ClientState] = [_base_metadata_1.PropertyCategory.Data, _base_metadata_1.PropertyCategory.Initialize, _base_metadata_1.PropertyCategory.Interactivity, _base_metadata_1.PropertyCategory.ClientState, _base_metadata_1.PropertyCategory.Coloring];
categoriesCompatibilityInfo[_base_metadata_1.PropertyCategory.Coloring] = [_base_metadata_1.PropertyCategory.Data, _base_metadata_1.PropertyCategory.Initialize, _base_metadata_1.PropertyCategory.Interactivity, _base_metadata_1.PropertyCategory.ClientState, _base_metadata_1.PropertyCategory.Coloring];
var localProcessedCategories = [_base_metadata_1.PropertyCategory.ViewModel];
var categoryContentNames = {
    Data: 'data',
    Initialize: 'data',
    Interactivity: 'data',
    ClientState: 'data',
    Map: 'map',
    ViewModel: 'viewModel',
};
function getCategoryContentName(category) {
    var catName = _base_metadata_1.PropertyCategory[category];
    return categoryContentNames[catName] || 'data';
}
exports.getCategoryContentName = getCategoryContentName;
class PaneContentHolder {
    constructor() {
        this._content = ko.observableArray();
        this.valid = ko.computed(() => {
            return this._content().length && this._content().filter(content => content.requestsInProgress() !== 0 || !content.content()).length === 0;
        });
    }
    get lastChangeReason() {
        return this._lastChangeReason;
    }
    _getContentInfo(category) {
        var compatibleCategories = this.getCompatibleCategories(category);
        var catName = getCategoryContentName(compatibleCategories[0]);
        var content = this._content().filter(contentItem => contentItem.category === catName)[0];
        if (!content) {
            content = {
                category: catName,
                content: ko.observable(),
                requestsInProgress: ko.observable(0),
                needAnotherRequest: false
            };
            this._content.push(content);
        }
        return content;
    }
    getContent(category) {
        return this._getContentInfo(category).content();
    }
    isValid(category) {
        var content = this._getContentInfo(category);
        return content.requestsInProgress() === 0 && !!content.content();
    }
    isWaitingForContent(category) {
        var contents = category ? [this._getContentInfo(category)] : this._content();
        return contents.some(content => content.requestsInProgress() !== 0);
    }
    getCompatibleCategories(category) {
        return categoriesCompatibilityInfo[category] || [category];
    }
    needRequestContentFromServer(category) {
        return localProcessedCategories.indexOf(category) === -1;
    }
    itemChanged(category) {
        var content = this._getContentInfo(category);
        content.needAnotherRequest = this.isWaitingForContent(category);
        content.content(undefined);
    }
    beginRequest(category) {
        var content = this._getContentInfo(category);
        content.requestsInProgress(content.requestsInProgress() + 1);
    }
    endRequest(args) {
        this._lastChangeReason = args.category;
        var content = this._getContentInfo(args.category);
        if (!content.needAnotherRequest) {
            content.content(args.response);
        }
        content.needAnotherRequest = false;
        content.requestsInProgress(content.requestsInProgress() - 1);
    }
}
exports.PaneContentHolder = PaneContentHolder;
