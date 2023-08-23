﻿/**
* DevExpress Dashboard (_single-data-item-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleDataItemSurface = void 0;
const ko = require("knockout");
const data_item_1 = require("../../../model/data-item/data-item");
const _data_field_1 = require("../../../model/data-sources/_data-field");
const _undo_engine_helper_1 = require("../../../model/internal/_undo-engine-helper");
const _display_name_provider_1 = require("../../_display-name-provider");
const _data_item_surface_1 = require("../binding-details/_data-item-surface");
class SingleDataItemSurface {
    constructor(options) {
        this._disposables = [];
        this.supportGroups = false;
        this.removeDataItem = () => {
            this._removeDataItem();
        };
        this.dataItemDisplayNameProvider = (dataItem) => {
            return _display_name_provider_1.getDataItemDisplayName(this.itemSurface._dataSourceBrowser, this.itemSurface.dashboardItem, dataItem);
        };
        this.selectDataItem = () => {
            this.dataItemSurface(new _data_item_surface_1.DataItemSurface(this.dataItemLink, this.sectionInfo.bindingProperty, this.itemSurface.dashboardItem, this.itemSurface._dataSourceBrowser, this.itemSurface.propertiesController, true, this.fieldConstraint, this.extendTabsHandler));
            this.dataItemSurface().newItemCreated.add((model) => {
                this.selectDataItem();
            });
            this.itemSurface.propertiesController.mainModel({
                data: this.dataItemSurface()
            });
        };
        this.dataItemSurface = ko.observable();
        this.items = ko.observableArray([]);
        this.template = 'dx-dashboard-data-item-single';
        this.itemSurface = options.itemSurface;
        this.sectionInfo = options.sectionInfo;
        this.warning = options.warning;
        this.fieldConstraint = options.fieldConstraint;
        this.extendTabsHandler = options.extendTabsHandler;
        this.dataItemLink = this.itemSurface.dashboardItem[this.sectionInfo.bindingProperty.propertyName];
        this._disposables.push(ko.computed(() => {
            if (this.dataItemLink.uniqueName()) {
                this.items([this.dataItemLink]);
            }
        }));
        this._disposables.push(this.items.subscribe((newValue) => {
            if (!newValue.length) {
                this.dataItemLink.uniqueName(undefined);
            }
        }));
    }
    _removeDataItem() {
        if (!!this.dataItemLink.dataItem()) {
            this.itemSurface.propertiesController.mainModel(null);
            var dataItem = this.dataItemLink.dataItem();
            this.dataItemLink.uniqueName(undefined);
            this.itemSurface.dashboardItem._removeDataItem(dataItem);
        }
    }
    relocateItem(item, placeholderIndex) {
        var dataItem;
        if (item instanceof data_item_1.DataItemLink) {
            dataItem = item.dataItem();
        }
        else if (item['_getBindingModel']) {
            var x = item;
            var filledBinding = x._getBindingModel().filter(b => !!item[b.propertyName].uniqueName())[0];
            dataItem = item[filledBinding.propertyName].dataItem();
        }
        this.itemSurface
            ._dataSourceBrowser.findDataField(this.itemSurface.dashboardItem.dataSource(), this.itemSurface.dashboardItem.dataMember(), dataItem.dataMember())
            .done((dataField) => {
            var newDataItem = this.itemSurface.dashboardItem._createDataItem(dataField, this.sectionInfo.bindingProperty);
            newDataItem.grabFrom(dataItem);
            this.itemSurface.dashboardItem._removeDataItem(dataItem);
            this.dataItemLink.dataItem(newDataItem);
        });
    }
    isOlap() {
        return _data_field_1.DataField.isOlap(this.dataItemLink.dataItem() && this.dataItemLink.dataItem().dataMember());
    }
    errorFactory(link) {
        var linkErrorState = ko.observable(false);
        if (link.dataItem()) {
            this.itemSurface._dataSourceBrowser.findDataField(this.itemSurface.dashboardItem.dataSource(), this.itemSurface.dashboardItem.dataMember(), link.dataItem().dataMember()).done((result) => {
                linkErrorState(!result);
            });
        }
        return linkErrorState;
    }
    dispose() {
        this._disposables.forEach((d) => {
            d.dispose();
        });
    }
}
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], SingleDataItemSurface.prototype, "_removeDataItem", null);
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], SingleDataItemSurface.prototype, "relocateItem", null);
exports.SingleDataItemSurface = SingleDataItemSurface;
