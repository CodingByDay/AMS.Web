﻿/**
* DevExpress Analytics (core\utils\_infoMessageHelpers.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare var NotifyType: {
    info: string;
    warning: string;
    error: string;
    success: string;
};
export declare function NotifyAboutWarning(msg: any, showForUser?: boolean): void;
export declare function getErrorMessage(deferredResult: any): any;
export declare var ShowMessage: (msg: string, type?: string, displayTime?: number, debugInfo?: string, contentTemplate?: any, containerElement?: Element) => void;
export declare var _setShowMessageFunc: (func: any) => any;
export declare var _resetShowMessageFunc: () => (msg: string, type?: string, displayTime?: number, debugInfo?: string, contentTemplate?: any, containerElement?: Element) => void;
