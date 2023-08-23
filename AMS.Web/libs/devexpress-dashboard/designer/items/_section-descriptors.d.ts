﻿/**
* DevExpress Dashboard (_section-descriptors.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { NotificationController } from '../../common';
import { IExtension } from '../../common/common-interfaces';
import { DataSourceBrowser } from '../../common/_data-source-browser';
import { Dimension, Measure } from '../../model';
import { Dashboard } from '../../model/dashboard';
import { DashboardItem } from '../../model/items/dashboard-item';
import { BaseItemSurface } from './surfaces/_base-item-surface';
import { IDataSectionInfo } from './_interfaces';
export declare var SectionDescriptors: {
    HiddenDimensions: IDataSectionInfo<Dimension>;
    HiddenMeasures: IDataSectionInfo<Measure>;
    SeriesDimension: IDataSectionInfo<Dimension>;
    Arguments: IDataSectionInfo<Dimension>;
    Values: IDataSectionInfo<Measure>;
    FilterDimensions: IDataSectionInfo<Dimension>;
    SparklineArgument: IDataSectionInfo<Dimension>;
    SingleArgument: IDataSectionInfo<Dimension>;
    Value: IDataSectionInfo<Measure>;
    Latitude: IDataSectionInfo<Dimension>;
    Longitude: IDataSectionInfo<Dimension>;
    TooltipDimensions: IDataSectionInfo<Dimension>;
    TooltipMeasures: IDataSectionInfo<Measure>;
    Columns: IDataSectionInfo<Dimension>;
    Rows: IDataSectionInfo<Dimension>;
    Weight: IDataSectionInfo<Measure>;
    Color: IDataSectionInfo<Measure>;
    AttributeDimension: IDataSectionInfo<Dimension>;
    Argument: IDataSectionInfo<Dimension>;
    AxisXMeasure: IDataSectionInfo<Measure>;
    AxisYMeasure: IDataSectionInfo<Measure>;
};
export interface ISurfaceConstructor {
    new (dashboardItem: DashboardItem, dashboardModel: Dashboard, dataSourceBrowser: DataSourceBrowser, notificationController: NotificationController, findExtension: (name: string) => IExtension): any;
}
export declare class SurfaceItemsFactory {
    private _itemsMap;
    register(dashboardItemType: string, surfaceTypeConstructor: ISurfaceConstructor): void;
    createSurfaceItem<T extends DashboardItem>(dashboardItem: T, dashboardModel: Dashboard, dataSourceBrowser: DataSourceBrowser, notificationController: NotificationController, findExtension: (name: string) => IExtension): BaseItemSurface<T>;
}
export declare var surfaceItemsFactory: SurfaceItemsFactory;
