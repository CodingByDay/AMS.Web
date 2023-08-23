/**
* DevExpress Dashboard (_ko-element-accessor.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export interface ElementAccessorKoComponentArgs {
    onInitialize?: (args: ElementAccessorEventArgs) => void;
    onDisposing?: (args: ElementAccessorEventArgs) => void;
    targetElement?: ko.Observable<HTMLElement>;
}
export interface ElementAccessorEventArgs {
    element: HTMLElement;
}
