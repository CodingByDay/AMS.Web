﻿/**
* DevExpress Dashboard (_update-controller.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
declare type Action<T> = {
    action: () => void;
    masterActions?: T[];
};
declare type ActionMapType<T extends string> = {
    [key in T]: Action<T>;
};
export declare class UpdateController<S extends string, T extends string> {
    private _actionMap;
    private _mapActionByState;
    private _state;
    private _locker;
    private _actions;
    constructor(_actionMap: ActionMapType<T>, _mapActionByState: (stateProvider: () => S, actionName: T) => T);
    beginUpdate(): void;
    endUpdate(): void;
    commitUpdate(): void;
    addAction(actionName: T): void;
    switchControlState(controlState: S): void;
    getControlState(): S;
}
export {};
