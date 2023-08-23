﻿/**
* DevExpress Dashboard (_data-item-container-surface.js)
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
exports.DataItemContainerSurface = void 0;
const ko = require("knockout");
const _data_source_browser_1 = require("../../../common/_data-source-browser");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _undo_engine_helper_1 = require("../../../model/internal/_undo-engine-helper");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _display_name_provider_1 = require("../../_display-name-provider");
const _data_item_surface_1 = require("./_data-item-surface");
class DataItemContainerSurface {
    constructor(model, detailsPropertiesComposer, itemSurface, _removeDataItemContainer) {
        this.detailsPropertiesComposer = detailsPropertiesComposer;
        this.itemSurface = itemSurface;
        this._removeDataItemContainer = _removeDataItemContainer;
        this._disposables = [];
        this.propertiesTabs = ko.observableArray([]);
        this.selectItem = (model, binding) => {
            if (model[binding.propertyName]._specifics.isAttribute &&
                this.model()._getBindingModel().some(bindingProp => this.model()[bindingProp.propertyName] !== model[binding.propertyName] && !this.model()[bindingProp.propertyName].dataItem()))
                return;
            var dataItemSurface = new _data_item_surface_1.DataItemSurface(model[binding.propertyName], binding, this.itemSurface.dashboardItem, this.itemSurface._dataSourceBrowser, this.itemSurface.propertiesController, false, binding.fieldConstraint);
            dataItemSurface.newItemCreated.add((link, newField) => {
                if (!this.model()._getBindingModel().some(bindingProp => (this.model()[bindingProp.propertyName] !== link) && this.model()[bindingProp.propertyName].dataItem())) {
                    this.dataFieldChoosed.fire(newField, link);
                }
            });
            this.itemSurface.propertiesController.secondaryModel({
                displayText: binding.emptyPlaceholder,
                data: dataItemSurface
            });
        };
        this.model = ko.observable();
        this.containerType = ko.observable();
        this.singleItemSurface = ko.observable();
        this.dataFieldChoosed = _jquery_helpers_1.createJQueryCallbacks();
        this.removeDataItem = (dataItemLink) => {
            this._removeDataItem(dataItemLink);
        };
        this.dataItemDisplayNameProvider = (dataItem) => {
            return _display_name_provider_1.getDataItemDisplayName(this.itemSurface._dataSourceBrowser, this.itemSurface.dashboardItem, dataItem);
        };
        if (model.itemType) {
            this.containerType(model._getContainerType());
        }
        var updatePropertiesTabs = (otherTabs) => {
            var promises = [];
            promises.push(this.itemSurface._dataSourceBrowser.getDataFieldsArray(this.itemSurface.dashboardItem.dataSource(), this.itemSurface.dashboardItem.dataMember(), '', _data_source_browser_1.isNonCollectionDataField));
            this.model()._getBindingModel().forEach(b => {
                this.model()[b.propertyName].uniqueName() && promises.push(this.itemSurface._dataSourceBrowser.findDataField(this.itemSurface.dashboardItem.dataSource(), this.itemSurface.dashboardItem.dataMember(), this.model()[b.propertyName].dataItem().dataMember()));
            });
            _jquery_helpers_1.jqueryWhenArray(promises).done((...fields) => {
                otherTabs = otherTabs.concat(this.detailsPropertiesComposer.composeTabs(this.model(), {
                    dashboardItem: this.itemSurface.dashboardItem,
                    containerType: this.containerType,
                    dataSourceBrowser: this.itemSurface._dataSourceBrowser
                }));
                this.propertiesTabs(otherTabs);
            });
        };
        this._disposables.push(this.model.subscribe(newModel => {
            if (!!this.singleItemSurface.peek()) {
                this.singleItemSurface.peek().dispose();
                this.singleItemSurface(null);
            }
            if (newModel._getBindingModel().length === 1) {
                var binding = newModel._getBindingModel()[0];
                var dataItemSurface = new _data_item_surface_1.DataItemSurface(newModel[binding.propertyName], binding, this.itemSurface.dashboardItem, this.itemSurface._dataSourceBrowser, this.itemSurface.propertiesController, false, binding.fieldConstraint);
                dataItemSurface.newItemCreated.add((link, newField) => {
                    this.dataFieldChoosed.fire(newField, link);
                });
                this.singleItemSurface(dataItemSurface);
                this._disposables.push(dataItemSurface.propertiesTabs.subscribe(newTabs => {
                    updatePropertiesTabs(dataItemSurface.propertiesTabs());
                }));
                updatePropertiesTabs(dataItemSurface.propertiesTabs());
            }
            else if (newModel._getBindingModel().length > 1) {
                updatePropertiesTabs([new _accordion_tab_1.ItemGroupAccordionTab(_accordion_tab_1.KnownTabs.DataItemsGroup, 'Data Items', this)]);
            }
            else {
                updatePropertiesTabs([]);
            }
        }));
        this.model(model);
        this._disposables.push({
            dispose: () => {
                this.dataFieldChoosed.empty();
            }
        });
    }
    _removeDataItem(dataItemLink) {
        var dataItem = dataItemLink.dataItem();
        if (!!dataItem) {
            dataItemLink.uniqueName(undefined);
            this.itemSurface.dashboardItem._removeDataItem(dataItem);
            if (!this.model()._getBindingModel().some(b => !!this.model()[b.propertyName].dataItem() && !this.model()[b.propertyName]._specifics.isAttribute)) {
                this.itemSurface.propertiesController.mainModel(null);
                this._removeDataItemContainer(this.model());
            }
        }
    }
    dataItemErrorFactory(dataItem) {
        var dataItemLinkErrorState = ko.observable(false);
        this._disposables.push(ko.computed(() => {
            if (!!dataItem && dataItem.dataMember()) {
                this.itemSurface._dataSourceBrowser.findDataField(this.itemSurface.dashboardItem.dataSource(), this.itemSurface.dashboardItem.dataMember(), dataItem.dataMember()).done((result) => {
                    dataItemLinkErrorState(!result);
                });
            }
        }));
        return dataItemLinkErrorState;
    }
    dispose() {
        this._disposables.forEach((d) => {
            d.dispose();
        });
    }
}
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], DataItemContainerSurface.prototype, "_removeDataItem", null);
exports.DataItemContainerSurface = DataItemContainerSurface;
ko.components.register('dx-dashboard-group-data-items', {
    viewModel: {
        createViewModel: (params) => {
            var model = ko.unwrap(params.model);
            var viewModel = {
                dataItems: model._getBindingModel().map(binding => {
                    return {
                        binding: binding,
                        item: model[binding.propertyName],
                        placeholder: binding.emptyPlaceholder,
                        removeDataItem: (item) => {
                            params.holder.removeDataItem && params.holder.removeDataItem(item);
                        },
                        dataItemDisplayNameProvider: (dataItem) => {
                            return params.holder.dataItemDisplayNameProvider && params.holder.dataItemDisplayNameProvider(dataItem) || '';
                        },
                        click: () => {
                            params.holder.selectItem && params.holder.selectItem(model, binding) || '';
                        }
                    };
                }),
                holder: params.holder
            };
            return viewModel;
        }
    },
    template: { element: 'dx-dashboard-group-data-items' }
});
