/**
* DevExpress Analytics (core\tools\tabPanel.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../serializer/utils';
import { RightPanelKeyboardHelper } from '../../accessibility/_rightPanelKeyboardHelper';
import { TabInfo } from './tabInfo';
export interface ITabPanelOptions {
    tabs: TabInfo[];
    autoSelectTab?: boolean;
    rtl?: boolean;
    width?: number;
}
export declare class TabPanel extends Disposable {
    static Position: {
        Left: string;
        Right: string;
    };
    dispose(): void;
    constructor(options: ITabPanelOptions);
    getTabByName(tabName: string): TabInfo;
    private _resizableOptions;
    getResizableOptions: ($element: Element, panelOffset: number, minWidth: number) => any;
    tabs: TabInfo[];
    toggleTabVisibility: (e: any) => void;
    selectTab: (e: any) => void;
    isEmpty: ko.Observable<boolean> | ko.Computed<boolean>;
    collapsed: ko.Observable<boolean> | ko.Computed<boolean>;
    width: ko.Observable<number> | ko.Computed<number>;
    headerWidth: ko.Observable<number> | ko.Computed<number>;
    position: ko.Observable<string> | ko.Computed<string>;
    toggleCollapsedImage: ko.Computed<{
        class: string;
        template: string;
    }>;
    toggleCollapsedText: ko.PureComputed<any>;
    cssClasses: (extendOptions: {
        class: string;
        condition: any;
    }) => {
        [key: string]: boolean;
    };
    keyboardHelper: RightPanelKeyboardHelper;
}
