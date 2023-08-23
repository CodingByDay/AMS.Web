/**
* DevExpress Dashboard (_tab-container-item-bindings.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { LayoutItem } from '../core/_layout-item';
import { GroupViewModel } from '../group-item/_group-item-bindings';
export declare class TabContainerViewModel extends GroupViewModel {
    activeItems: ko.ObservableArray<LayoutItem>;
    private _activeItemsUpdateDebounced;
    constructor(params: {
        layoutItem: ko.Observable<LayoutItem> | LayoutItem;
    });
    private _updateActiveItems;
}
