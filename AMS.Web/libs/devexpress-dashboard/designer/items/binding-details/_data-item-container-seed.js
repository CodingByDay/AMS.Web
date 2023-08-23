﻿/**
* DevExpress Dashboard (_data-item-container-seed.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataItemContainerSeed = void 0;
const ko = require("knockout");
const model_1 = require("../../../model");
const _data_field_1 = require("../../../model/data-sources/_data-field");
const data_item_container_1 = require("../../../model/items/data-item-container");
const _base_metadata_1 = require("../../../model/metadata/_base-metadata");
class DataItemContainerSeed extends data_item_container_1.DataItemContainer {
    constructor(dataItemProvider, dataItemType, _fieldConstraint) {
        super();
        this.dataItemType = dataItemType;
        this._fieldConstraint = _fieldConstraint;
        this.name = ko.observable('NewContainer');
        this.dataLink = new model_1.DataItemLink(dataItemProvider);
        this.dataLink.itemType('Seed');
    }
    _getDataId() {
        return null;
    }
    _getContainerType() {
        return 'Stub';
    }
    _getBindingModel() {
        return [{
                propertyName: 'dataLink',
                dataItemType: this.dataItemType,
                emptyPlaceholder: 'Data',
                selectedPlaceholder: 'Configure Data',
                fieldConstraint: this._fieldConstraint
            }];
    }
    grow(dataItemProvider, bindingProperty, dataField) {
        var containerModels = [];
        if (!_data_field_1.IsOlapHierarchyField(dataField)) {
            var cm = bindingProperty.creator(undefined, dataField);
            var dataItem = dataItemProvider._createDataItem(dataField, cm._getBindingModel()[0]);
            let newDataItemBinding = cm._getBindingModel()[0];
            cm[newDataItemBinding.propertyName].uniqueName(dataItem.uniqueName());
            containerModels.push(cm);
        }
        else {
            dataField.groupDataItems.forEach(groupItem => {
                var cm = bindingProperty.creator(undefined, groupItem);
                var dataItem = dataItemProvider._createDataItem(groupItem, cm._getBindingModel()[0]);
                dataItem.groupIndex(dataField.groupIndex());
                let newDataItemBinding = cm._getBindingModel()[0];
                cm[newDataItemBinding.propertyName].uniqueName(dataItem.uniqueName());
                containerModels.push(cm);
            });
        }
        return containerModels;
    }
    _getInfoCore() {
        return [_base_metadata_1.itemType, _base_metadata_1.name];
    }
    _getDefaultItemType() {
        return 'Stub';
    }
}
exports.DataItemContainerSeed = DataItemContainerSeed;
