﻿/**
* DevExpress Dashboard (choose-olap-connection-string-page.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._registerOlapConnectionStringsPage = exports.DashboardChooseOlapConnectionStringPage = void 0;
const analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
const ko = require("knockout");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const page_id_1 = require("./page-id");
class DashboardChooseOlapConnectionStringPage extends analytics_wizard_1.WizardPageBase {
    constructor(connectionStrings) {
        super();
        this._selectedConnectionString = ko.observableArray([]);
        this._connectionStrings = connectionStrings;
        this._disposables.push(this._selectedConnectionString.subscribe(() => this._onChange()));
    }
    canNext() {
        return false;
    }
    canFinish() {
        return this._selectedConnectionString().length !== 0;
    }
    commit() {
        var deferred = _jquery_helpers_1.createJQueryDeferred();
        if (this._selectedConnectionString()[0]) {
            deferred.resolve({
                connectionName: this._selectedConnectionString()[0].name
            });
        }
        else {
            deferred.resolve();
        }
        return deferred.promise();
    }
    initialize(state) {
        if (this._connectionStrings && this._connectionStrings.length === 1) {
            this._selectedConnectionString([this._connectionStrings[0]]);
        }
        else if (this._connectionStrings && this._connectionStrings.length > 0) {
            let matchingStrings = this._connectionStrings.filter(c => c.name == state.connectionName);
            var selectedString = matchingStrings.length > 0 ? matchingStrings[0] : this._connectionStrings[0];
            this._selectedConnectionString(selectedString ? [selectedString] : []);
        }
        else {
            this._selectedConnectionString([]);
        }
        return _jquery_helpers_1.createJQueryDeferred().resolve().promise();
    }
}
exports.DashboardChooseOlapConnectionStringPage = DashboardChooseOlapConnectionStringPage;
function _registerOlapConnectionStringsPage(factory, connectionStrings) {
    let sqlConnectionStringsMeta = factory.getMetadata(analytics_wizard_1.SqlDataSourceWizardPageId.ChooseConnectionPage);
    if (!sqlConnectionStringsMeta) {
        analytics_wizard_1._registerChooseSqlConnectionPage(factory, undefined);
        sqlConnectionStringsMeta = factory.getMetadata(analytics_wizard_1.SqlDataSourceWizardPageId.ChooseConnectionPage);
        factory.unregisterMetadata(analytics_wizard_1.SqlDataSourceWizardPageId.ChooseConnectionPage);
    }
    factory.registerMetadata(page_id_1.OlapDataSourceWizardPageId.ChooseConnectionPage, {
        create: () => {
            return new DashboardChooseOlapConnectionStringPage(connectionStrings);
        },
        setState: (result, state) => {
            state.connectionName = result.connectionName;
        },
        getState: (state) => {
            return state.olapDataSourceWizard;
        },
        resetState: (state, defaultState) => {
            state.connectionName = defaultState.connectionName;
        },
        template: sqlConnectionStringsMeta.template,
        description: sqlConnectionStringsMeta.description
    });
}
exports._registerOlapConnectionStringsPage = _registerOlapConnectionStringsPage;
