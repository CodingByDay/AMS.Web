﻿/**
* DevExpress Dashboard (_data-item-surface.js)
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
exports.DataItemSurface = void 0;
const ko = require("knockout");
const _data_source_browser_1 = require("../../../common/_data-source-browser");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const data_item_1 = require("../../../model/data-item/data-item");
const measure_1 = require("../../../model/data-item/measure");
const _data_field_1 = require("../../../model/data-sources/_data-field");
const _undo_engine_helper_1 = require("../../../model/internal/_undo-engine-helper");
const _data_item_properties_composer_1 = require("../properties-composers/_data-item-properties-composer");
class DataItemSurface {
    constructor(model, binding, container, dataSourceBrowser, propertiesController, unwrappedDataItem, fieldConstraint, extendTabsHandler) {
        this.model = model;
        this.binding = binding;
        this.propertiesController = propertiesController;
        this.unwrappedDataItem = unwrappedDataItem;
        this.fieldConstraint = fieldConstraint;
        this.extendTabsHandler = extendTabsHandler;
        this._disposables = [];
        this.propertiesTabs = ko.observableArray([]);
        this.choosenField = ko.observable();
        this.newItemCreated = _jquery_helpers_1.createJQueryCallbacks();
        this.itemSelected = _jquery_helpers_1.createJQueryCallbacks();
        var composer = new _data_item_properties_composer_1.DataItemsPropertiesComposer();
        var updatePropertiesTabs = () => {
            var result = composer.composeTabs(this.model, {
                dataDashboardItem: container,
                choosenField: this.choosenField,
                dataSourceBrowser: dataSourceBrowser,
                unwrappedDataItem: this.unwrappedDataItem,
                constraint: this.fullConstraint,
                propertiesController: this.propertiesController
            });
            this.extendTabsHandler && this.extendTabsHandler(result, this.model.dataItem());
            var promise = dataSourceBrowser.getDataFieldsArray(container.dataSource(), container.dataMember(), '', _data_source_browser_1.isNonCollectionDataField);
            promise.done(() => {
                let oldTabs = this.propertiesTabs.peek();
                oldTabs && oldTabs.forEach(tab => tab.dispose());
                this.propertiesTabs(result);
            });
        };
        var subscribeToFieldChanges = () => {
            this._disposables.push(this.choosenField.subscribe((newField) => {
                if (model.dataItem() && model.dataItem().dataMember()) {
                    this._changeExistingField(container, model, newField, updatePropertiesTabs);
                }
                else {
                    this._changeNewField(container, newField, updatePropertiesTabs);
                }
            }));
            updatePropertiesTabs();
        };
        if (!!model.dataItem()) {
            dataSourceBrowser
                .findDataField(container.dataSource(), container.dataMember(), model.dataItem().dataMember())
                .done((field) => {
                if (!!field && field !== this.choosenField()) {
                    this.choosenField(field);
                }
                subscribeToFieldChanges();
            });
        }
        else {
            subscribeToFieldChanges();
        }
        this._disposables.push({
            dispose: () => {
                this.newItemCreated.empty();
            }
        });
    }
    _changeNewField(container, newField, additionalFunc) {
        if (this.model.itemType() !== 'Seed') {
            if (!_data_field_1.IsOlapHierarchyField(newField)) {
                var dataItem = container._createDataItem(newField, this.binding);
                if (this.model._specifics.isAttribute && dataItem instanceof measure_1.Measure) {
                    dataItem.summaryType('Min');
                }
                this.model.uniqueName(dataItem.uniqueName());
                this.newItemCreated.fire(this.model, newField);
                this.itemSelected.fire(this.model, newField);
            }
            else {
                var groupIndex = newField.groupIndex();
                newField['groupDataItems'].forEach((groupItem, index) => {
                    var dataItem = container._createDataItem(groupItem, this.binding);
                    dataItem.groupIndex(groupIndex);
                    if (index === 0) {
                        this.model.uniqueName(dataItem.uniqueName());
                        this.newItemCreated.fire(this.model, groupItem);
                    }
                    else {
                        var model = new data_item_1.DataItemLink(container);
                        model.uniqueName(dataItem.uniqueName());
                        this.newItemCreated.fire(model, groupItem);
                    }
                });
                this.itemSelected.fire(this.model, newField['groupDataItems'][0]);
            }
        }
        else {
            this.newItemCreated.fire(this.model, newField);
            this.itemSelected.fire(this.model, newField);
        }
        additionalFunc();
    }
    _changeExistingField(container, model, newField, additionalFunc) {
        if (!_data_field_1.IsOlapHierarchyField(newField)) {
            container._updateDataItem(model.dataItem(), this.binding, newField, model._specifics.acceptableShapingType);
        }
        else {
            var groupIndex = newField.groupIndex();
            newField['groupDataItems'].forEach((groupItem, index) => {
                if (index === 0) {
                    container._updateDataItem(model.dataItem(), this.binding, groupItem, model._specifics.acceptableShapingType);
                    model.dataItem().groupIndex(groupIndex);
                }
                else {
                    var dataItem = container._createDataItem(groupItem, this.binding);
                    dataItem.groupIndex(groupIndex);
                    var dataItemLink = new data_item_1.DataItemLink(container);
                    dataItemLink.uniqueName(dataItem.uniqueName());
                    this.newItemCreated.fire(dataItemLink, groupItem);
                }
            });
        }
        additionalFunc();
    }
    get commonDataItemTypeConstraint() {
        if (this.binding.dataItemType === 'Dimension') {
            return (field) => _data_field_1.DataField.ifOlapThenOnlyDimension(field) && !(field.isAggregate && field.isAggregate());
        }
        if (this.binding.dataItemType === 'Measure') {
            return (field) => _data_field_1.DataField.ifOlapThenOnlyMeasure(field);
        }
        return () => true;
    }
    get fullConstraint() {
        return (field) => {
            if (!this.commonDataItemTypeConstraint(field))
                return false;
            if (field.isDataFieldNode()) {
                return !this.fieldConstraint || this.fieldConstraint(field);
            }
            else {
                return true;
            }
        };
    }
    dispose() {
        this._disposables.forEach((d) => {
            d.dispose();
        });
    }
}
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], DataItemSurface.prototype, "_changeNewField", null);
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], DataItemSurface.prototype, "_changeExistingField", null);
exports.DataItemSurface = DataItemSurface;
