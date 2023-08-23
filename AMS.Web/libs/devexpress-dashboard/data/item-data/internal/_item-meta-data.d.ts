﻿/**
* DevExpress Dashboard (_item-meta-data.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataFieldType } from '../../../model';
import { DateTimeFormatInfo, NumericFormatInfo } from '../../_formatter';
import { ItemDataAxisName, ItemDataDelta, ItemDataDimension, ItemDataMeasure } from '../item-data-definitions';
export declare let deltaValueNames: {
    actualValue: string;
    targetValue: string;
    absoluteVariation: string;
    percentVariation: string;
    percentOfTarget: string;
    mainValue: string;
    subValue1: string;
    subValue2: string;
    isGood: string;
    indicatorType: string;
};
export declare let deltaValueTypes: {
    actualValue: string;
    absoluteVariation: string;
    percentVariation: string;
    percentOfTarget: string;
    targetValue: string;
};
export declare class itemMetaData {
    _metaDataDto: any;
    _measuresInfo: MeasuresInfo;
    _colorMeasuresInfo: MeasuresInfo;
    _conditionalFormattingMeasuresInfo: MeasuresInfo;
    _deltaInfo: DeltasInfo;
    _axesInfo: AxesInfo;
    _dataSourceColumns: any;
    constructor(metaDataDto: any);
    initialize(): void;
    _createMeasureInfo(descriptors: any[]): MeasuresInfo;
    _createDeltaInfo(): DeltasInfo;
    _createAxesInfo(): AxesInfo;
    getAxes(): {
        [name: string]: itemDataDimension[];
    };
    getAxisNames(): ItemDataAxisName[];
    getPivotAreaByAxisName(name: any): any;
    getColorMeasures(): itemDataMeasure[];
    getConditionalFormattingMeasures(): itemDataMeasure[];
    getDimensions(axisName?: ItemDataAxisName): itemDataDimension[];
    getMeasures(): itemDataMeasure[];
    getDeltas(): ItemDataDelta[];
    getMeasureById(id: string): itemDataMeasure;
    getDeltaById(id: any): ItemDataDelta;
    getMeasureFormat(measureId: any): any;
    getMeasureExpression(measureId: any): any;
    getMeasureCalculation(measureId: any): any;
    getMeasureWindowDefinition(measureId: any): any;
    getDeltaValueIds(deltaId: any): {
        [deltaValueName: string]: number;
    };
    getDeltaFormats(deltaId: any): {
        [deltaValueName: string]: any;
    };
    getDeltaValueType(deltaId: any): void;
    getDimensionLevel(dimensionId: any): number;
    getDimensionFormat(dimensionId: any): any;
    getDataMembers(): any;
    getFinalDataType(dataItemId: string): DataFieldType;
}
export interface DimensionDescriptorViewModel {
    ID: string;
    Name: string;
    DataMember: string;
    DateTimeGroupInterval: string;
    TextGroupInterval: string;
    Format: any;
    DataType: any;
    FinalDataType: any;
    Level: number;
}
export declare type DescriptorValueType = 'String' | 'Char' | 'DateTime' | 'Bool' | 'Byte' | 'SByte' | 'Short' | 'UShort' | 'Integer' | 'UInteger' | 'Long' | 'ULong' | 'Float' | 'Double' | 'Decimal' | 'Enum' | 'Object' | 'Unknown';
export interface itemDataDimension extends ItemDataDimension {
    dataType: DescriptorValueType;
    finalDataType: DataFieldType;
    getFormat: {
        (): NumericFormatInfo | DateTimeFormatInfo;
    };
}
export interface itemDataMeasure extends ItemDataMeasure {
    dataType: DescriptorValueType;
    finalDataType: DataFieldType;
    dataItemId: string;
}
interface AxesInfo {
    axes: {
        [name: string]: itemDataDimension[];
    };
    levelByDimensionId: {
        [dimensionId: string]: number;
    };
    formatByDimensionId: {
        [dimensionId: string]: any;
    };
    pivotAreaByAxisName: {};
}
interface MeasuresInfo {
    measures: itemDataMeasure[];
    formatByMeasureId: {};
    expressionByMeasureId: {};
    calculationByMeasureId: {};
    windowDefinitionByMeasureId: {};
}
interface DeltasInfo {
    deltas: ItemDataDelta[];
    valueIdsByDeltaId: {
        [deltaId: string]: {
            [deltaValueName: string]: number;
        };
    };
    formatsByDeltaId: {
        [deltaId: string]: {
            [deltaValueName: string]: any;
        };
    };
}
export {};
