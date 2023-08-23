/**
* DevExpress Analytics (core\_actionProvider.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, IDisposable } from '../serializer/utils';
import { IAction } from '../widgets/utils';
export interface IActionsProvider {
    getActions: (context: any) => IAction[];
}
export interface IDisposableActionsProvider extends IActionsProvider, IDisposable {
}
export declare class BaseActionsProvider extends Disposable implements IDisposableActionsProvider {
    actions: IAction[];
    initActions(actions: IAction[]): void;
    getActions(context: any): IAction[];
    condition(context: any): boolean;
    setDisabled: (context: any) => void;
}
