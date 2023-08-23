/**
* DevExpress Dashboard (_dashboard-component-name-generator.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IDisposable } from '../disposable-object';
export interface IDashboardComponent {
    getUniqueNamePrefix: () => string;
}
export declare class DashboardUniqueNameGenerator implements IDisposable {
    private _propertyName;
    private _startIndex;
    private _componentsCollections;
    private _disposables;
    constructor(_propertyName: string, _startIndex: number, ...collections: Array<ko.ObservableArray<IDashboardComponent>>);
    private _ensureUniqueName;
    dispose(): void;
}
