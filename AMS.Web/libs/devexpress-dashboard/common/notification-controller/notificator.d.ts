﻿/**
* DevExpress Dashboard (notificator.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { ErrorInfo } from '../common-interfaces';
import { IErrorHandler } from '../internal/_interfaces';
import { NotificationControllerViewModel } from './_notificator-view-model';
export declare class NotificationController implements IErrorHandler {
    static _getErrorTextFromResponse(request: JQueryXHR): any;
    static _getDetailedErrorMessage(errorInfo: ErrorInfo): string;
    _viewModel: NotificationControllerViewModel;
    suspended(isSuspended: boolean): void;
    showState(message: string): void;
    showSuccess(message: string): void;
    showError(title: string, errorInfo?: ErrorInfo): void;
    reset(): void;
}
