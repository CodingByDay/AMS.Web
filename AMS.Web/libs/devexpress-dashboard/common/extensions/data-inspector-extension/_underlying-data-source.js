﻿/**
* DevExpress Dashboard (_underlying-data-source.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUnderlyingDataSource = void 0;
const custom_store_1 = require("devextreme/data/custom_store");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const notificator_1 = require("../../notification-controller/notificator");
const _inspected_data_colum_generator_1 = require("./_inspected-data-colum-generator");
function generateUnderlyingDataSource(underlyingDataProvider, dashbordItem) {
    const DataFieldPrefix = 'DataField';
    const itemData = dashbordItem._getItemData();
    if (underlyingDataProvider && itemData && !itemData.isEmpty()) {
        let columnsState = {};
        return {
            columns: null,
            customizeColumns: (columns) => {
                columns.forEach(column => {
                    let columnState = columnsState[column.dataField];
                    if (columnState) {
                        column.name = columnState.dataMember;
                        column.caption = columnState.displayName;
                    }
                });
            },
            data: new custom_store_1.default({
                loadMode: 'raw',
                load: () => {
                    return _jquery_helpers_1.$promiseAdapter(underlyingDataProvider.requestUnderlyingData(dashbordItem, {
                        dataMembers: _inspected_data_colum_generator_1.getSortedColumns(itemData)
                    }).then(({ DataMembers, DataMembersDisplayNames, Data, ErrorMessage }) => {
                        if (ErrorMessage) {
                            new Error(ErrorMessage);
                        }
                        DataMembers.forEach((member, index) => {
                            columnsState[DataFieldPrefix + index.toString()] = {
                                dataMember: member,
                                displayName: DataMembersDisplayNames[index] || member,
                            };
                        });
                        const columnTypes = _inspected_data_colum_generator_1.getSortedAxes(itemData)
                            .reduce((acc, axis) => acc.concat(itemData.getDimensions(axis).map(d => {
                            return { dataMember: d.dataMember, dataType: d.dataType };
                        })), []);
                        return Data.map(row => {
                            return DataMembers.reduce((acc, _value, index) => {
                                const currentTypeInfo = columnTypes.find(obj => {
                                    return obj.dataMember === _value;
                                });
                                if (currentTypeInfo && currentTypeInfo['dataType'] === 'Object') {
                                    acc[DataFieldPrefix + index.toString()] = { displayValueAsImage: true, value: row[index] };
                                }
                                else {
                                    acc[DataFieldPrefix + index.toString()] = row[index];
                                }
                                return acc;
                            }, {});
                        });
                    }, result => {
                        throw new Error(notificator_1.NotificationController._getDetailedErrorMessage(result));
                    }));
                }
            })
        };
    }
    else {
        return {
            columns: [],
            customizeColumns: () => { },
            data: [],
        };
    }
}
exports.generateUnderlyingDataSource = generateUnderlyingDataSource;
