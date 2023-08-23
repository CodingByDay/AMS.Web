﻿/**
* DevExpress Dashboard (_model-subscriber.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializableModel } from '@devexpress/analytics-core/analytics-utils';
import { IDisposable } from '../../model/disposable-object';
import { PropertyCategory } from '../../model/metadata/_base-metadata';
export declare class ModelSubscriber implements IDisposable {
    private _model;
    private static dxSubscription;
    private static dxSubscriptionSuspend;
    static changePropertyQuietly(property: any, func: () => any): void;
    private handlers;
    constructor(_model: ISerializableModel);
    private _unsubscribe;
    private _subscribe;
    _propertyChanged(category: PropertyCategory, model: any, propertyName: string, status: PropertyChangedStatus): void;
    registerHandler(handler: (category: PropertyCategory, model?: any, propertyName?: string, status?: PropertyChangedStatus) => void): void;
    private _isPropertySerializeModel;
    dispose(): void;
}
export declare type PropertyChangedStatus = 'added' | 'deleted' | 'changed' | 'unknown';
