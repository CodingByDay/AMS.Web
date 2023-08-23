/**
* DevExpress Dashboard (_style-settings-palette.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ICustomAppearance } from './custom-style-settings/_conditional-formatting-custom-color-storage';
export declare var Palette: {
    standard: string[];
    richColors: string[];
    allColors: string[];
    gradient: string[];
    getLabelText: (type: string, empty: string) => string;
    getCustomLabelText: (appearance: ICustomAppearance) => string;
};
