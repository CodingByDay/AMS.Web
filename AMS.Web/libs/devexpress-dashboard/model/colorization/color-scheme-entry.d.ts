﻿/**
* DevExpress Dashboard (color-scheme-entry.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { Color } from '../color';
import { IDashboardComponent } from '../internal/_dashboard-component-name-generator';
import { TypedSerializableModel } from '../serializable-model';
import { ColorSchemeDefinition } from './color-scheme-definition';
import { DimensionKey } from './dimension-key';
import { MeasureDefinition } from './measure-definition';
export declare class ColorSchemeEntry extends TypedSerializableModel implements IDashboardComponent {
    itemComponentName: string;
    private name;
    dataSource: ko.Observable<string>;
    dataMember: ko.Observable<string>;
    color: ko.Observable<Color>;
    paletteIndex: ko.Observable<number>;
    displayText: ko.Subscribable<string>;
    colorText: ko.Computed<string>;
    measureKeys: ko.ObservableArray<MeasureDefinition>;
    dimensionKeys: ko.ObservableArray<DimensionKey>;
    componentName: ko.Subscribable<string>;
    private _definition;
    get custom(): boolean;
    get definition(): ColorSchemeDefinition;
    constructor(modelJson?: any, serializer?: ModelSerializer, itemComponentName?: string, name?: string);
    getInfo(): ISerializationInfoArray;
    clone(): ColorSchemeEntry;
    equals(entry: ColorSchemeEntry): boolean;
    getUniqueNamePrefix(): string;
    protected _getDefaultItemType(): string;
}
export declare class AutoColorSchemeEntry extends ColorSchemeEntry {
    constructor(modelJson: any, serializer: ModelSerializer, componentName: string, name: string);
    get custom(): boolean;
}
