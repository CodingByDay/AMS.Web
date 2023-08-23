﻿/**
* DevExpress Analytics (core\utils\_units.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { MeasureUnit } from '../internal/_papperKindMapper';
export declare function roundingXDecimals(value: number, useFloor?: boolean, x?: number): number;
export declare function unitsToPixel(val: number, measureUnit: MeasureUnit, zoom?: number): number;
export declare function pixelToUnits(val: number, measureUnit: MeasureUnit, zoom: number): number;
export interface IUnitProperties<M> {
    [key: string]: (o: M) => ko.Observable<number> | ko.Computed<number>;
}
export declare function createUnitProperty<M>(model: M, target: object, propertyName: string, property: (o: M) => ko.Observable<number> | ko.Computed<number>, measureUnit: ko.Observable<MeasureUnit> | ko.Computed<MeasureUnit>, zoom: ko.Observable<number> | ko.Computed<number>, afterCreation?: (property: any) => void): void;
export declare function createUnitProperties<M>(model: M, target: object, properties: IUnitProperties<M>, measureUnit: ko.Observable<MeasureUnit> | ko.Computed<MeasureUnit>, zoom: ko.Observable<number> | ko.Computed<number>, afterCreation?: (property: any) => void): void;
