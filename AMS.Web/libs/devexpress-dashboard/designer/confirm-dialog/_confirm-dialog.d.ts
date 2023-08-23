﻿/**
* DevExpress Dashboard (_confirm-dialog.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
export declare class ConfirmDialogViewModel {
    confirm(title: string, message: string, okButtonText?: string, cancelButtonText?: string): JQueryPromise<boolean>;
    confirmTitle: ko.Observable<string>;
    confirmText: ko.Observable<string>;
    confirmVisible: ko.Observable<boolean>;
    confirmButtons: ko.Observable<any[]>;
    confirmHidden: {
        (e: any): void;
    };
}
