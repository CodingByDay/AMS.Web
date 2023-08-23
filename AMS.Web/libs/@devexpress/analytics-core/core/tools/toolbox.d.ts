/**
* DevExpress Analytics (core\tools\toolbox.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export interface IToolboxItemInfo {
    '@ControlType': string;
    index: number;
    canDrop?: any;
    group?: string;
    displayName?: string;
}
export declare class ToolboxItem {
    constructor(info: IToolboxItemInfo);
    disabled: ko.Observable<boolean>;
    info: IToolboxItemInfo;
    get type(): string;
    get imageClassName(): string;
    get imageTemplateName(): any;
    get index(): number;
    get displayName(): string;
}
