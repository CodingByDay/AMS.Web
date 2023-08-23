﻿/**
* DevExpress Dashboard (_window-definition-editor.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../common/_data-source-browser';
import { MeasureCalculationWindowDefinition } from '../../model/data-item/window-definition/measure-calc-window-definition';
import { SpecificWindowDefinition } from '../../model/data-item/window-definition/specific-calc-window-definition';
import { WindowDefinition } from '../../model/data-item/window-definition/window-definition';
import { DataDashboardItem } from '../../model/items/data-dashboard-item';
import { IDashboardSerializationInfo } from '../../model/metadata/_base-metadata';
import { FormAdapterEditor } from '../form-adapter/_form-adapter-editors';
import { ObjectPropertiesWrapper } from '../form-adapter/_object-properties-wrapper';
export declare enum WindowDefinitionMode {
    Predefined = 0,
    Specific = 1
}
export interface WindowDefinitionEditorParams {
    dataDashboardItem: DataDashboardItem;
    dataSourceBrowser: DataSourceBrowser;
}
export declare class WindowDefinitionEditor {
    private _params;
    value: ko.Observable<MeasureCalculationWindowDefinition>;
    mode: ko.Observable<any>;
    formAdapterWrapper: ko.Computed<ObjectPropertiesWrapper>;
    constructor(windowDefinition: WindowDefinition, _params: WindowDefinitionEditorParams);
    get dataSource(): {
        value: WindowDefinitionMode;
        displayValue: string;
    }[];
    setValue(newMode: WindowDefinitionMode): void;
    static createPatchSpecificWindowDimensionsInfo: (definition: SpecificWindowDefinition, dataDashboardItem: DataDashboardItem, dataSourceBrowser: DataSourceBrowser) => (propertyInfo: IDashboardSerializationInfo) => IDashboardSerializationInfo;
}
export declare const windowDefinitionEditor: FormAdapterEditor<WindowDefinitionEditorParams>;
