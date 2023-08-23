﻿/**
* DevExpress Analytics (core\tools\_actionList.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { Disposable } from '../../serializer/utils';
import { IShortcutActionList } from './_keyboardHelper';
import { IAction } from '../../widgets/utils';
import { ISurfaceContext } from '../elements/baseSurface';
import { ISelectionProvider } from '../selection/_selection';
import { UndoEngine } from '../../undo-engine/undoengine';
import { ICopyPasteStrategy } from './_copyPaste';
export declare class ActionListsBase extends Disposable implements IShortcutActionList {
    constructor(enabled?: ko.Observable<boolean> | ko.Computed<boolean>);
    processShortcut(actions: IAction[], e: JQueryKeyEventObject): void;
    shouldIgnoreProcessing(e: JQueryKeyEventObject): boolean;
    enabled: ko.Observable<boolean> | ko.Computed<boolean>;
    toolbarItems: IAction[] | ko.Observable<IAction[]> | ko.Computed<IAction[]>;
}
export declare class ActionLists extends ActionListsBase {
    _registerAction(container: Array<IAction>, action: IAction): void;
    private _keyboardHelper;
    constructor(surfaceContext: ko.Observable<ISurfaceContext> | ko.Computed<ISurfaceContext>, selection: ISelectionProvider, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, customizeActions?: (actions: IAction[]) => void, enabled?: ko.Observable<boolean> | ko.Computed<boolean>, copyPasteStrategy?: ICopyPasteStrategy, zoomStep?: ko.Observable<number> | ko.Computed<number>, isLocked?: (item: any) => boolean);
    processShortcut(actions: IAction[], e: JQueryKeyEventObject): void;
    menuItems: IAction[];
}
