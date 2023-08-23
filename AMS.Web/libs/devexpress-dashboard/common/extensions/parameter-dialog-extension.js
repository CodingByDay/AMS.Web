﻿/**
* DevExpress Dashboard (parameter-dialog-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardParameterDialogExtension = void 0;
const ko = require("knockout");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const disposable_object_1 = require("../../model/disposable-object");
const _obsolete_helper_1 = require("../../model/internal/_obsolete-helper");
const _dashboard_layout_mode_helper_1 = require("../../viewer-parts/_dashboard-layout-mode-helper");
const _parameters_dialog_1 = require("../../viewer-parts/widgets/dialogs/_parameters-dialog");
const control_options_1 = require("../control-options");
const _options_manager_1 = require("../internal/_options-manager");
const _parameter_dialog_binder_1 = require("./_parameter-dialog-binder");
const name = 'dashboardParameterDialog';
const nameAlias = 'dashboard-parameter-dialog';
class DashboardParameterDialogExtension extends disposable_object_1.DisposableObject {
    constructor(dashboardControl, options) {
        super();
        this._customDialogContent = [];
        this._optionsManager = new _options_manager_1.OptionsManager();
        this.name = name;
        this.showDialogButton = ko.observable(true);
        this._updateViewModel = (dashboard) => {
            this._clear();
            if (!!dashboard) {
                this._viewModel = new _parameter_dialog_binder_1.ParameterDialogViewModel(dashboard.parameters, (parameterType, settings) => this._dashboardControl._dataSourceBrowser.getParameterValues(parameterType, settings));
                this._viewModel.parameterCollection.subscribe((value) => {
                    this._clearContent();
                    this._customDialogContent.concat(this._parameterDialog)
                        .filter(dialog => dialog && dialog.setActualState)
                        .forEach(dialog => dialog.setActualState());
                });
            }
        };
        this._optionsManager.initialize({
            extensionName: name,
            dashboardControl: dashboardControl,
            defaultOptions: {},
            eventsHolder: this,
            initOptions: options,
            optionChanged: (args) => null
        });
        this._dashboardControl = dashboardControl;
        this._onShowing = this._optionsManager.getInitialOptions().onShowing || (() => { });
        this._onShown = this._optionsManager.getInitialOptions().onShown || (() => { });
        this._onHidden = this._optionsManager.getInitialOptions().onHidden || (() => { });
    }
    get onShowing() {
        return this._onShowing;
    }
    set onShowing(value) {
        if (this._onShowing) {
            this.off('showing', this._onShowing);
        }
        this._onShowing = value;
        this.on('showing', value);
    }
    get onShown() {
        return this._onShown;
    }
    set onShown(value) {
        if (this._onShown) {
            this.off('shown', this._onShown);
        }
        this._onShown = value;
        this.on('shown', value);
    }
    get onHidden() {
        return this._onHidden;
    }
    set onHidden(value) {
        if (this._onHidden) {
            this.off('hidden', this._onHidden);
        }
        this._onHidden = value;
        this.on('hidden', value);
    }
    start() {
        if (this._dashboardControl.dashboard()) {
            this._updateViewModel(this._dashboardControl.dashboard());
            this._subscribeDynamicLookUpValuesLoaded();
        }
        this.toDispose(this._dashboardControl.dashboard.subscribe(newDashboard => this._updateViewModel(newDashboard)));
        this.toDispose(this._dashboardControl.dashboard.subscribe(() => this._subscribeDynamicLookUpValuesLoaded()));
        _obsolete_helper_1.defineObsoleteMethod({
            target: this,
            memberName: 'showDialog',
            oldMemberDisplayName: 'DashboardParameterDialogExtension.showDialog',
            newMemberDisplayName: 'DashboardParameterDialogExtension.show',
            action: () => this.show()
        });
        _obsolete_helper_1.defineObsoleteMethod({
            target: this,
            memberName: 'hideDialog',
            oldMemberDisplayName: 'DashboardParameterDialogExtension.hideDialog',
            newMemberDisplayName: 'DashboardParameterDialogExtension.hide',
            action: () => this.hide()
        });
    }
    stop() {
        this._clear();
        this.dispose();
    }
    show() {
        if (this._parameterDialog) {
            this._parameterDialog.dispose();
        }
        this._parameterDialog = this._createParameterDialog();
        this._parameterDialog.show();
    }
    hide() {
        if (!!this._parameterDialog) {
            this._parameterDialog.hide();
        }
    }
    subscribeToContentChanges(callback) {
        return this._viewModel.parameterCollection.subscribe(callback);
    }
    getParameters() {
        return this._getParameters();
    }
    _getParameters() {
        if (!this._viewModel)
            throw 'Dashboard is not loaded';
        return this._viewModel.parameterCollection();
    }
    renderContent(element) {
        var customParameterDialog = this._createParameterDialog();
        this._customDialogContent.push(customParameterDialog);
        return customParameterDialog.generateContent(_jquery_helpers_1.$unwrap(element), () => {
            this._customDialogContent.splice(this._customDialogContent.indexOf(customParameterDialog), 1);
        });
    }
    _createParameterDialog() {
        return new _parameters_dialog_1.parametersDialog({
            parametersDialogContainer: _dashboard_layout_mode_helper_1.DashboardLayoutModeHelper.isMobile ? window.document.body : this._dashboardControl.getWidgetContainer(),
            getParametersCollection: () => this._getParameters(),
            submitParameters: (newParameters) => {
                var _a;
                (_a = this._dashboardControl._dataSourceBrowser) === null || _a === void 0 ? void 0 : _a.clearDimensionValuesCache();
                this._viewModel.parameterCollection.peek().setParameters(newParameters);
            },
            onShowing: (args) => this._optionsManager.raiseEvent('showing', args),
            onShown: (args) => this._optionsManager.raiseEvent('shown', args),
            onHidden: (args) => this._optionsManager.raiseEvent('hidden', args)
        });
    }
    _clearContent() {
        this._customDialogContent.forEach(dialog => dialog.dispose());
        this._customDialogContent = [];
    }
    _clear() {
        this._clearContent();
        if (this._parameterDialog) {
            this._parameterDialog.dispose();
            this._parameterDialog = undefined;
        }
        if (this._viewModel) {
            this._viewModel.dispose();
            this._viewModel = undefined;
        }
    }
    _subscribeDynamicLookUpValuesLoaded() {
        var dataSourceBrowser = this._dashboardControl._dataSourceBrowser;
        if (dataSourceBrowser) {
            dataSourceBrowser.dynamicLookUpValuesLoaded = (dynamicListLookUpSettings) => {
                this._dashboardControl
                    .dashboard()
                    .parameters()
                    .filter(param => {
                    return param.dynamicListLookUpSettings() && param.dynamicListLookUpSettings().equals(dynamicListLookUpSettings);
                })
                    .map(param => param.name())
                    .forEach(paramName => {
                    this._optionsManager.raiseEvent('dynamicLookUpValuesLoaded', { parameterName: paramName });
                });
            };
        }
    }
}
exports.DashboardParameterDialogExtension = DashboardParameterDialogExtension;
control_options_1.defaultExtensions[nameAlias] = (dashboardControl, options) => new DashboardParameterDialogExtension(dashboardControl, options);
control_options_1.extensionNameMap[nameAlias] = name;
