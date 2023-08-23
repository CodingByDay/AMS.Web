﻿/**
* DevExpress Dashboard (bundle.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
const _obsolete_helper_1 = require("../model/internal/_obsolete-helper");
require("../index");
const Data = require("../data/index");
const DataInternal = require("../data/index.internal");
const ViewerInternal = require("../common/viewer/index.internal");
const Common = require("../common");
const CommonInternal = require("../common/index.internal");
const Metadata = require("../model/index.metadata");
const Model = require("../model");
const ModelInternal = require("../model/index.internal");
const Designer = require("../designer");
const DesignerInternal = require("../designer/index.internal");
var DevExpress = window.DevExpress || {};
DevExpress.Dashboard = Common;
DevExpress.Dashboard.Data = Data;
DevExpress.Dashboard.Model = Model;
DevExpress.Dashboard.Designer = Designer;
Object.defineProperty(DevExpress.Dashboard.Designer, 'TextBoxItemEditorExtension', {
    get: () => {
        return require('../designer/text-box-item-editor-extension').TextBoxItemEditorExtension;
    },
    enumerable: false,
    configurable: true
});
DevExpress.Dashboard.Metadata = Metadata;
DevExpress.Dashboard.Internal = CommonInternal;
DevExpress.Dashboard.Internal.Data = DataInternal;
DevExpress.Dashboard.Internal.Model = ModelInternal;
DevExpress.Dashboard.Internal.Designer = DesignerInternal;
DevExpress.Dashboard.Internal.Viewer = ViewerInternal;
function defineClassReplace(memberName) {
    _obsolete_helper_1.defineClassMoved(memberName, DevExpress.Dashboard, DevExpress.Dashboard.Designer, 'DevExpress.Dashboard', 'DevExpress.Dashboard.Designer', 'See https://www.devexpress.com/bcid=BC4459 for details.');
}
defineClassReplace('DashboardItemMenuExtension');
defineClassReplace('DashboardColorSchemeEditorExtension');
defineClassReplace('DashboardCurrencyEditorExtension');
defineClassReplace('DataSourceBrowserExtension');
defineClassReplace('MultiQueryDataSourceWizardExtension');
defineClassReplace('DataSourceWizardExtension');
defineClassReplace('AvailableDataSourcesExtension');
defineClassReplace('BindingPanelExtension');
defineClassReplace('ConversionPanelExtension');
defineClassReplace('CreateDashboardExtension');
defineClassReplace('InteractivityPanelExtension');
defineClassReplace('OpenDashboardExtension');
defineClassReplace('OptionsPanelExtension');
defineClassReplace('SaveDashboardExtension');
defineClassReplace('DashboardTitleEditorExtension');
defineClassReplace('UndoRedoExtension');
defineClassReplace('DashboardParameterEditorExtension');
defineClassReplace('ToolboxExtension');
defineClassReplace('DashboardMenuItem');
defineClassReplace('DashboardToolboxItem');
defineClassReplace('DashboardToolbarItem');
defineClassReplace('DashboardToolboxGroup');
defineClassReplace('DashboardToolbarGroup');
module.exports = DevExpress['Dashboard'];
