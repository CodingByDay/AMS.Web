/**
* DevExpress Analytics (core\internal\requestManager.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IAjaxSetup } from './_ajaxSetup';
import { IFetchSetup } from './_fetchSetup';
import { IRequestManager, IRequestManagerSettings } from './_requestManager';
interface IRequestManagerSetup {
    ajaxSetup?: IAjaxSetup;
    fetchSetup?: IFetchSetup;
}
export declare var requestManager: {
    getInstance: (requestManagerSetup?: IRequestManagerSetup) => IRequestManager<JQueryAjaxSettings | IRequestManagerSettings>;
    _initialize: (requestManagerInstance?: IRequestManager<JQueryAjaxSettings | IRequestManagerSettings>) => void;
    initialize: (requestManagerSetup?: IRequestManagerSetup) => void;
};
export declare function _isFetchConfigured(): boolean;
export {};
