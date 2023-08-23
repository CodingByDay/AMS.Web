﻿/**
* DevExpress Dashboard (undo-engine-extension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { KeyEventType } from '../../common/common-interfaces';
import { DashboardControl } from '../../common/dashboard-control';
import { DisposableObject } from '../../model/disposable-object';
export declare class UndoRedoExtension extends DisposableObject {
    private dashboardControl;
    name: string;
    static readonly _toolbarItemsIndex = 0;
    private _undoEngine;
    private _predefinedToolbarItems;
    private _defaultToolbarItems;
    private _toolboxToolbarGroup;
    constructor(dashboardControl: DashboardControl);
    reset(): void;
    processKeyEvent(keyEventType: KeyEventType, eventArgs: JQueryKeyEventObject): boolean;
    private _controlOptionChangedHandler;
    start(): void;
    private _createToolbarItem;
    private _addToolbarItems;
    private _removeToolbarItems;
    undo(): void;
    redo(): void;
    undoEnabled(): boolean;
    redoEnabled(): boolean;
    stop(): void;
    private _onControlOptionChanged;
    private _beforeWindowUnloadHandler;
    private _setShowConfirmationDialog;
    private _onBeforeWindowUnload;
    isChanged: ko.Computed<boolean>;
}
