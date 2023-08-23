﻿/**
* DevExpress Dashboard (_popover-color-picker.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export declare class PopoverColorPicker {
    private setColor;
    color: ko.Observable<string>;
    visible: ko.Observable<boolean>;
    constructor(setColor: (color: string) => void);
    buttonItems: ko.ObservableArray<{
        toolbar: string;
        location: string;
        widget: string;
        options: {
            text: any;
            onClick: () => void;
        };
    }>;
    show(color: any): void;
}
