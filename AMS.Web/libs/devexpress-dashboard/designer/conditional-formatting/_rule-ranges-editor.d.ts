﻿/**
* DevExpress Dashboard (_rule-ranges-editor.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { dxButtonGroupOptions } from 'devextreme/ui/button_group';
import dxDataGrid, { dxDataGridOptions } from 'devextreme/ui/data_grid';
import * as ko from 'knockout';
import { FormatConditionRangeBase } from '../../model/format-rules/conditions/range/format-condition-range-base';
import { RangeInfo } from '../../model/format-rules/conditions/range/range-info';
import { AppearanceSettings } from '../../model/format-rules/style-settings/appearance-settings';
import { StyleSettingsBase } from '../../model/format-rules/style-settings/style-settings-base';
import { StyleSettingsEditorMode, StyleSettingsEditorOptions } from './_style-settings-editor';
import { StyleSettingsEditorItemArgs } from './_style-settings-editor-item';
export interface IRange {
    style: ko.Observable<StyleSettingsBase>;
    sign: ko.Observable<string>;
    leftValue: ko.Observable<any>;
    rightValue: ko.Computed<any>;
    rangeInfo: RangeInfo;
}
export interface RuleRangesEditorOptions {
    appearanceMode: StyleSettingsEditorMode;
    condition: FormatConditionRangeBase;
    enableCustomStyles?: boolean;
    restrictToColor?: boolean;
}
export declare type DataGridColumnTypes = 'string' | 'date' | 'boolean' | 'number' | 'object';
export declare class RuleRangesEditor {
    condition: FormatConditionRangeBase;
    dataType: ko.Observable<string>;
    isPercent: ko.Computed<boolean>;
    selection: ko.Observable<IRange>;
    value: ko.ObservableArray<IRange>;
    enableCustomStyles: boolean;
    appearanceMode: StyleSettingsEditorMode;
    isGradient: boolean;
    restrictToColor?: boolean;
    popoverOffset: string;
    private static patchValueToMatchSerializedType;
    constructor(options: RuleRangesEditorOptions);
    updateRangeValues(isPercent: boolean): void;
    isRangeEmptyAllowed(range: IRange): boolean;
    closeEditCell: () => void;
    private _closeEditCell;
    createStyleSettingsEditorOptions(range: IRange): StyleSettingsEditorOptions;
    createStyleSettingsEditorItemOptions(range: IRange): StyleSettingsEditorItemArgs;
    createRangeNumberEditorViewModel(args: {
        value: ko.Observable<number | string>;
        rowIndex: number;
        grid: dxDataGrid;
        isRightValue: boolean;
        setValue: (value: number | string) => void;
    }): {
        editorType: "numberBox" | "dateBox";
        negativeInfinityDisplayText: string;
        allowInfinity: boolean;
        infinitValue: ko.Observable<boolean>;
        editorOptions: {
            onValueChanged: (e: any) => void;
            format: string;
            value: any;
        };
        buttonOptions: dxButtonGroupOptions;
    };
    get dataGridOptions(): dxDataGridOptions;
    add(): void;
    remove(): void;
    getSelectedStyleChangedHandler(range: IRange): (oldStyle: AppearanceSettings, newStyle: AppearanceSettings) => void;
    private _updateValue;
}
