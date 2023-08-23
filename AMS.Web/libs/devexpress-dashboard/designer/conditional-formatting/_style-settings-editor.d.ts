﻿/**
* DevExpress Dashboard (_style-settings-editor.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { StyleSettingsBase } from '../../model/format-rules/style-settings/style-settings-base';
import { StyleSettingsEditorItemArgs } from './_style-settings-editor-item';
export declare type StyleSettingsEditorMode = 'Appearance' | 'AllColors' | 'RichColors' | 'GradientColors';
export declare type StyleSettingsEditorViewMode = 'Appearance' | 'Icon';
export interface StyleSettingsEditorOptions {
    appearanceMode: StyleSettingsEditorMode;
    allowChangeViewMode: boolean;
    isEmptyAllowed: boolean;
    enableCustomStyles?: boolean;
    selectedChanged?: (oldStyle: StyleSettingsBase, newStyle: StyleSettingsBase) => void;
    closeEditCell?: () => void;
    restrictToColor?: boolean;
    getAvailableFontFamilies?: () => ko.Subscribable<string[]>;
}
export declare class StyleSettingsEditor {
    value: ko.Observable<StyleSettingsBase>;
    list: Array<StyleSettingsEditorItemArgs>;
    iconList: Array<StyleSettingsEditorItemArgs>;
    customStyleItems: Array<StyleSettingsEditorItemArgs>;
    customColorsSupported: boolean;
    closeEditCell: () => void;
    selectedChanged: (oldStyle: StyleSettingsBase, newStyle: StyleSettingsBase) => void;
    allowChangeViewMode: boolean;
    viewMode: ko.Observable<StyleSettingsEditorViewMode>;
    private isGradient;
    private isEmptyAllowed;
    private restrictToColor;
    private readonly numberOfCustomStyleItems;
    private readonly getAvailableFontFamilies;
    constructor(target: ko.Observable<StyleSettingsBase>, params: StyleSettingsEditorOptions);
    _setStyleType(styleSettingsModel: StyleSettingsBase, saveCustomStyle: any): void;
    _createDataSources(mode: StyleSettingsEditorMode, isEmptyAllowed: boolean, isCustomStyleEnabled: boolean, isCustomColorsOnly: boolean, selectedValue: ko.Subscribable<StyleSettingsBase>, customStylesProvider: any): {
        predefinedStyles: StyleSettingsEditorItemArgs[];
        predefinedIcons: StyleSettingsEditorItemArgs[];
        customStyles: StyleSettingsEditorItemArgs[];
    };
    private _getCustomColorStyles;
    private _getCustomAppearanceStyles;
    private _getStyles;
    private _getCustomStyles;
    private createStyleSettingsModel;
    private createCustomColorStyleSettingsModel;
    private createCustomAppearanceStyleSettingsModel;
    private createItemViewModel;
}
