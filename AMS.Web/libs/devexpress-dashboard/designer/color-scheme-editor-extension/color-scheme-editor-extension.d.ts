﻿/**
* DevExpress Dashboard (color-scheme-editor-extension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IExtension } from '../../common/common-interfaces';
import { DashboardControl } from '../../common/dashboard-control';
import { Color } from '../../model/color';
import { ColorSchemeEntry } from '../../model/colorization/color-scheme-entry';
import { ChartItemBase } from '../../model/items/chart-item-base';
import { DashboardItem } from '../../model/items/dashboard-item';
import { DataDashboardItem } from '../../model/items/data-dashboard-item';
import { ObjectPropertiesWrapper } from '../form-adapter/_object-properties-wrapper';
import { ColorPickerModel } from './internal/_color-picker-model';
import { ColorSchemeModel } from './internal/_color-scheme-model';
import { EntryEditorViewModel } from './internal/_entry-editor-model';
export declare class DashboardColorSchemeEditorExtension implements IExtension {
    private dashboardControl;
    name: string;
    private _menuItem;
    private _subscriptions;
    private selected;
    private _propertiesPanelExtension;
    private dataSourceBrowserExtension;
    static _isColoringSupported(item: DashboardItem): boolean;
    constructor(dashboardControl: DashboardControl);
    _updateExtensionModel(): void;
    start(): void;
    stop(): void;
    _getColorSchemeWrapper(model: ChartItemBase): ObjectPropertiesWrapper;
    _getColoringWrapper(model: DataDashboardItem): ObjectPropertiesWrapper;
    _colorSchemeModel: ko.Observable<ColorSchemeModel>;
    _colorPalette: ko.ObservableArray<Color>;
    _entryEditorModel: EntryEditorViewModel;
    _colorPickerModel: ko.Computed<ColorPickerModel>;
    _selectedEntry: ko.Observable<ColorSchemeEntry>;
    _createNewEntry: () => void;
}
