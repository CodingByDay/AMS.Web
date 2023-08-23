﻿/**
* DevExpress Dashboard (map-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { MapClientState } from '../../../viewer-parts/viewer-items/_map-item';
import { Measure } from '../../data-item/measure';
import { ShapefileArea } from '../../enums';
import { IDashboardSerializationInfo, PropertyCategory } from '../../metadata/_base-metadata';
import { DataDashboardItem } from '../data-dashboard-item';
import { DashboardItemMasterFilterInteractivityOptions } from '../options/interactivity-options';
import { CustomShapefile } from './custom-shape-file';
import { MapViewport } from './map-viewport';
export declare abstract class MapItem extends DataDashboardItem {
    area: ko.Observable<ShapefileArea>;
    customShapefile: CustomShapefile;
    interactivityOptions: DashboardItemMasterFilterInteractivityOptions;
    viewport: MapViewport;
    private __tooltipMeasures;
    tooltipMeasures: ko.ObservableArray<Measure>;
    lockNavigation: ko.Observable<boolean>;
    shapeTitleAttributeName: ko.Observable<string>;
    private _isGeometryChanged;
    _shapeFilesAttributeNameList: ko.ObservableArray<string>;
    _initialExtentChanged: ko.Observable<boolean>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    _isGeometryChangedCallback: () => void;
    _clearBindings(): void;
    protected _getInfoCore(): IDashboardSerializationInfo[];
    _isCalculationSupported(): boolean;
    protected _getMasterFilterMode(): string;
    protected _getDrillDownEnabled(): boolean;
    protected _getIgnoreMasterFilter(): boolean;
    _setClientState(clientState: MapClientState): void;
    _getContentCategories(): PropertyCategory[];
    protected _updateContentViewModel(content: any): void;
    _isSortingEnabled(): boolean;
}
