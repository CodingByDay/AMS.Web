﻿/**
* DevExpress Dashboard (text-box-item-editor-extension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IExtension } from '../../common/common-interfaces';
import { DashboardControl } from '../../common/dashboard-control';
import { DisposableObject } from '../../model/disposable-object';
import './_rich-edit-bindings';
export declare class TextBoxItemEditorExtension extends DisposableObject implements IExtension {
    private readonly _dashboardControl;
    private readonly _viewModel;
    private readonly _customTemplate;
    name: string;
    constructor(dashboardControl: DashboardControl);
    start(): void;
    private _extendTextBoxSerializationInfo;
    private _getDashboardItemWidth;
    stop(): void;
}
