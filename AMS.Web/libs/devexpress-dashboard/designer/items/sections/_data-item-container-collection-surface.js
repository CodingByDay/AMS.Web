﻿/**
* DevExpress Dashboard (_data-item-container-collection-surface.js)
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
exports.DataItemContainerCollectionSurface = void 0;
const ko = require("knockout");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const data_item_1 = require("../../../model/data-item/data-item");
const dimension_1 = require("../../../model/data-item/dimension");
const _data_field_1 = require("../../../model/data-sources/_data-field");
const _undo_engine_helper_1 = require("../../../model/internal/_undo-engine-helper");
const _binding_model_1 = require("../../../model/items/_binding-model");
const _display_name_provider_1 = require("../../_display-name-provider");
const _data_item_container_seed_1 = require("../binding-details/_data-item-container-seed");
const _data_item_container_surface_1 = require("../binding-details/_data-item-container-surface");
class DataItemContainerCollectionSurface {
    constructor(itemSurface, holder, sectionInfo, warning) {
        this.itemSurface = itemSurface;
        this.holder = holder;
        this.sectionInfo = sectionInfo;
        this.warning = warning;
        this._disposables = [];
        this.supportGroups = true;
        this.addDataItemContainerClick = () => {
            var dataItemContainer = new _data_item_container_seed_1.DataItemContainerSeed(this.itemSurface.dashboardItem, this.sectionInfo.bindingProperty.dataItemType, this.sectionInfo.bindingProperty.fieldConstraint);
            this.selectContainerSample(dataItemContainer);
        };
        this.selectContainerSample = (dataItemContainer) => {
            this.newContainerSample(dataItemContainer);
            var newContainerSurface = new _data_item_container_surface_1.DataItemContainerSurface(dataItemContainer, this.sectionInfo.detailsPropertiesComposer, this.itemSurface, this.removeDataItem);
            newContainerSurface.dataFieldChoosed.add((dataField) => {
                this._chooseDataField(dataField, newContainerSurface);
            });
            this._disposables.push(newContainerSurface.containerType.subscribe(containerType => {
                var newContainer = this.sectionInfo.bindingProperty.creator(containerType);
                this.selectContainerSample(newContainer);
            }));
            this.itemSurface.propertiesController.mainModel({
                data: newContainerSurface,
                containingCollection: this.items
            });
        };
        this.removeDataItem = (container) => {
            this._removeDataItem(container);
        };
        this.dataItemDisplayNameProvider = (dataItem) => {
            return _display_name_provider_1.getDataItemDisplayName(this.itemSurface._dataSourceBrowser, this.itemSurface.dashboardItem, dataItem);
        };
        this.getDisplayName = (object) => {
            return _display_name_provider_1.getDataItemContainerDisplayName(this.itemSurface._dataSourceBrowser, this.itemSurface.dashboardItem, object);
        };
        this.selectDataItemContainer = (container) => {
            var surface = new _data_item_container_surface_1.DataItemContainerSurface(container, this.sectionInfo.detailsPropertiesComposer, this.itemSurface, this.removeDataItem);
            surface.dataFieldChoosed.add((dataField, link) => {
                if (link) {
                    var newContainer = this.sectionInfo.bindingProperty.creator('', dataField);
                    var binding = newContainer._getBindingModel()[0];
                    newContainer[binding.propertyName].uniqueName(link.uniqueName());
                    var prevContainers = this.items().filter(item => {
                        var bindingProperty = item[binding.propertyName];
                        if (!!bindingProperty) {
                            return bindingProperty.dataItem().groupIndex && bindingProperty.dataItem().groupIndex() === link.dataItem().groupIndex();
                        }
                        return false;
                    });
                    this.items.splice(this.items().indexOf(prevContainers[prevContainers.length - 1]) + 1, 0, newContainer);
                }
            });
            this._disposables.push(surface.containerType.subscribe(containerType => {
                this._processChangeContainerType(containerType, container, surface);
            }));
            this.itemSurface.propertiesController.mainModel({
                data: surface,
                containingCollection: this.items
            });
        };
        this.newContainerSample = ko.observable();
        this.template = 'dx-dashboard-data-item-container-collection';
        this.groups = ko.computed(() => {
            var result = [], position = 0;
            this.items().forEach(dataItemContainer => {
                var dataItem = dataItemContainer[dataItemContainer._getBindingModel()[0].propertyName].dataItem();
                if (dataItem instanceof dimension_1.Dimension && _data_field_1.IsOlapHierarchyField(dataItem)) {
                    var dimension = dataItem;
                    var group = result.filter(group => group.groupIndex === dimension.groupIndex())[0];
                    if (!group) {
                        group = {
                            groupIndex: dimension.groupIndex(),
                            items: [],
                            position: position++
                        };
                        result.push(group);
                    }
                    group.items.push(dataItemContainer);
                }
                else {
                    result.push({
                        groupIndex: undefined,
                        items: [dataItemContainer],
                        position: position++
                    });
                }
            });
            return result;
        });
        this._disposables.push(this.groups);
    }
    get items() {
        return this.holder[this.sectionInfo.bindingProperty.propertyName];
    }
    _chooseDataField(dataField, newContainerSurface) {
        var containerModel = [newContainerSurface.model()];
        if (containerModel[0] instanceof _data_item_container_seed_1.DataItemContainerSeed) {
            containerModel = containerModel[0].grow(this.itemSurface.dashboardItem, this.sectionInfo.bindingProperty, dataField);
        }
        this.items.push.apply(this.items, containerModel);
        this.newContainerSample(undefined);
        this.selectDataItemContainer(containerModel[0]);
    }
    _removeDataItem(container) {
        this.groups().forEach(group => {
            if (!!group.items.filter(item => item === container)[0]) {
                group.items.forEach((item) => {
                    this.items.remove(item);
                    item._getBindingModel().forEach(binding => {
                        var dataItem = item[binding.propertyName].dataItem();
                        if (!!dataItem) {
                            this.itemSurface.dashboardItem._removeDataItem(dataItem, true);
                        }
                    });
                });
            }
        });
    }
    _processChangeContainer(newContainer, transfers, container, surface) {
        var position = this.items().indexOf(surface.model());
        transfers.forEach(transfer => {
            let link = newContainer[transfer.newBinding.propertyName];
            this.itemSurface.dashboardItem._updateDataItem(transfer.dataItem, transfer.newBinding, transfer.dataField, link._specifics.acceptableShapingType);
            link.uniqueName(transfer.dataItem.uniqueName());
            this.items.splice(position, 1, newContainer);
            link.dataItem().grabFrom(transfer.dataItem);
        });
        this.selectDataItemContainer(newContainer);
    }
    getCompatibleTransfers(container, newContainer) {
        if (_binding_model_1._areTheSameBindingProviders(container, newContainer)) {
            return newContainer
                ._getBindingModel()
                .map(binding => {
                var filledBinding = container._getBindingModel().filter(b => b.propertyName === binding.propertyName)[0];
                if (!filledBinding)
                    return;
                if (!container[filledBinding.propertyName].uniqueName()) {
                    return;
                }
                var dataItem = container[filledBinding.propertyName].dataItem();
                var transferInfo = {
                    filledBinding: filledBinding,
                    dataItem: dataItem,
                    newBinding: binding,
                    dataField: null,
                    promise: this.itemSurface._dataSourceBrowser.findDataField(this.itemSurface.dashboardItem.dataSource(), this.itemSurface.dashboardItem.dataMember(), dataItem.dataMember())
                };
                transferInfo.promise.done(field => {
                    transferInfo.dataField = field;
                });
                return transferInfo;
            })
                .filter(t => !!t);
        }
        return [];
    }
    _processChangeContainerType(containerType, container, surface) {
        var newContainer = this.sectionInfo.bindingProperty.creator(containerType);
        if (!!newContainer.grabFrom) {
            newContainer.grabFrom(container);
        }
        var transfers = this.getCompatibleTransfers(container, newContainer);
        if (transfers.length === 0) {
            let filledBinding = container._getBindingModel().filter(b => !!container[b.propertyName].uniqueName())[0];
            let dataItem = container[filledBinding.propertyName].dataItem();
            let binding = newContainer._getBindingModel()[0];
            let transferInfo = {
                filledBinding: filledBinding,
                dataItem: dataItem,
                newBinding: binding,
                dataField: null,
                promise: this.itemSurface._dataSourceBrowser.findDataField(this.itemSurface.dashboardItem.dataSource(), this.itemSurface.dashboardItem.dataMember(), dataItem.dataMember())
            };
            transferInfo.promise.done(field => {
                transferInfo.dataField = field;
            });
            transfers.push(transferInfo);
        }
        _jquery_helpers_1.jqueryWhenArray(transfers.map(t => t.promise)).done(() => this._processChangeContainer(newContainer, transfers, container, surface));
    }
    relocateItem(item, placeholderIndex) {
        var dataItem;
        if (item instanceof data_item_1.DataItemLink) {
            dataItem = item.dataItem();
        }
        else if (item['_getBindingModel']) {
            this.items.splice(placeholderIndex, 0, item);
            return;
        }
        this.itemSurface
            ._dataSourceBrowser.findDataField(this.itemSurface.dashboardItem.dataSource(), this.itemSurface.dashboardItem.dataMember(), dataItem.dataMember())
            .done((dataField) => {
            let newContainer = this.sectionInfo.bindingProperty.creator(undefined, dataField, dataItem);
            let binding = newContainer._getBindingModel()[0];
            let link = newContainer[binding.propertyName];
            this.itemSurface.dashboardItem._updateDataItem(dataItem, binding, dataField, link._specifics.acceptableShapingType);
            link.uniqueName(dataItem.uniqueName());
            link.dataItem().grabFrom(dataItem);
            this.items.splice(placeholderIndex, 0, newContainer);
        });
    }
    isOlap() {
        var filledLink = this
            .items()
            .reduce((links, container) => links.concat(container._getBindingModel().map(bm => container[bm.propertyName])), [])
            .filter(dil => dil.dataItem())[0];
        return _data_field_1.DataField.isOlap(filledLink.dataItem().dataMember());
    }
    errorFactory(container) {
        var errorState = ko.observable(false);
        var fieldPromises = [];
        container
            ._getBindingModel()
            .filter(binding => container[binding.propertyName].dataItem())
            .forEach(binding => {
            fieldPromises.push(this.itemSurface._dataSourceBrowser.findDataField(this.itemSurface.dashboardItem.dataSource(), this.itemSurface.dashboardItem.dataMember(), container[binding.propertyName].dataItem().dataMember()));
        });
        let isCorruptedDataField = (field) => !field || field.isCorruptedCalcField && field.isCorruptedCalcField();
        _jquery_helpers_1.jqueryWhenArray(fieldPromises).done((...fields) => {
            errorState(fields.filter(f => isCorruptedDataField(f)).length > 0);
        });
        return errorState;
    }
    dispose() {
        this._disposables.forEach((d) => {
            d.dispose();
        });
    }
}
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], DataItemContainerCollectionSurface.prototype, "_chooseDataField", null);
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], DataItemContainerCollectionSurface.prototype, "_removeDataItem", null);
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], DataItemContainerCollectionSurface.prototype, "_processChangeContainer", null);
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], DataItemContainerCollectionSurface.prototype, "relocateItem", null);
exports.DataItemContainerCollectionSurface = DataItemContainerCollectionSurface;
