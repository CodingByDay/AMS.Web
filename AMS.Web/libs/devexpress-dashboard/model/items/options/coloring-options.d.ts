/**
* DevExpress Dashboard (coloring-options.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ColoringMode } from '../../enums';
import { SerializableModel } from '../../serializable-model';
export declare class DashboardItemColoringOptions extends SerializableModel {
    useGlobalColors: ko.Observable<boolean>;
    measuresColoringMode: ko.Observable<ColoringMode>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
