﻿/**
* DevExpress Analytics (core\tools\_keyboardHelper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { IAction } from '../../widgets/utils';
import { ISelectionProvider } from '../selection/_selection';
import { UndoEngine } from '../../undo-engine/undoengine';
import { Disposable } from '../../serializer/utils';
import { IKeyboardCodesEnum } from '../../property-grid/widgets/internal/_utils';
export interface IShortcutActionList {
    processShortcut: (actions: IAction[], e: JQueryKeyEventObject) => void;
    toolbarItems: IAction[] | ko.Observable<IAction[]> | ko.Computed<IAction[]>;
    enabled?: ko.Observable<boolean> | ko.Computed<boolean>;
}
export declare class KeyboardHelperBase extends Disposable {
    private _processShortcut;
    processShortcut(e: JQueryKeyEventObject, index?: number): boolean;
    processChildrenShortcut(e: JQueryKeyEventObject, index?: number): boolean;
    shortcutMap: IKeyboardCodesEnum;
    childrenShortcutMap: IKeyboardCodesEnum;
}
export declare class KeyboardHelper extends KeyboardHelperBase {
    private _selection;
    private _undoEngine;
    constructor(selection: ISelectionProvider, undoEngine?: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>);
    processEsc(): void;
    moveSelectedControls(leftUp: boolean, isHoriz: boolean, sign: number): void;
}
export declare class KeyDownHandlersManager {
    private _handlers;
    private _targetElement;
    private get _activeHandler();
    private _removeHandler;
    constructor(targetElement: HTMLElement | Window);
    bindHandler(element: Element, handler: (e: JQueryKeyEventObject) => void, eventName?: string): void;
}
