/**
* DevExpress Dashboard (available-font-families-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableFontFamiliesExtension = void 0;
const ko = require("knockout");
const common_1 = require("../../common");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const index_internal_1 = require("../../data/index.internal");
const model_1 = require("../../model");
const index_internal_2 = require("../../model/index.internal");
const name = 'availableFontFamilies';
const nameAlias = 'available-font-families';
class AvailableFontFamiliesExtension extends model_1.DisposableObject {
    constructor(dashboardControl) {
        super();
        this.dashboardControl = dashboardControl;
        this.name = name;
        this.fontFamilies = ko.observableArray();
        this._disposables = [];
        this._isDataLoadingStarted = false;
    }
    start() {
        this._isDesignModeSubscription = index_internal_2.subscribeAndPerform(this.dashboardControl.isDesignMode, (isDesignMode => {
            if (isDesignMode) {
                this._rootSubscription = index_internal_2.subscribeAndPerform(this.dashboardControl.dashboard, (dashboard => {
                    this._dispose();
                    if (dashboard) {
                        const addRuleHandler = (rule) => {
                            if (!this._isDataLoadingStarted && !this.fontFamilies.length) {
                                this._isDataLoadingStarted = true;
                                this._loadAvailableFontFamilies().then(fonts => {
                                    this.fontFamilies(fonts);
                                });
                            }
                            const condition = rule.condition();
                            condition._getAvailableFontFamilies = () => this.fontFamilies;
                        };
                        const addItemHandler = (item) => {
                            if (this._isAppearanceItem(item)) {
                                item.formatRules().forEach(rule => {
                                    addRuleHandler(rule);
                                });
                                const subscription = index_internal_2.subscribeArrayChange(item.formatRules, { added: addRuleHandler });
                                this._disposables.push(subscription);
                                return subscription;
                            }
                            return ko.computed(() => { });
                        };
                        dashboard.items().forEach(item => {
                            if (this._isAppearanceItem(item)) {
                                addItemHandler(item);
                            }
                        });
                        this._disposables.push(index_internal_2.subscribeToArrayItemProperties(dashboard.items, addItemHandler));
                    }
                }));
            }
            else {
                this._dispose();
                this._rootSubscription && this._rootSubscription.dispose();
            }
        }));
    }
    stop() {
        this._dispose();
        this._isDesignModeSubscription.dispose();
        this._rootSubscription.dispose();
    }
    _dispose() {
        this._disposables.forEach(disposable => disposable.dispose());
        this._disposables = [];
    }
    _isAppearanceItem(item) {
        return item instanceof model_1.GridItem
            || item instanceof model_1.PivotItem
            || item instanceof model_1.CardItem;
    }
    _loadAvailableFontFamilies() {
        if (this.dashboardControl._serviceClient()) {
            this._isDataLoadingStarted = true;
            return this.dashboardControl._serviceClient().getAvailableFontFamilies().then(fonts => fonts, error => {
                this.dashboardControl.notificationController.showError(index_internal_1.getLocalizationById('DashboardWebStringId.Notification.AttemptToLoadAvailableFontFamilies'));
                return [];
            });
        }
        return _jquery_helpers_1.createJQueryDeferred().reject([]);
    }
}
exports.AvailableFontFamiliesExtension = AvailableFontFamiliesExtension;
common_1.designerExtensions[nameAlias] = (dashboardControl, options) => new AvailableFontFamiliesExtension(dashboardControl);
common_1.extensionNameMap[nameAlias] = name;
