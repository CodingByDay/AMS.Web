﻿/**
* DevExpress Dashboard (_group-item-bindings.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DisposableObject } from '../../../model/disposable-object';
import { LayoutItem } from '../core/_layout-item';
export declare class GroupViewModel extends DisposableObject {
    defaultPadding: number;
    constructor(params: {
        layoutItem: ko.Subscribable<LayoutItem> | LayoutItem;
    });
    padding: ko.Observable<number>;
    headerHeight: ko.Observable<number>;
    layoutItem: ko.Computed<LayoutItem>;
}
