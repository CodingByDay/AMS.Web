﻿/**
* DevExpress Dashboard (_text-box-item-editor-view-model.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import dxPopup from 'devextreme/ui/popup';
import * as ko from 'knockout';
import { ConfirmDialogViewModel } from '../confirm-dialog/_confirm-dialog';
import { DocVariableInfo } from './_rich-edit-bindings';
export declare class ValueAccessor {
    getValue: () => any;
    setValue: (value: any) => void;
}
export declare class RichEditExtensionViewModel {
    private _isCloseConfirmed;
    popup: dxPopup;
    richEditorOptions: ko.Observable<any>;
    show(options: ValueAccessor, docVariables: DocVariableInfo[], dashboardItemWidth: number): void;
    close: () => void;
    saveAndClose: () => void;
    onHidden: () => void;
    onHiding: (args: any) => void;
    onInitialized: (args: any) => void;
    confirmDialogViewModel: ConfirmDialogViewModel;
}
