﻿/**
* DevExpress Dashboard (_currency-selector.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export declare class CurrencyInfo {
    name: string;
    displayText: string;
    previewText: string;
    constructor(name: string, displayText: string, previewText?: string);
    cultures: Array<CultureInfo>;
}
export declare class CultureInfo {
    name: string;
    displayText: string;
}
export declare class CurrencySelector {
    disabled: ko.Observable<boolean>;
    constructor(currencyCultureName: ko.Observable<string>, disabled: ko.Observable<boolean>);
    private _defaultCurrency;
    _getDefaultCurrencyInfo: () => CurrencyInfo;
    getPreviewText: (value: number, currency: string) => string;
    currencies: ko.ObservableArray<CurrencyInfo>;
    selectedCurrency: ko.Observable<CurrencyInfo>;
    selectedCulture: ko.Observable<CultureInfo>;
    previewPositive: ko.PureComputed<string>;
    previewNegative: ko.PureComputed<string>;
    previewWarning: ko.PureComputed<any>;
}
