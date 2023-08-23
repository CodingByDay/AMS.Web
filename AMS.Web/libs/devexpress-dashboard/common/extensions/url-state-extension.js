﻿/**
* DevExpress Dashboard (url-state-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlStateExtension = void 0;
const disposable_object_1 = require("../../model/disposable-object");
const _service_client_1 = require("../_service-client");
const control_options_1 = require("../control-options");
const name = 'urlState';
const nameAlias = 'url-state';
class UrlStateExtension extends disposable_object_1.DisposableObject {
    constructor(dashboardControl, options = {}) {
        super();
        this._dashboardContaierSubscriptions = [];
        this._defaultOptions = {
            includeDashboardIdToUrl: false,
            includeDashboardStateToUrl: false
        };
        this.name = name;
        this._options = Object.assign(Object.assign({}, this._defaultOptions), options);
        this._dashboardControl = dashboardControl;
    }
    start() {
        this.toDispose(this._dashboardControl.dashboardContainer.subscribe(dashboardContainer => {
            this._dashboardContaierSubscriptions.forEach(disposable => disposable.dispose());
            this._dashboardContaierSubscriptions = [];
            this._processDashboardChanged(dashboardContainer);
        }));
        this.toDispose(this._dashboardControl.isDesignMode.subscribe(isDesignMode => {
            this._updateDashboardState();
        }));
        this._processDashboardChanged(this._dashboardControl.dashboardContainer());
    }
    stop() {
        this.dispose();
    }
    _processDashboardChanged(dashboardInfo) {
        if (dashboardInfo) {
            if (this._options.includeDashboardIdToUrl) {
                this._updateUrl('dashboardId', dashboardInfo.id);
            }
            this._updateDashboardState();
            if (!!dashboardInfo.dashboard) {
                this._dashboardContaierSubscriptions.push(dashboardInfo.dashboard._state.subscribe(_ => this._updateDashboardState()));
            }
        }
    }
    _updateDashboardState() {
        var dashboard = this._dashboardControl.dashboardContainer() && this._dashboardControl.dashboardContainer().dashboard || null;
        var state = dashboard && !this._dashboardControl.isDesignMode() ? dashboard.stateString : null;
        if (this._options.includeDashboardStateToUrl) {
            this._updateUrl('dashboardState', state);
        }
    }
    _updateUrl(key, value) {
        var newUrl = this._replaceValue(key, value);
        if (newUrl) {
            if (newUrl.length > _service_client_1.ViewerDataServiceClient.maxQueryStringLength) {
                newUrl = this._replaceValue(key, null);
            }
            this._setUrl(newUrl);
        }
    }
    _replaceValue(key, value) {
        var uri = this._getUrl();
        var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
        var separator = uri.indexOf('?') !== -1 ? '&' : '?';
        var newParameterValue = value ? key + '=' + encodeURIComponent(value) : '';
        if (uri.match(re)) {
            var separator = !!newParameterValue ? '$1' : '';
            return uri.replace(re, separator + newParameterValue + '$2');
        }
        else if (!!newParameterValue) {
            return uri + separator + newParameterValue;
        }
        else {
            return uri;
        }
    }
    _getUrl() {
        return location.href;
    }
    _setUrl(url) {
        if (!url)
            url = location.pathname;
        history.replaceState({}, '', url);
    }
}
exports.UrlStateExtension = UrlStateExtension;
control_options_1.defaultExtensions[nameAlias] = (dashboardControl, options) => new UrlStateExtension(dashboardControl, options);
control_options_1.extensionNameMap[nameAlias] = name;
