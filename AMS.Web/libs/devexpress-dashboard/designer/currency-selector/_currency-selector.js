﻿/**
* DevExpress Dashboard (_currency-selector.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencySelector = exports.CultureInfo = exports.CurrencyInfo = void 0;
const ko = require("knockout");
const _default_1 = require("../../data/localization/_default");
const _format_helper_1 = require("../../data/_format-helper");
const _knockout_utils_1 = require("../../model/internal/_knockout-utils");
const _currencies_1 = require("./_currencies");
class CurrencyInfo {
    constructor(name, displayText, previewText = '') {
        this.name = name;
        this.displayText = displayText;
        this.previewText = previewText;
    }
}
exports.CurrencyInfo = CurrencyInfo;
class CultureInfo {
}
exports.CultureInfo = CultureInfo;
class CurrencySelector {
    constructor(currencyCultureName, disabled) {
        this.disabled = disabled;
        this._defaultCurrency = null;
        this._getDefaultCurrencyInfo = function () {
            if (!this._defaultCurrency) {
                this._defaultCurrency = new CurrencyInfo(null, _default_1.getLocalizationById('DashboardStringId.DashboardCurrencyUseCurrentCurrency'), '');
                this._defaultCurrency.cultures = [{
                        name: null,
                        displayText: _default_1.getLocalizationById('DashboardStringId.DashboardCurrencyUseCurrentCurrency')
                    }];
            }
            return this._defaultCurrency;
        };
        this.getPreviewText = function (value, currency) {
            if (currency) {
                var dashboardFormat = {
                    format: 'currency',
                    currency: currency
                };
                return _format_helper_1.DashboardFormatHelper.format(value, dashboardFormat);
            }
            else {
                return null;
            }
        };
        this.selectedCurrency = ko.observable(this._getDefaultCurrencyInfo());
        this.selectedCulture = ko.observable(this._getDefaultCurrencyInfo().cultures[0]);
        this.previewPositive = ko.pureComputed(() => this.getPreviewText(123, this.selectedCurrency().name));
        this.previewNegative = ko.pureComputed(() => this.getPreviewText(-123, this.selectedCurrency().name));
        this.previewWarning = ko.pureComputed(() => this.selectedCurrency().name ? null : _default_1.getLocalizationById('DashboardWebStringId.Currency.DefaultCurrencyWarning'));
        this.currencies = ko.observableArray([this._getDefaultCurrencyInfo()].concat(_currencies_1.CURRENCIES.map((currency) => {
            var currencyInfo = new CurrencyInfo(currency.name, currency.displayName, this.getPreviewText(123, currency.name));
            currencyInfo.cultures = currency.cultures.map(culture => {
                var cultureInfo = new CultureInfo();
                cultureInfo.name = culture.name;
                cultureInfo.displayText = culture.displayName;
                if (cultureInfo.name === currencyCultureName()) {
                    this.selectedCurrency(currencyInfo);
                    this.selectedCulture(cultureInfo);
                }
                return cultureInfo;
            });
            return currencyInfo;
        }).sort((c1, c2) => c1.displayText.localeCompare(c2.displayText))));
        _knockout_utils_1.subscribeWithPrev(this.selectedCurrency, (prevCurrencyInfo, currencyInfo) => {
            if (currencyInfo && prevCurrencyInfo !== currencyInfo) {
                this.selectedCulture(currencyInfo.cultures[0]);
            }
        });
        this.selectedCulture.subscribe(currencyCultureInfo => {
            if (currencyCultureInfo) {
                currencyCultureName(currencyCultureInfo.name);
            }
        });
    }
}
exports.CurrencySelector = CurrencySelector;
ko.components.register('dx-dashboard-currency-selector', {
    viewModel: {
        createViewModel: function (params, componentInfo) {
            return new CurrencySelector(params.currencyCultureName, ko.observable(false));
        }
    },
    template: { element: 'dx-dash-currency-selector' }
});
