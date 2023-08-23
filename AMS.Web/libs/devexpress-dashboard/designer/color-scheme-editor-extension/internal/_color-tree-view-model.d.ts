﻿/**
* DevExpress Dashboard (_color-tree-view-model.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { Color } from '../../../model/color';
import { ColorSchemeEntry } from '../../../model/colorization/color-scheme-entry';
import { KnockoutEntry } from '../../../model/internal/_knockout-utils';
import { FormAdapterEditor } from '../../form-adapter/_form-adapter-editors';
import { ColorPickerModel } from './_color-picker-model';
interface UniqueColorValue {
    id: string;
    displayValue: string;
}
export declare class ColorEntryTreeItem {
    value: string;
    uniqueKey: string;
    entry: ColorSchemeEntry;
    constructor(value: string, uniqueKey: string, entry: ColorSchemeEntry, editColor: (entry: ColorSchemeEntry, event: JQueryEventObject) => void, entryComputedColor: Color);
    editColor: any;
    color: string;
    items: ColorEntryTreeItem[];
    expanded: boolean;
    custom: boolean;
}
export interface ColorTreeViewModelOptions {
    dataSource: KnockoutEntry<ColorSchemeEntry[]>;
    editColor: (entry: ColorSchemeEntry, event: JQueryEventObject) => void;
    colorPalette: ko.ObservableArray<Color>;
    allowModify?: boolean;
    selectedEntry?: KnockoutEntry<ColorSchemeEntry>;
    addNewEntry?: () => void;
    removeEntry?: any;
    colorPickerModel?: ko.Computed<ColorPickerModel>;
}
export declare class ColorTreeViewModel {
    static construct(values: Array<UniqueColorValue>, children: ColorEntryTreeItem[], entry: ColorSchemeEntry, editColor: (entry: ColorSchemeEntry, event: JQueryEventObject) => void, entryComputedColor: Color): void;
    constructor(params: ColorTreeViewModelOptions);
    addNewEntry: () => void;
    removeItem: (item: ColorEntryTreeItem) => void;
    allowAddNewEntry: ko.Computed<boolean>;
    dataSource: ko.Computed<ColorEntryTreeItem[]>;
    isTreeMode: ko.Computed<boolean>;
    colorPickerModel: ko.Computed<ColorPickerModel>;
    allowModify: boolean;
    selectedTreeItems: ko.Observable<ColorEntryTreeItem[]>;
    private selectedEntry;
    private removeEntry;
    onItemSelectionChanged: (e: any) => void;
}
export declare const colorSchemeTreeViewEditor: FormAdapterEditor<ColorTreeViewModelOptions>;
export {};
