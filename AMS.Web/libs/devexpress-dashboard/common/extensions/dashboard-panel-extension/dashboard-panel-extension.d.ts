﻿/**
* DevExpress Dashboard (dashboard-panel-extension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { CancellationToken } from '../../_helpers';
import { DashboardInfo, IExtension, SequenceAction, WorkingModeSwitchingOptions } from '../../common-interfaces';
import { DashboardControl } from '../../dashboard-control';
export declare class DashboardPanelExtension implements IExtension {
    private dashboardControl;
    private options;
    name: string;
    private _customTemplate;
    private _iconBack;
    private _flexParent;
    private _dashboardsButton;
    private _dashboardTruncated;
    private _ellipsisText;
    private _itemTemplate;
    private _isMobile;
    private _disposables;
    panelWidth: number;
    visible: ko.Observable<boolean>;
    allowSwitchToDesigner: ko.Observable<boolean>;
    designerToViewerAction: SequenceAction;
    viewerToDesignerAction: SequenceAction;
    selectedItemKeys: ko.ObservableArray<string>;
    availableDashboards: ko.ObservableArray<DashboardInfo>;
    private _actualPanelWidth;
    private get _templateName();
    constructor(dashboardControl: DashboardControl, options?: DashboardPanelExtensionOptions);
    start(): void;
    stop(): void;
    updateDashboardsList(): void;
    private _validateSelection;
    private _hidePanel;
    showPanelAsync: (options: WorkingModeSwitchingOptions) => JQueryPromise<{}>;
    _showPanelAsync: (options: WorkingModeSwitchingOptions, cancellationToken: CancellationToken) => JQueryPromise<WorkingModeSwitchingOptions>;
    hidePanelAsync: (options: WorkingModeSwitchingOptions) => JQueryPromise<{}>;
    _hidePanelAsync: (options: WorkingModeSwitchingOptions, cancellationToken: CancellationToken) => JQueryPromise<{}>;
    switchToViewer: () => void;
    switchToDesigner: () => void;
    private _getCustomTemplate;
}
export interface DashboardPanelExtensionOptions {
    dashboardThumbnail?: string;
}
