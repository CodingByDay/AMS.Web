﻿/**
* DevExpress Dashboard (disposable-object.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export interface IDisposable {
    dispose(): void;
}
export declare type DisposableType = IDisposable | ko.Subscription | ko.ComputedFunctions;
export declare class DisposableObject implements IDisposable {
    protected _disposables: Array<DisposableType>;
    protected disposed: boolean;
    protected toDispose(...disposables: DisposableType[]): void;
    dispose(): void;
}
