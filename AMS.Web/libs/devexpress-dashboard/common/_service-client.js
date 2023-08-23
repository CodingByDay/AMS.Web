﻿/**
* DevExpress Dashboard (_service-client.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignerDataServiceClient = exports.ViewerDataServiceClient = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _jquery_helpers_1 = require("../data/_jquery-helpers");
const _default_1 = require("../data/localization/_default");
const data_dashboard_item_1 = require("../model/items/data-dashboard-item");
const parameter_1 = require("../model/parameters/parameter");
const _helpers_1 = require("./_helpers");
class ViewerDataServiceClient {
    constructor(_dashboardContainer, _errorHandler, _dataServiceUrls, _remoteService) {
        this._dashboardContainer = _dashboardContainer;
        this._errorHandler = _errorHandler;
        this._dataServiceUrls = _dataServiceUrls;
        this._remoteService = _remoteService;
        this.getColoringScheme = (itemName = '') => {
            throw new Error(_default_1.getLocalizationById('DashboardWebStringId.Notification.MethodIsNotAllowedInViewerMode'));
        };
        this.getDashboardPalette = () => {
            throw new Error(_default_1.getLocalizationById('DashboardWebStringId.Notification.MethodIsNotAllowedInViewerMode'));
        };
        this.getAvailableFontFamilies = () => {
            throw new Error(_default_1.getLocalizationById('DashboardWebStringId.Notification.MethodIsNotAllowedInViewerMode'));
        };
        this.getItemData = (item, isModeAllowsToReduceData) => {
            return this._performRequest(this._dataServiceUrls.DashboardItemGetAction, {
                itemId: item.componentName(),
                query: this._getItemDataQuery(item, isModeAllowsToReduceData)
            });
        };
        this.getBatchItemData = (items, isModeAllowsToReduceData) => {
            return this._performRequest(this._dataServiceUrls.DashboardItemBatchGetAction, {
                items: items.reduce((acc, item) => {
                    acc[item.componentName()] = this._getItemDataQuery(item, isModeAllowsToReduceData);
                    return acc;
                }, {})
            });
        };
        this.getMapShapeFile = (itemName) => {
            return this._performRequest(this._dataServiceUrls.GetMapShapeFileAction, {
                itemId: itemName
            });
        };
        this.getUnderlyingData = (itemName, columnValues, rowValues, columnNames, dataQueryParams) => {
            return this._performRequest(this._dataServiceUrls.GetUnderlyingDataAction, {
                itemId: itemName,
                query: dataQueryParams,
                columnValues: columnValues,
                rowValues: rowValues,
                columnNames: columnNames
            });
        };
        this.markDataSourcesForReload = () => {
            const requestArgs = {
                dashboardId: this._dashboardContainer.id
            };
            this._ensureClientServerContract(requestArgs);
            return this._remoteService.postToServer(this._dataServiceUrls.MarkDataSourcesForReloadAction, requestArgs);
        };
    }
    getParameterValues(dataSourceId, dataSource, dataMember, valueMember, displayMember, sortOrder, sortByMember, parameterType) {
        return this._performRequest(this._dataServiceUrls.ParameterValuesAction, {
            dataSourceId: dataSourceId,
            dataMember: dataMember,
            valueMember: valueMember,
            displayMember: displayMember,
            sortOrder: sortOrder,
            sortByMember: sortByMember,
            parameterType: parameterType
        })
            .fail((request) => this._errorHandler.showError(_default_1.getLocalizationById('DashboardWebStringId.Notification.AttemptToLoadParameterValues') + (dataSource && dataSource.name() || dataSourceId), request));
    }
    performExport(exportInfo, exportModels) {
        var commonArgs = this._createCommonArgs();
        this._ensureClientServerContract(commonArgs);
        var args = Object.assign(Object.assign({ model: exportModels }, exportInfo), commonArgs);
        this._remoteService.performPostback(this._dataServiceUrls.PerformExportAction, args)
            .fail((response) => this._errorHandler.showError(_default_1.getLocalizationById('DashboardWebStringId.Notification.AttemptToPerformExport'), response));
        return;
    }
    getDimensionUniqueValues(dataSource, dataMember, dimension) {
        throw new Error(_default_1.getLocalizationById('DashboardWebStringId.Notification.MethodIsNotAllowedInViewerMode'));
    }
    getDimensionFilterItems(dashboardItem, dimensionDataMember, previousState, branch) {
        throw new Error(_default_1.getLocalizationById('DashboardWebStringId.Notification.MethodIsNotAllowedInViewerMode'));
    }
    getDimensionFilterString(dashboardItem, dimensionDataMember, previousState) {
        throw new Error(_default_1.getLocalizationById('DashboardWebStringId.Notification.MethodIsNotAllowedInViewerMode'));
    }
    getFieldList(dataSource, dataMember, fieldPath) {
        throw new Error(_default_1.getLocalizationById('DashboardWebStringId.Notification.MethodIsNotAllowedInViewerMode'));
    }
    convertItem(item, destinationItemTypeName) {
        throw new Error(_default_1.getLocalizationById('DashboardWebStringId.Notification.MethodIsNotAllowedInViewerMode'));
    }
    _getItemDataQuery(item, isModeAllowsToReduceData) {
        let dataQueryParams = _jquery_helpers_1.deepExtend({}, item._getDataQueryParams());
        let isDataItem = item instanceof data_dashboard_item_1.DataDashboardItem;
        if (isDataItem && isModeAllowsToReduceData && item._limitDataState.enabled) {
            dataQueryParams.LimitVisibleData = true;
        }
        return dataQueryParams;
    }
    _queryParamsToQueryString(dataQueryParams) {
        var urlQuery = {};
        if (dataQueryParams) {
            Object.keys(dataQueryParams).forEach(name => {
                var value = ko.unwrap(dataQueryParams[name]);
                if (!!value) {
                    if (typeof value === 'object') {
                        if (Object.keys(value).length > 0) {
                            urlQuery[name] = JSON.stringify(value);
                        }
                    }
                    else {
                        urlQuery[name] = value;
                    }
                }
            });
        }
        return Object.keys(urlQuery).length === 0 ? '' : _jquery_helpers_1.jqueryQueryParam(urlQuery);
    }
    _createCommonArgs() {
        return {
            dashboardId: this._dashboardContainer.id,
            parameters: parameter_1._getParametersQuery(this._dashboardContainer.dashboard.parameters())
        };
    }
    _performRequest(url, requestArgs) {
        var commonArgs = this._createCommonArgs();
        Object.keys(requestArgs).forEach(argsKey => {
            if (commonArgs[argsKey]) {
                throw Error(`The '${argsKey}' request argument key is reserved for common event args`);
            }
            else {
                commonArgs[argsKey] = requestArgs[argsKey];
            }
        });
        this._ensureClientServerContract(commonArgs);
        return this._performRequestCore(url, commonArgs);
    }
    _performRequestCore(url, params) {
        var queryString = this._queryParamsToQueryString(params);
        if (queryString) {
            var urlSeparator = url.indexOf('?') == -1 ? '?' : '&';
            queryString = urlSeparator + queryString;
        }
        var fullUrl = url + queryString;
        if (fullUrl.length < ViewerDataServiceClient.maxQueryStringLength) {
            return this._remoteService.getFromServer(fullUrl);
        }
        else {
            return this._remoteService.postToServer(url, params);
        }
    }
    _ensureClientServerContract(requestParams) {
        if (_helpers_1.requestParamsValidator.isValid(requestParams)) {
            requestParams.dashboardId = String(requestParams.dashboardId);
        }
        else {
            console.error(`Incorrect type of 'dashboardId' option: ${typeof requestParams.dashboardId}`);
        }
    }
}
exports.ViewerDataServiceClient = ViewerDataServiceClient;
ViewerDataServiceClient.maxQueryStringLength = 2000;
class DesignerDataServiceClient extends ViewerDataServiceClient {
    constructor(_dashboardContainer, _errorHandler, _dataServiceUrls, _remoteService) {
        super(_dashboardContainer, _errorHandler, _dataServiceUrls, _remoteService);
        this.getColoringScheme = (itemName = '') => {
            return this._performRequest(this._dataServiceUrls.GetColoringSchemeAction, {
                itemId: itemName,
                query: itemName ? this._dashboardContainer.dashboard._findDataItem(itemName)._getDataQueryParams() : {}
            })
                .fail(request => { this._errorHandler.showError(_default_1.getLocalizationById('DashboardWebStringId.Notification.AttemptToGetColorScheme'), request); });
        };
        this.getDashboardPalette = () => {
            const requestArgs = {
                dashboardId: this._dashboardContainer.id
            };
            this._ensureClientServerContract(requestArgs);
            return this._remoteService.postToServer(this._dataServiceUrls.GetDashboardPaletteAction, requestArgs);
        };
        this.getAvailableFontFamilies = () => {
            const requestArgs = {
                dashboardId: this._dashboardContainer.id
            };
            this._ensureClientServerContract(requestArgs);
            return this._remoteService.getFromServer(this._dataServiceUrls.GetAvailableFontFamiliesAction, requestArgs);
        };
    }
    convertItem(item, destinationItemTypeName) {
        return this._performRequest(this._dataServiceUrls.ConvertItemAction, {
            itemId: item.componentName(),
            destinationItemTypeName: destinationItemTypeName
        })
            .fail((request) => { this._errorHandler.showError(_default_1.getLocalizationById('DashboardWebStringId.Notification.AttemptToConvertItemToType') + destinationItemTypeName, request); });
    }
    getDimensionUniqueValues(dataSource, dataMember, dimension) {
        return this._performRequest(this._dataServiceUrls.DimensionUniqueValuesAction, {
            dataSourceId: dataSource.componentName(),
            dimension: new analytics_utils_1.ModelSerializer({ useRefs: false }).serialize(dimension),
            dataMember: dataMember,
        })
            .fail((request) => { this._errorHandler.showError(_default_1.getLocalizationById('DashboardWebStringId.Notification.AttemptToLoadDimensionUniqueValues') + dataSource.name(), request); });
    }
    getDimensionFilterItems(item, dimensionDataMember, previousState, branch) {
        return this._performRequest(this._dataServiceUrls.DimensionFilterItemsAction, {
            itemId: item.componentName(),
            query: item._getDataQueryParams(),
            dimensionDataMember: dimensionDataMember,
            previousState: previousState,
            branch: branch
        });
    }
    getDimensionFilterString(item, dimensionDataMember, previousState) {
        return this._performRequest(this._dataServiceUrls.DimensionFilterStringAction, {
            itemId: item.componentName(),
            query: item._getDataQueryParams(),
            dimensionDataMember: dimensionDataMember,
            previousState: previousState,
            branch: null
        });
    }
    getFieldList(dataSource, dataMember, fieldPath) {
        return this._performRequest(this._dataServiceUrls.FieldListAction, {
            dataSourceId: dataSource.componentName(),
            dataMember: dataMember,
            fieldPath: fieldPath
        })
            .fail(request => { this._errorHandler.showError(_default_1.getLocalizationById('DashboardWebStringId.Notification.AttemptToLoadFieldListForDataSource') + dataSource.name(), request); });
    }
    _createCommonArgs() {
        return {
            dashboardId: this._dashboardContainer.id,
            dashboard: this._dashboardContainer.dashboard.getJSON(),
            parameters: parameter_1._getParametersQuery(this._dashboardContainer.dashboard.parameters())
        };
    }
    _performRequestCore(url, data) {
        return this._remoteService.postToServer(url, data);
    }
}
exports.DesignerDataServiceClient = DesignerDataServiceClient;
