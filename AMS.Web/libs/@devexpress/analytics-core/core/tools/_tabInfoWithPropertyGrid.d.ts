/**
* DevExpress Analytics (core\tools\_tabInfoWithPropertyGrid.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ObjectProperties } from '../../property-grid/propertygrid';
import { ITabInfoOptions, TabInfo } from './tabInfo';
export declare class TabInfoWithPropertyGrid extends TabInfo {
    constructor(options: ITabInfoOptions);
    propertyGrid: ObjectProperties;
}
