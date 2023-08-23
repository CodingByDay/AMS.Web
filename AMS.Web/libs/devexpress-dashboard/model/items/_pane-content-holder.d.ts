﻿/**
* DevExpress Dashboard (_pane-content-holder.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { PropertyCategory } from '../metadata/_base-metadata';
export declare function getCategoryContentName(category: PropertyCategory): string;
export declare class PaneContentHolder {
    private _content;
    private _lastChangeReason;
    get lastChangeReason(): PropertyCategory;
    _getContentInfo(category: PropertyCategory): {
        category: string;
        content: ko.Observable<any>;
        requestsInProgress: ko.Observable<number>;
        needAnotherRequest: boolean;
    };
    getContent(category: PropertyCategory): any;
    valid: ko.Computed<boolean>;
    isValid(category: PropertyCategory): boolean;
    isWaitingForContent(category?: PropertyCategory): boolean;
    getCompatibleCategories(category: PropertyCategory): any;
    needRequestContentFromServer(category: PropertyCategory): boolean;
    itemChanged(category?: PropertyCategory): void;
    beginRequest(category: PropertyCategory): void;
    endRequest(args: {
        category?: PropertyCategory;
        response?: any;
    }): void;
}
