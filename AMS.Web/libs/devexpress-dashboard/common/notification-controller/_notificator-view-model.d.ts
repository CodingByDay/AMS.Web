﻿/**
* DevExpress Dashboard (_notificator-view-model.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Notification } from '../../model/internal/_interfaces';
export declare class NotificationControllerViewModel {
    private _visible;
    private _widget;
    visible: ko.Observable<boolean>;
    type: ko.Observable<string>;
    notifications: ko.ObservableArray<Notification>;
    suspended: ko.Observable<boolean>;
    displayTime: ko.Computed<number>;
    onHidden: () => void;
    onInitialized: (args: any) => void;
    reset(): void;
    updateNotification(type: string, title: string, detail?: any): void;
}
