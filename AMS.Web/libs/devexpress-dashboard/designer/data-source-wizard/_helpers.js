﻿/**
* DevExpress Dashboard (_helpers.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameDataMember = exports.FederationDataSourceAnalyticsWrapper = exports.FederationDataSourceProviderWrapper = exports.getFederationFieldList = exports.createWizardSettings = exports.createDataSourceInfos = exports.addOrUpdateQuery = exports.initialQueryAliasSymbol = exports.toAnalyticsFederationDataSource = exports.toSameSourcesFederationQuery = exports.addSourceIfNotExists = exports.toFederationDataSource = exports.createNewFederationDataSource = exports.getDataSourceInfo = void 0;
const analytics_data_1 = require("@devexpress/analytics-core/analytics-data");
const analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
const analytics_wizard_internal_1 = require("@devexpress/analytics-core/analytics-wizard-internal");
const utils_1 = require("@devexpress/analytics-core/query-builder/dataSource/utils");
const ko = require("knockout");
const _default_1 = require("../../data/localization/_default");
const _utils_1 = require("../../data/_utils");
const model_1 = require("../../model");
const json_data_source_1 = require("../../model/data-sources/json-data-source");
const _helper_classes_1 = require("../../model/internal/_helper-classes");
const _field_list_provider_1 = require("./pages/_field-list-provider");
function getDataSourceInfo(dataSource) {
    let dataSourceInfo = {
        name: dataSource.name(),
        data: null,
        id: dataSource.componentName(),
        isSqlDataSource: dataSource instanceof model_1.SqlDataSource,
        isJsonDataSource: dataSource instanceof json_data_source_1.JsonDataSource,
        isObjectDataSource: dataSource instanceof model_1.ObjectDataSource,
        isFederationDataSource: dataSource instanceof model_1.FederationDataSource,
        isListType: !dataSource.supportDataMembers,
        isSupportQueries: dataSource.supportDataMembers
    };
    return Object.assign(Object.assign({}, dataSourceInfo), { componentName: dataSource.componentName() });
}
exports.getDataSourceInfo = getDataSourceInfo;
function createNewFederationDataSource(federationWizardModel, usedDataSources) {
    let analyticsDataSource = analytics_wizard_1._restoreFederationDataSourceFromState(federationWizardModel, usedDataSources);
    let federationDataSource = toFederationDataSource(analyticsDataSource, usedDataSources());
    federationDataSource.name(_default_1.getLocalizationById('DashboardStringId.DefaultFederationDataSourceName'));
    return federationDataSource;
}
exports.createNewFederationDataSource = createNewFederationDataSource;
function toFederationDataSource(analyticsDataSource, usedDataSources) {
    let federationDataSource = new model_1.FederationDataSource({ '@ItemType': 'FederationDataSource' }, new analytics_utils_1.ModelSerializer());
    analyticsDataSource.sources().forEach(analyticsSource => {
        let source = toFederationSource(analyticsSource, usedDataSources);
        federationDataSource.sources.push(source);
    });
    analyticsDataSource.queries().forEach(analyticsQuery => {
        let query = toSameSourcesFederationQuery(analyticsQuery);
        federationDataSource.queries.push(query);
    });
    return federationDataSource;
}
exports.toFederationDataSource = toFederationDataSource;
function toFederationSource(analyticsSource, usedDataSources) {
    let source = new model_1.Source({ '@ItemType': 'Source' });
    source.name(analyticsSource.sourceName());
    source.dataMember(analyticsSource.dataMember() || '');
    let dataSourceInfoName = getDataSourceName(analyticsSource.sourceName(), analyticsSource.dataMember());
    let dataSourceInfo = usedDataSources.find(dsInfo => dsInfo.name === dataSourceInfoName);
    if (!dataSourceInfo)
        throw new Error(`The dashboard DataSource for SourceName '${analyticsSource.sourceName()}' is not found.`);
    source.dataSource(dataSourceInfo.componentName);
    return source;
}
function getDataSourceName(analyticsSourceName, analyticsDataMember) {
    return analyticsSourceName && analyticsDataMember ? analyticsSourceName.slice(0, -(analyticsDataMember.length + 1)) : analyticsSourceName;
}
function addSourceIfNotExists(analyticsSource, dashboardFederationDataSource, usedDataSources) {
    let existingSource = dashboardFederationDataSource.sources().find(s => s.name() === analyticsSource.sourceName());
    if (existingSource === undefined) {
        let newSource = toFederationSource(analyticsSource, usedDataSources);
        dashboardFederationDataSource.sources.push(newSource);
    }
}
exports.addSourceIfNotExists = addSourceIfNotExists;
function toSameSourcesFederationQuery(analyticsQuery) {
    let analyticsQueryJson = new analytics_utils_1.ModelSerializer().serialize(analyticsQuery);
    return new model_1.QueryNode(analyticsQueryJson);
}
exports.toSameSourcesFederationQuery = toSameSourcesFederationQuery;
function toAnalyticsFederationDataSource(federationDataSource, usedDataSources, dataSourceBrowser) {
    let observableDataSourceInfos = ko.observableArray(usedDataSources);
    let fieldListProvider = new analytics_internal_1.FieldListProvider(pathRequest => getFederationFieldList(pathRequest, dataSourceBrowser), observableDataSourceInfos, [new analytics_wizard_internal_1.FederationDataSourceItemsExtender(observableDataSourceInfos)], true);
    let analyticsFederationDataSource = new FederationDataSourceAnalyticsWrapper(federationDataSource.sources(), observableDataSourceInfos, fieldListProvider);
    analyticsFederationDataSource.name(federationDataSource.name());
    federationDataSource.sources().forEach(source => {
        let analyticsSource = toAnalyticsFederationSource(source);
        analyticsFederationDataSource.sources.push(analyticsSource);
    });
    federationDataSource.queries().forEach(query => {
        let analyticsQuery = toSameSourcesAnalyticsFederationQuery(query, analyticsFederationDataSource);
        analyticsFederationDataSource.queries.push(analyticsQuery);
    });
    return analyticsFederationDataSource;
}
exports.toAnalyticsFederationDataSource = toAnalyticsFederationDataSource;
function toAnalyticsFederationSource(source) {
    let analyticsSource = new analytics_data_1.FederationSource({});
    analyticsSource.dataMember(source.dataMember());
    analyticsSource.sourceName(source.name());
    return analyticsSource;
}
exports.initialQueryAliasSymbol = '__initialQuery';
function toSameSourcesAnalyticsFederationQuery(query, analyticsFederationDataSource) {
    let queryJson = new analytics_utils_1.ModelSerializer().serialize(query);
    let analyticsQuery = analyticsFederationDataSource.createQuery(queryJson);
    analyticsQuery[exports.initialQueryAliasSymbol] = query.alias();
    return analyticsQuery;
}
function addOrUpdateQuery(dashboard, federationDataSource, index, newQuery) {
    _helper_classes_1.Guard.isNotFalsy(newQuery, "'newQuery'");
    _helper_classes_1.Guard.requires(!federationDataSource.queries().some((q, i) => i !== index && q === newQuery));
    let oldQuery = federationDataSource.queries()[index];
    if (oldQuery === newQuery)
        return;
    if (oldQuery)
        federationDataSource.queries.splice(index, 1, newQuery);
    else
        federationDataSource.queries.push(newQuery);
    let nameIndex = 1;
    let baseAlias = newQuery.alias();
    let newQueryAlias = baseAlias;
    while (federationDataSource.queries().find((q, i) => i !== index && q.alias() === newQueryAlias) !== undefined) {
        newQueryAlias = baseAlias + ' ' + nameIndex++;
    }
    newQuery.alias(newQueryAlias);
    if (oldQuery && newQuery.alias() !== oldQuery.alias()) {
        renameDataMember(dashboard, federationDataSource, oldQuery.alias(), newQuery.alias());
    }
}
exports.addOrUpdateQuery = addOrUpdateQuery;
function createDataSourceInfos(dashboardDataSources) {
    let dataSourceInfos = dashboardDataSources.map(ds => getDataSourceInfo(ds));
    let dataSourceInfosByName = new Map();
    for (let info of dataSourceInfos) {
        let inDict = dataSourceInfosByName.get(info.name);
        if (inDict !== undefined)
            inDict.push(info);
        else
            dataSourceInfosByName.set(info.name, [info]);
    }
    dataSourceInfosByName.forEach((infos, name) => {
        for (let i = 1; i < infos.length; i++)
            infos[i].name = name + ' ' + i;
    });
    return dataSourceInfos.map(info => {
        return Object.assign(Object.assign({}, info), { id: info.componentName });
    });
}
exports.createDataSourceInfos = createDataSourceInfos;
function createWizardSettings(publicSettings) {
    return {
        enableSqlDataSource: publicSettings && _utils_1.type.isDefined(publicSettings.enableSqlDataSource) ? publicSettings.enableSqlDataSource : true,
        enableJsonDataSource: publicSettings && _utils_1.type.isDefined(publicSettings.enableJsonDataSource) ? publicSettings.enableJsonDataSource : true,
        enableObjectDataSource: false,
        enableFederationDataSource: publicSettings && _utils_1.type.isDefined(publicSettings.enableFederationDataSource) ? publicSettings.enableFederationDataSource : true,
        enableOlapDataSource: publicSettings && _utils_1.type.isDefined(publicSettings.enableOlapDataSource) ? publicSettings.enableOlapDataSource : true,
    };
}
exports.createWizardSettings = createWizardSettings;
function getFederationFieldList(pathRequest, dataSourceBrowser) {
    return _field_list_provider_1.getFieldList(pathRequest, new _field_list_provider_1.FlatteningDataFieldsProviderWrapper(dataSourceBrowser, field => field && (field.isDataTableNode && field.isDataTableNode() || field.isExpressionsNode && field.isExpressionsNode())), new FederationDataSourceProviderWrapper(dataSourceBrowser), field => field && field.nodeType() !== 'CalculatedDataField');
}
exports.getFederationFieldList = getFederationFieldList;
class FederationDataSourceProviderWrapper {
    constructor(basic) {
        this._basic = basic;
    }
    findDataSource(name) {
        let basicDataSource = this._basic.findDataSource(name);
        return basicDataSource && basicDataSource._isFederationDataProvider ? basicDataSource : undefined;
    }
}
exports.FederationDataSourceProviderWrapper = FederationDataSourceProviderWrapper;
class FederationDataSourceAnalyticsWrapper extends analytics_data_1.FederationDataSource {
    constructor(sources, dataSources, fieldListProvider) {
        super({}, dataSources, fieldListProvider, new analytics_utils_1.ModelSerializer());
        this._sources = sources;
        this._dataSources = dataSources();
    }
    getQueryNameFromPath(path) {
        if (!path)
            return '';
        let pathParts = path.split('.');
        _helper_classes_1.Guard.requires(!!pathParts && !!pathParts.length);
        let dataSourceInfo = this._dataSources.find(x => x.ref == pathParts[0] || x.id == pathParts[0]);
        if (dataSourceInfo === undefined)
            throw new Error(`The dataSource for path '${path}' cannot be found.`);
        let sameDataSourceSources = this._sources.filter(s => s.dataSource() === dataSourceInfo.componentName);
        if (!sameDataSourceSources || sameDataSourceSources.length === 0)
            return super.getQueryNameFromPath(path);
        if (sameDataSourceSources.length === 1) {
            return sameDataSourceSources[0].name();
        }
        else {
            let dataMember = pathParts.slice(1).join('.');
            let source = sameDataSourceSources.find(s => s.dataMember() === dataMember);
            if (source === undefined)
                return super.getQueryNameFromPath(path);
            return source.name();
        }
    }
    getPathFromQueryName(sourceName) {
        let source = this._sources.find(s => s.name() === sourceName);
        if (source === undefined)
            return super.getPathFromQueryName(sourceName);
        return getPath(source);
    }
    createQuery(queryJson) {
        let query = super.createQuery(queryJson);
        if (query.queryType() === utils_1.FederationQueryType[utils_1.FederationQueryType.UnionNode]) {
            query.getQueryNameFromPath = (path) => this.getQueryNameFromPath(path);
            query.getPathFromQueryName = (sourceName) => this.getPathFromQueryName(sourceName);
        }
        return query;
    }
}
exports.FederationDataSourceAnalyticsWrapper = FederationDataSourceAnalyticsWrapper;
function getPath(source) {
    _helper_classes_1.Guard.isNotFalsy(source, 'source');
    return !!source.dataMember() ? source.dataSource() + '.' + source.dataMember() : source.dataSource();
}
function renameDataMember(dashboard, dataSource, oldDataMember, newDataMember) {
    dashboard.items()
        .filter(item => item instanceof model_1.DataDashboardItem
        && item.dataSource() === dataSource.componentName()
        && item.dataMember() === oldDataMember)
        .forEach((item) => {
        item.dataMember(newDataMember);
    });
    dataSource.calculatedFields()
        .filter(calcField => calcField.dataMember() === oldDataMember)
        .forEach(calcField => calcField.dataMember(newDataMember));
    dashboard.parameters()
        .map(parameter => parameter.dynamicListLookUpSettings())
        .filter(lookUpSettings => !!lookUpSettings
        && lookUpSettings.dataSource() === dataSource.componentName()
        && lookUpSettings.dataMember() === oldDataMember)
        .forEach(lookUpSettings => lookUpSettings.dataMember(newDataMember));
    dashboard.colorScheme()
        .filter(entry => entry.dataMember() === oldDataMember)
        .forEach(entry => entry.dataMember(newDataMember));
    dashboard.items()
        .filter(item => item instanceof model_1.DataDashboardItem)
        .map((item) => item.colorScheme())
        .forEach(colorScheme => colorScheme
        .filter(entry => entry.dataMember() === oldDataMember)
        .forEach(entry => entry.dataMember(newDataMember)));
}
exports.renameDataMember = renameDataMember;
