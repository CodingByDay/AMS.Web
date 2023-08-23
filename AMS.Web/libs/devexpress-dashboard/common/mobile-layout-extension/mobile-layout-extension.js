﻿/**
* DevExpress Dashboard (mobile-layout-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileLayoutExtension = void 0;
const devices_1 = require("devextreme/core/devices");
const dialog_1 = require("devextreme/ui/dialog");
const ko = require("knockout");
const _default_1 = require("../../data/localization/_default");
const _knockout_utils_1 = require("../../model/internal/_knockout-utils");
const control_options_1 = require("../control-options");
const _options_manager_1 = require("../internal/_options-manager");
const _mobile_layout_1 = require("./_mobile-layout");
const name = 'mobileLayout';
const nameAlias = 'mobile-layout';
class MobileLayoutExtension {
    constructor(dashboardControl, options) {
        this.dashboardControl = dashboardControl;
        this.name = name;
        this._disposables = [];
        this._optionsManager = new _options_manager_1.OptionsManager();
        this._mobileLayoutEnabledOption = ko.observable();
        this._defaultOptions = {
            mobileLayoutEnabled: 'Auto'
        };
        this._mobileLayoutTemplateName = 'dx-dashboard-mobile-layout';
        this._dashboardList = [];
        this._optionsManager.initialize({
            extensionName: name,
            dashboardControl: dashboardControl,
            defaultOptions: this._defaultOptions,
            initOptions: options,
            optionChanged: (args) => this._optionChanged(args)
        });
        this._mobileLayoutEnabledOption(this._optionsManager.get('mobileLayoutEnabled'));
        this._canMobileLayoutBeEnabled = _knockout_utils_1.safeComputed({ isDesignMode: this.dashboardControl.isDesignMode }, (args) => !args.isDesignMode);
        this._isMobileLayoutModeExpected = _knockout_utils_1.safeComputed({ mobileLayoutEnabled: this._mobileLayoutEnabledOption }, (args) => {
            if (args.mobileLayoutEnabled === 'Always') {
                return true;
            }
            else if (args.mobileLayoutEnabled === 'Never') {
                return false;
            }
            else {
                return devices_1.default.current().phone;
            }
        });
        this.mobileLayoutEnabled = _knockout_utils_1.safeComputed({
            canMobileLayoutBeEnabled: this._canMobileLayoutBeEnabled,
            isMobileLayoutModeExpected: this._isMobileLayoutModeExpected
        }, (args) => {
            if (args.canMobileLayoutBeEnabled) {
                return args.isMobileLayoutModeExpected;
            }
            else {
                return false;
            }
        });
    }
    _optionChanged(args) {
        switch (args.name) {
            case 'mobileLayoutEnabled':
                this._mobileLayoutEnabledOption(args.value);
                return 'reinitializeDashboard';
            default:
                return null;
        }
    }
    start() {
        setTimeout(() => {
            if (this._isMobileLayoutModeExpected() && !this._canMobileLayoutBeEnabled()) {
                dialog_1.confirm(_default_1.getLocalizationById('DashboardWebStringId.MobileLayout.SwitchToViewer'), '').then((res) => {
                    if (res) {
                        this.dashboardControl.switchToViewer();
                    }
                });
            }
        });
        var layoutController = _knockout_utils_1.safeComputed({
            dashboard: this.dashboardControl.dashboard,
            mobileLayoutEnabled: this.mobileLayoutEnabled
        }, (args) => {
            if (args.dashboard && args.mobileLayoutEnabled) {
                return new _mobile_layout_1.DashboardMobileLayoutController(args.dashboard, this.dashboardControl._dashboardContext, (name) => this.dashboardControl.findExtension(name), this.dashboardControl.encodeHtml, this.dashboardControl._viewerApi);
            }
            return null;
        });
        this._disposables.push(layoutController);
        this.dashboardControl._layoutInfoProviderCollection.splice(0, 0, {
            condition: () => this.mobileLayoutEnabled(),
            name: this._mobileLayoutTemplateName,
            getViewModel: () => _knockout_utils_1.safeComputed({ layoutController }, args => ({ componentArgs: args.layoutController })),
            getLayoutController: () => layoutController
        });
        this.dashboardControl._updateLayout();
        this.mobileLayoutEnabled.subscribe(_ => {
            this.dashboardControl._updateLayout();
        });
    }
    stop() {
        this._disposables.forEach(d => d.dispose());
    }
}
exports.MobileLayoutExtension = MobileLayoutExtension;
control_options_1.defaultExtensions[nameAlias] = (dashboardControl, options) => new MobileLayoutExtension(dashboardControl, options);
control_options_1.extensionNameMap[nameAlias] = name;
