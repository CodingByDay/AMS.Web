/**
* DevExpress Dashboard (_base-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardItemPropertiesComposer = exports.DataItemContainerPropertiesComposer = exports.PropertiesComposerBase = void 0;
class PropertiesComposerBase {
    constructor(_customizeTabs) {
        this._customizeTabs = _customizeTabs;
    }
    composeTabs(model, args) {
        var tabs = this._composeTabsCore(model, args);
        this._customizeTabs(tabs, model, args);
        return tabs;
    }
}
exports.PropertiesComposerBase = PropertiesComposerBase;
class DataItemContainerPropertiesComposer extends PropertiesComposerBase {
    constructor(_customizeTabs) {
        super(_customizeTabs);
    }
}
exports.DataItemContainerPropertiesComposer = DataItemContainerPropertiesComposer;
class DashboardItemPropertiesComposer extends PropertiesComposerBase {
    constructor(_customizeTabs) {
        super(_customizeTabs);
    }
}
exports.DashboardItemPropertiesComposer = DashboardItemPropertiesComposer;
