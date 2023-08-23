/**
* DevExpress Dashboard (_underlying-data-source.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataDashboardItem } from '../../../model';
import { IUnderlyingDataProvider } from '../../data/_underlying-data-provider';
import { GridDataSourceInfo } from '../data-inspector-extension/_data-inspector-view-model';
export declare function generateUnderlyingDataSource(underlyingDataProvider: IUnderlyingDataProvider, dashbordItem: DataDashboardItem): GridDataSourceInfo;
