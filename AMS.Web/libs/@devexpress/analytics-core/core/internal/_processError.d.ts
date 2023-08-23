﻿/**
* DevExpress Analytics (core\internal\_processError.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IDisposable } from '../../serializer/utils';
export declare var _addErrorPrefix: boolean;
export declare function _processError(errorThrown: string, deferred: JQueryDeferred<any>, jqXHR: any, textStatus: any, processErrorCallback?: (message: string, jqXHR: any, textStatus: any) => void): void;
export declare var _errorProcessor: {
    handlers: any[];
    call: (e: any) => void;
};
export declare function processErrorEvent(func: any): IDisposable;
