﻿/**
* DevExpress Dashboard (_style-settings-editor-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { StyleSettingsBase } from '../../model';
import { CustomAppearanceDialog } from './custom-style-settings/_custom-appearance-dialog';
import { PopoverColorPicker } from './custom-style-settings/_popover-color-picker';
export declare type styleSettingsEditorItemType = 'icon' | 'appearance';
export declare type StyleSettingsEditorItemArgs = {
    item: StyleSettingsBase;
    clickHandler: (saveCustomStyle: 'SaveColor' | 'SaveAppearance' | 'None') => void;
    isSelected: ko.Subscribable<boolean>;
    isEmptyAllowed: boolean;
    isRange: boolean;
    isGradient: boolean;
    restrictToColor: boolean;
    getAvailableFontFamilies?: () => ko.Subscribable<string[]>;
};
export declare class StyleSettingsEditorItem {
    cssStyles: ko.PureComputed<string>;
    title: ko.PureComputed<string>;
    dataLabel: ko.PureComputed<string>;
    cssClasses: ko.PureComputed<string>;
    isRangeStop: ko.PureComputed<boolean>;
    colorPicker: PopoverColorPicker;
    customizeAppearanceDialog: CustomAppearanceDialog;
    clickHandler: () => void;
    private _item;
    private _itemAdapter;
    private _editorClickHandler;
    private _isSelected;
    constructor(args: StyleSettingsEditorItemArgs);
    clickHandlerCore(isRestrictToColor: boolean): void;
    private _showCustomStyleEditor;
    private _initialize;
}
