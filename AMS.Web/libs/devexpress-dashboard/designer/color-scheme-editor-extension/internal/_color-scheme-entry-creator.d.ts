﻿/**
* DevExpress Dashboard (_color-scheme-entry-creator.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Color } from '../../../model/color';
import { ColorSchemeEntry } from '../../../model/colorization/color-scheme-entry';
import { DimensionKey } from '../../../model/colorization/dimension-key';
import { MeasureDefinition } from '../../../model/colorization/measure-definition';
import { DimensionDefinition } from '../../../model/colorization/_dimension-definition';
import { DataItem } from '../../../model/data-item/data-item';
import { Dimension } from '../../../model/data-item/dimension';
import { Measure } from '../../../model/data-item/measure';
export declare class ColorSchemeEntryCreator {
    constructor();
    static createMeasureKey(dataMember: string, summaryType: string): MeasureDefinition;
    static createMeasureDefinitionFromMeasure(measure: Measure, otherDataItems: DataItem[]): MeasureDefinition;
    static createDimensionDefinitionFromDimension(dimension: Dimension): DimensionDefinition;
    static createMeasureDefinitionCopy(measureKey: MeasureDefinition): MeasureDefinition;
    static createDimensionKey(dataMember: string, groupInterval: string, valueType: string, value: any): DimensionKey;
    addColor(color: Color): ColorSchemeEntryCreator;
    addItemComponentName(name: string): ColorSchemeEntryCreator;
    addPaletteIndex(paletteIndex: number): ColorSchemeEntryCreator;
    addDataSourceName(dataSourceName: string): ColorSchemeEntryCreator;
    addDataMemberName(dataMember: string): ColorSchemeEntryCreator;
    addMeasureKey(dataMember: string, summaryType: string): ColorSchemeEntryCreator;
    addDimensionKey(dataMember: string, groupInterval: string, valueType: string, value: any): ColorSchemeEntryCreator;
    getEntry(): ColorSchemeEntry;
    private _entry;
}
