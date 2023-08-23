﻿/**
* DevExpress Dashboard (_color-picker-model.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Color } from '../../../model/color';
import { ColorSchemeEntry } from '../../../model/colorization/color-scheme-entry';
import { ColorSchemeModel } from './_color-scheme-model';
export declare class ColorPickerModel {
    private colorSchemeModel;
    private colorPalette;
    constructor(colorSchemeModel: ColorSchemeModel, colorPalette: ko.ObservableArray<Color>);
    target: ko.Observable<HTMLElement>;
    visible: ko.Observable<boolean>;
    colorCss: ko.Observable<string>;
    confirm: () => void;
    init(entry: ColorSchemeEntry, target?: HTMLElement): void;
    buttonItems: ko.ObservableArray<{
        toolbar: string;
        location: string;
        widget: string;
        options: {
            text: any;
            onClick: () => void;
        };
    }>;
    private entry;
}
