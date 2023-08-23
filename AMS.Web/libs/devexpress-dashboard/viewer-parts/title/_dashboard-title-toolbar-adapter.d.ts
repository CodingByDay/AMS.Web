/**
* DevExpress Dashboard (_dashboard-title-toolbar-adapter.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardTitleToolbarOptions } from '../widgets/caption-toolbar/caption-toolbar-options';
import { TitleViewModel } from './_title-view-model';
export declare class DashboardTitleToolbarAdapter {
    static getTitleOptions(titleViewModel: TitleViewModel, masterFilterValues: Array<any>, showExportDialog: (format: any) => void, showParametersDialog: () => void, allowExport: boolean): DashboardTitleToolbarOptions;
    private static _getMasterFilterText;
}
