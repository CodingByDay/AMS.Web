﻿/**
* DevExpress Dashboard (_format-rule-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../../../common/_data-source-browser';
import { IDisposable } from '../../../../model/disposable-object';
import { DashboardItemFormatRule } from '../../../../model/format-rules/dashboard-item-format-rule';
import { DataDashboardItem } from '../../../../model/items/data-dashboard-item';
import { PropertiesController } from '../../../properties-controller/_properties-controller';
import { CollectionEditorEditItemArguments } from '../../../ui-widgets/collection-editor/_collection-editor-viewmodel';
export declare class FormatRuleSurface implements IDisposable {
    model: ko.Observable<DashboardItemFormatRule>;
    dashboardItem: DataDashboardItem;
    dataSourceBrowser: DataSourceBrowser;
    propertiesController: PropertiesController;
    private _disposables;
    constructor(model: ko.Observable<DashboardItemFormatRule>, dashboardItem: DataDashboardItem, dataSourceBrowser: DataSourceBrowser, propertiesController: PropertiesController);
    updatePropertiesTabs(requestRecalculation: JQueryCallback): void;
    startEditing(args: CollectionEditorEditItemArguments): void;
    dispose(): void;
}
