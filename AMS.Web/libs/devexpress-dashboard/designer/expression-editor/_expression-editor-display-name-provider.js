﻿/**
* DevExpress Dashboard (_expression-editor-display-name-provider.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionEditorDisplayNameProvider = void 0;
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const ef_data_source_1 = require("../../model/data-sources/ef-data-source");
const object_data_source_1 = require("../../model/data-sources/object-data-source");
const xpo_data_source_1 = require("../../model/data-sources/xpo-data-source");
class ExpressionEditorDisplayNameProvider {
    constructor(_dataFieldsProvider, _dataSourceName, _dataMember) {
        this._dataFieldsProvider = _dataFieldsProvider;
        this._dataSourceName = _dataSourceName;
        this._dataMember = _dataMember;
    }
    static create(dataSourceProvider, dataFieldsProvider, dataSourceName, dataMember) {
        var dataSource = dataSourceProvider.findDataSource(dataSourceName);
        if (dataSource instanceof object_data_source_1.ObjectDataSource || dataSource instanceof xpo_data_source_1.XpoDataSource || dataSource instanceof ef_data_source_1.EFDataSource) {
            return new ExpressionEditorDisplayNameProvider(dataFieldsProvider, dataSourceName, dataMember);
        }
        return null;
    }
    getDisplayNameByPath(dataSourcePath, fieldPath) {
        let parts = fieldPath.split('.');
        let result = null;
        let curPath = null;
        for (let i = 0; i < parts.length; i++) {
            curPath = curPath ? curPath + '.' + parts[i] : parts[i];
            let closedCurPath = curPath;
            let addCurDisplayPart = (curDisplayPath) => this._dataFieldsProvider.findDataField(this._dataSourceName, this._dataMember, closedCurPath)
                .then(dataField => {
                let def = _jquery_helpers_1.createJQueryDeferred();
                if (!dataField)
                    def.reject(fieldPath);
                else {
                    let displayName = dataField.displayName() || dataField.dataMember();
                    def.resolve(curDisplayPath ? curDisplayPath + '.' + displayName : displayName);
                }
                return def.promise();
            }, () => fieldPath);
            result = result ? result.then(addCurDisplayPart) : addCurDisplayPart('');
        }
        let removeRejection = (result) => _jquery_helpers_1.createJQueryDeferred().resolve(result).promise();
        return result.then(removeRejection, removeRejection);
    }
    getRealName(dataSourcePath, fieldDisplayPath) {
        return this._getRealNameRecursive('', fieldDisplayPath.split('.'))
            .then(dataMember => _jquery_helpers_1.createJQueryDeferred().resolve(dataMember ? dataMember : fieldDisplayPath).promise());
    }
    _getRealNameRecursive(curFieldPath, displayNameParts) {
        return this._dataFieldsProvider.getDataFieldsArray(this._dataSourceName, this._dataMember, curFieldPath, _ => true).then(dataFieldList => {
            let i = 0;
            let dataField;
            for (; i <= displayNameParts.length; i++) {
                const displayName = displayNameParts.slice(0, i).join('.');
                dataField = dataFieldList.filter(dataField => dataField.displayName() === displayName)[0];
                if (dataField)
                    break;
            }
            if (!dataField)
                return;
            if (i === displayNameParts.length)
                return dataField.dataMember();
            return this._getRealNameRecursive(dataField.dataMember(), displayNameParts.slice(i));
        });
    }
}
exports.ExpressionEditorDisplayNameProvider = ExpressionEditorDisplayNameProvider;
