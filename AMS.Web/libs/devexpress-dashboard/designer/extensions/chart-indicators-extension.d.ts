/**
* DevExpress Dashboard (chart-indicators-extension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IExtension } from '../../common/common-interfaces';
import { DashboardControl } from '../../common/dashboard-control';
export interface ChartIndicatorsExtensionOptions {
    customIndicatorTypes?: {
        type: string;
        displayName: string;
    }[];
}
export declare class ChartIndicatorsExtension implements IExtension {
    protected dashboardControl: DashboardControl;
    protected options: ChartIndicatorsExtensionOptions;
    get customChartIndicators(): {
        type: string;
        displayName: string;
    }[];
    constructor(dashboardControl: DashboardControl, options: ChartIndicatorsExtensionOptions);
    name: string;
}
