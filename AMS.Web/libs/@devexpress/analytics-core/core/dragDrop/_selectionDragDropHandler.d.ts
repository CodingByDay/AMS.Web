﻿/**
* DevExpress Analytics (core\dragDrop\_selectionDragDropHandler.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DragDropHandler } from './_dragDropHandler';
import { ISelectionTarget, SurfaceSelection } from '../selection/_selection';
import { ISurfaceContext, IArea } from '../elements/baseSurface';
import { UndoEngine } from '../../undo-engine/undoengine';
import { SnapLinesHelper } from '../snapLines/_snapLinesHelper';
import { DragHelperContent } from './_dragHelperContent';
export declare class SelectionDragDropHandler extends DragDropHandler {
    adjustDropTarget(dropTargetSurface: ISelectionTarget): ISelectionTarget;
    constructor(surface: ko.Observable<ISurfaceContext> | ko.Computed<ISurfaceContext>, selection: SurfaceSelection, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, snapHelper: SnapLinesHelper, dragHelperContent: DragHelperContent);
    startDrag(control: ISelectionTarget): void;
    drag(event: any, uiElement: any, draggable: any): void;
    getLocation(adjustedTarget: any, item: any): IArea;
    ajustLocation(adjustedTarget: any, item: any): void;
    doStopDrag(uiElement: any, _: any): void;
}
