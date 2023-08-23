/**
* DevExpress Dashboard (_ui-widgets.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export interface ISlidableListsNavigable {
    backClick: (item: string, pathParts: string[]) => void;
    hasSearchResults?: ko.Observable<boolean>;
    isListMode?: ko.Observable<boolean>;
}
