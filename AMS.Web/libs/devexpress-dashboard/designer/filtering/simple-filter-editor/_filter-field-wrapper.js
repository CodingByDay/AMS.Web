﻿/**
* DevExpress Dashboard (_filter-field-wrapper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterFieldSelector = void 0;
const ko = require("knockout");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const model_1 = require("../../../model");
const dimension_1 = require("../../../model/data-item/dimension");
const _display_name_provider_1 = require("../../_display-name-provider");
class FilterFieldWrapper {
    constructor(dimension, getDisplayName) {
        this.getDisplayName = getDisplayName;
        this.add = (d) => this._dimensions.push(d);
        this.dataMember = () => this._dimensions[0].dataMember();
        this.displayName = () => this._dimensions.map(d => '[' + this.getDisplayName(d) + ']').join(' - ');
        this.groupIndex = () => this._dimensions[0].groupIndex();
        this.hasItems = (path) => (this.isGroup() && !!path) ? path.length !== this._dimensions.length : this.isGroup();
        this.isGroup = () => this._dimensions.length > 1;
        this.reorder = (dataFields) => {
            if (!dataFields)
                return;
            let newDimensions = [];
            dataFields.forEach(dataField => {
                let dimension = this._dimensions.filter(d => d.dataMember() == dataField.dataMember())[0];
                if (!!dimension) {
                    newDimensions.push(dimension);
                }
            });
            this._dimensions = newDimensions;
        };
        this._dimensions = [dimension];
    }
}
class FilterFieldSelector extends model_1.DisposableObject {
    constructor(dashboardItem, dataSourceBrowser, selectedFieldChanged) {
        super();
        this.dashboardItem = dashboardItem;
        this.dataSourceBrowser = dataSourceBrowser;
        this._selectedField = ko.observable();
        this._fields = ko.observableArray();
        this.template = {
            name: 'dx-simple-filter-data-field-selector',
            data: {
                selectedField: this._selectedField,
                fields: this._fields
            }
        };
        this.toDispose(this._selectedField.subscribe(field => {
            selectedFieldChanged(field);
        }));
    }
    get selectedField() {
        return this._selectedField();
    }
    init() {
        this._loadDataFields().done((fields) => {
            this._selectedField(fields[0]);
            this._fields(fields);
        });
    }
    clear() {
        this._selectedField(null);
    }
    _loadDataFields() {
        let deferred = _jquery_helpers_1.createJQueryDeferred();
        let dimensions = this.dashboardItem._uniqueDataItems.filter(item => item instanceof dimension_1.Dimension);
        let result = this._generateFields(dimensions);
        let findPromises = dimensions.map(dimension => this.dataSourceBrowser.findDataField(this.dashboardItem.dataSource(), this.dashboardItem.dataMember(), dimension.dataMember()));
        _jquery_helpers_1.jqueryWhenArray(findPromises).done((...dataFields) => {
            result.forEach(wrapper => {
                if (wrapper.groupIndex() !== undefined && wrapper.groupIndex() !== null) {
                    let groupedFields = dataFields.filter(dataField => !!dataField && dataField.groupIndex() == wrapper.groupIndex());
                    wrapper.reorder(groupedFields && groupedFields.length > 0 && groupedFields[0].groupDataItems);
                }
            });
            deferred.resolve(result);
        });
        return deferred.promise();
    }
    _generateFields(dimensions) {
        let fields = [];
        return dimensions.reduce((acc, dimension) => {
            if (dimension.groupIndex() !== undefined && dimension.groupIndex() !== null) {
                var groupField = acc.filter(wrapper => wrapper.groupIndex() === dimension.groupIndex())[0];
                if (groupField) {
                    groupField.add(dimension);
                    return acc;
                }
            }
            acc.push(new FilterFieldWrapper(dimension, (dataItem) => _display_name_provider_1.getDataItemDisplayName(this.dataSourceBrowser, this.dashboardItem, dataItem)));
            return acc;
        }, []);
    }
}
exports.FilterFieldSelector = FilterFieldSelector;
