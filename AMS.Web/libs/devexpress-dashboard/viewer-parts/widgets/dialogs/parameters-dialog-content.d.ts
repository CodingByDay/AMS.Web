/**
* DevExpress Dashboard (parameters-dialog-content.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import dxDataGrid from 'devextreme/ui/data_grid';
export interface ParameterDialogContent {
    grid: dxDataGrid;
    submitParameterValues: () => void;
    resetParameterValues: () => void;
    valueChanged: JQueryCallback;
    dispose: () => void;
}
