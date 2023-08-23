﻿/**
* DevExpress Dashboard (_data-item-collection-surface.js)
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
exports.DataItemCollectionSurface = void 0;
const ko = require("knockout");
const data_item_1 = require("../../../model/data-item/data-item");
const dimension_1 = require("../../../model/data-item/dimension");
const _data_field_1 = require("../../../model/data-sources/_data-field");
const _undo_engine_helper_1 = require("../../../model/internal/_undo-engine-helper");
const _display_name_provider_1 = require("../../_display-name-provider");
const _data_item_surface_1 = require("../binding-details/_data-item-surface");
class DataItemCollectionSurface {
    constructor(itemSurface, sectionInfo, extendTabsHandler, warning) {
        this.itemSurface = itemSurface;
        this.sectionInfo = sectionInfo;
        this.extendTabsHandler = extendTabsHandler;
        this.warning = warning;
        this._disposables = [];
        this.supportGroups = true;
        this.addClick = () => {
            var dataLink = new data_item_1.DataItemLink(this.itemSurface.dashboardItem);
            this.newItemSample(dataLink);
            var surface = new _data_item_surface_1.DataItemSurface(dataLink, this.sectionInfo.bindingProperty, this.itemSurface.dashboardItem, this.itemSurface._dataSourceBrowser, this.itemSurface.propertiesController, true, null, this.extendTabsHandler);
            surface.newItemCreated.add(model => this._addDataItem(model));
            surface.itemSelected.add(model => {
                this.newItemSample(undefined);
                this.selectDataItem(model);
            });
            this.itemSurface.propertiesController.mainModel({
                data: surface,
                containingCollection: this.dataItems
            });
        };
        this.removeDataItem = (data) => {
            this._removeDataItem(data);
        };
        this.dataItemDisplayNameProvider = (dataItem) => {
            return _display_name_provider_1.getDataItemDisplayName(this.itemSurface._dataSourceBrowser, this.itemSurface.dashboardItem, dataItem);
        };
        this.selectDataItem = (data) => {
            var surface = new _data_item_surface_1.DataItemSurface(data, this.sectionInfo.bindingProperty, this.itemSurface.dashboardItem, this.itemSurface._dataSourceBrowser, this.itemSurface.propertiesController, true, null, this.extendTabsHandler);
            surface.newItemCreated.add(model => {
                this._addDataItem(model);
            });
            this.dataItemSurface(surface);
            this.itemSurface.propertiesController.mainModel({
                data: this.dataItemSurface(),
                containingCollection: this.dataItems
            });
        };
        this.dataItemSurface = ko.observable();
        this.newItemSample = ko.observable();
        this.template = 'dx-dashboard-data-item-collection';
        this.dataItems = itemSurface.dashboardItem[sectionInfo.bindingProperty.propertyName];
        this.groups = ko.computed(() => {
            var result = [], position = 0;
            this.dataItems().forEach(dataItemLink => {
                if (dataItemLink.dataItem() instanceof dimension_1.Dimension && _data_field_1.IsOlapHierarchyField(dataItemLink.dataItem())) {
                    var dimension = dataItemLink.dataItem();
                    var group = result.filter(group => group.groupIndex === dimension.groupIndex())[0];
                    if (!group) {
                        group = {
                            groupIndex: dimension.groupIndex(),
                            items: [],
                            position: position++
                        };
                        result.push(group);
                    }
                    group.items.push(dataItemLink);
                }
                else {
                    result.push({
                        groupIndex: undefined,
                        items: [dataItemLink],
                        position: position++
                    });
                }
            });
            return result;
        });
    }
    get items() {
        return this.dataItems;
    }
    _addDataItem(model) {
        this.dataItems.push(model);
    }
    _removeDataItem(link) {
        var dataItem = link.dataItem();
        this.dataItems.remove(link);
        this.itemSurface.dashboardItem._removeDataItem(dataItem, true);
        if (dataItem instanceof dimension_1.Dimension && _data_field_1.IsOlapHierarchyField(dataItem)) {
            for (var i = this.dataItems().length - 1; i >= 0; i--) {
                var groupItemLink = this.dataItems()[i];
                var groupItem = groupItemLink.dataItem();
                if (groupItem instanceof dimension_1.Dimension && groupItem.groupIndex() == dataItem.groupIndex()) {
                    this.dataItems.remove(groupItemLink);
                    this.itemSurface.dashboardItem._removeDataItem(groupItem, true);
                }
            }
        }
    }
    relocateItem(item, placeholderIndex) {
        var dataLink = new data_item_1.DataItemLink(this.itemSurface.dashboardItem);
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
            this.itemSurface.dashboardItem._removeDataItem(dataItem);
            var newDataItem = this.itemSurface.dashboardItem._createDataItem(dataField, this.sectionInfo.bindingProperty);
            newDataItem.grabFrom(dataItem);
            newDataItem.uniqueName(dataItem.uniqueName());
            dataLink.dataItem(newDataItem);
            this.items.splice(placeholderIndex, 0, dataLink);
        });
    }
    isOlap() {
        var filledItem = this
            .items()
            .filter(item => item.dataItem())[0];
        return _data_field_1.DataField.isOlap(filledItem.dataItem().dataMember());
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
], DataItemCollectionSurface.prototype, "_addDataItem", null);
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], DataItemCollectionSurface.prototype, "_removeDataItem", null);
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], DataItemCollectionSurface.prototype, "relocateItem", null);
exports.DataItemCollectionSurface = DataItemCollectionSurface;
