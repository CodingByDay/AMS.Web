/**
* DevExpress Dashboard (_dashboard-event.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDisposable } from '../../model/disposable-object';
export declare class DashboardEvent<TArgs> {
    private handlers;
    add(handler: {
        (args?: TArgs): void;
    }): IDisposable;
    remove(handler: {
        (args?: TArgs): void;
    }): void;
    fire(args?: TArgs): void;
}
