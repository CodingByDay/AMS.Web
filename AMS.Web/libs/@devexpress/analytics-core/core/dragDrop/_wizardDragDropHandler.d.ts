﻿/**
* DevExpress Analytics (core\dragDrop\_wizardDragDropHandler.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DragDropHandler } from './_dragDropHandler';
import { DragHelperContent } from './_dragHelperContent';
export interface IWizardDragDropHandlerOptions {
    dragHelperContent: DragHelperContent;
    addHandler: (dropTarget: any, item: any, position?: {
        left: number;
        top: number;
    }) => void;
    parent: string;
    containment: string;
    target?: string;
}
export declare class WizardDragDropHandler extends DragDropHandler {
    protected _dropTarget: any;
    protected _addHandler: any;
    protected _target: any;
    constructor(options: IWizardDragDropHandlerOptions);
    helper(draggable: any, event: any): any;
    doStopDrag(uiElement: any, _: any): void;
    drag(event: MouseEvent, ui: any): void;
}
