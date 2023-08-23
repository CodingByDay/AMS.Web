/**
* DevExpress Dashboard (range-index-settings.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { StyleSettingsBase } from './style-settings-base';
export declare class RangeIndexSettings extends StyleSettingsBase {
    index: ko.Observable<number>;
    isBarStyle: ko.Observable<boolean>;
    constructor(index: number);
    equals(style: StyleSettingsBase): boolean;
    clone(): StyleSettingsBase;
}
