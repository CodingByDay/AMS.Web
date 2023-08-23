﻿/**
* DevExpress Dashboard (card-layout.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { SerializableModel } from '../../serializable-model';
import { CardRow, CardRowBase, CardSparklineRow } from './card-row';
export declare class CardLayout extends SerializableModel {
    static rowTypes: {
        CardRow: {
            constructor: typeof CardRow;
        };
        CardSparklineRow: {
            constructor: typeof CardSparklineRow;
        };
    };
    templateID: ko.Observable<number>;
    minWidth: ko.Observable<number>;
    maxWidth: ko.Observable<number>;
    rows: ko.ObservableArray<CardRowBase>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    createRow(elementJSON: any, serializer: ModelSerializer): CardRowBase;
    getInfo(): ISerializationInfoArray;
    grabFrom(newLayout: CardLayout): void;
}
