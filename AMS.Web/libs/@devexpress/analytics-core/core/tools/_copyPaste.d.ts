﻿/**
* DevExpress Analytics (core\tools\_copyPaste.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ElementViewModel } from '../elements/elementViewModel';
import { ISelectionTarget, ISelectionProvider } from '../selection/_selection';
import { IPoint } from '../elements/point';
import { ModelSerializer } from '../../serializer/serializer';
export interface ICopyPasteStrategy {
    createChild(pasteTarget: ElementViewModel, info: {}): ElementViewModel;
    calculateDelta(selection: ISelectionTarget, pasteTargetSurface: ISelectionTarget, minPoint: IPoint): {
        x: number;
        y: number;
    };
    canPaste?(pasteTarget: ElementViewModel, info: {}): boolean;
    createSelfRestoringItems?: (model: ElementViewModel, seriazlizer: ModelSerializer) => Array<{
        restore: () => void;
    }>;
}
export declare var copyPasteStrategy: ICopyPasteStrategy;
export declare class CopyPasteHandler {
    private _copyPasteStrategy;
    private _selectionProvider;
    private _copyInfo;
    constructor(selectionProvider: ISelectionProvider, _copyPasteStrategy?: ICopyPasteStrategy);
    hasPasteInfo: ko.PureComputed<boolean>;
    canCopy(): boolean;
    canPaste(): boolean;
    copy(): void;
    cut(): void;
    paste(): void;
}
