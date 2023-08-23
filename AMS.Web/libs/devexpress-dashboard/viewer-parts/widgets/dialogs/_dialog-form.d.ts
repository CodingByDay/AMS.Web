﻿/**
* DevExpress Dashboard (_dialog-form.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import dxPopup from 'devextreme/ui/popup';
export declare let dialogClasses: {
    form: string;
    formWrapper: string;
    simpleDialog: string;
    element: string;
    elementLargeMarginTop: string;
    elementSmallMarginTop: string;
    name: string;
    disabledName: string;
    box: string;
    buttons: string;
    elementTextBox: string;
    elementNumberBox: string;
};
export declare let dialogSizes: {
    width: number;
    height: number;
    minWidth: number;
    minHeight: number;
};
export interface DialogFormOptions {
    allowScrolling: boolean;
    fullScreenMode?: boolean;
    dialogContainer: Element;
    title?: string;
    width: number | string;
    height: number | string;
    deferredRendering: boolean;
    buttons: Array<{
        className?: string;
        name?: string;
        hide?: boolean;
        func?: (...args: any[]) => void;
        isDefault?: boolean;
    }>;
    setActualState: (width: number) => void;
    onShowing?: (args: any) => void;
    onHidden?: (args: any) => void;
    onShown?: (args: any) => void;
    renderContent: (args: any) => HTMLElement;
    disposeContent: () => void;
}
export declare class dialogForm {
    options: DialogFormOptions;
    popupInstance: dxPopup;
    scrollableContent: HTMLElement;
    controlCreationCallbacks: JQuery.Callbacks<Function>;
    constructor(options: DialogFormOptions);
    showDialog(): void;
    hideDialog(): void;
    dispose(): void;
    _initialize(): void;
    _renderPopupContent(component: dxPopup): void;
    _setLabelsWidth(): number;
}
