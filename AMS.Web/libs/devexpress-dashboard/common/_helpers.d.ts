﻿/**
* DevExpress Dashboard (_helpers.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { DataDashboardItem } from '../model/items/data-dashboard-item';
import { SequenceAction, WorkingModeSwitchingOptions } from './common-interfaces';
import { IDataFieldsProvider } from './_data-source-browser';
export declare function getDimensionsExpressions(dashboardItem: DataDashboardItem, dataFieldProvider: IDataFieldsProvider): JQueryPromise<{
    [dimensionName: string]: string;
}>;
export declare class CancellationToken {
    static get None(): CancellationToken;
    private _source;
    get canceled(): boolean;
    constructor(source: JQuery.Deferred<any>);
}
export interface CancelableSequenceAction extends SequenceAction {
    cancelableAction: (options: WorkingModeSwitchingOptions, cancellationToken: CancellationToken) => JQueryPromise<WorkingModeSwitchingOptions>;
}
export declare function toCancelableSequenceAction(action: SequenceAction): CancelableSequenceAction;
export declare function combineOptions(previousOptions: WorkingModeSwitchingOptions, options: WorkingModeSwitchingOptions[]): WorkingModeSwitchingOptions;
export declare const requestParamsValidator: {
    isValid(requestParams: any): boolean;
};
