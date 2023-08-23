﻿/**
* DevExpress Dashboard (_floating-panel.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import dxOverlay, { Options as dxOverlayOptions } from 'devextreme/ui/overlay/ui.overlay';
export interface FloatingPanelOptions {
    toolbarDiv: HTMLElement;
    floatingPanelDiv: HTMLElement;
    container: HTMLElement;
    preview: boolean;
    bottomPosition: boolean;
}
export declare class FloatingPanel {
    private PREVIEW_TOOLBAR_WIDTH;
    private _container;
    private _preview;
    private _floatingPanelDiv;
    private _maxWidth;
    _overlay: dxOverlay<dxOverlayOptions<any>>;
    constructor(options: FloatingPanelOptions);
    private _getToolbarWidth;
    private _calculateToolbarWidth;
    show(): void;
    hide(): void;
    repaint(): void;
    isVisible(): any;
    resetSizeCache(): void;
    dispose(): void;
}
