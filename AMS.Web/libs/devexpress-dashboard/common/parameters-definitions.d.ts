﻿/**
* DevExpress Dashboard (parameters-definitions.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PrimitiveType } from '../data/types';
export interface DashboardParameterLookUpValue {
    getDisplayText(): string;
    getValue(): any;
}
export interface DashboardParameter {
    getName(): string;
    getValue(): PrimitiveType | Array<PrimitiveType>;
    setValue(value: PrimitiveType | Array<PrimitiveType>): any;
    getDefaultValue(): PrimitiveType | Array<PrimitiveType>;
    getDescription(): string;
    getType(): string;
    getLookUpValues(): Array<DashboardParameterLookUpValue>;
}
export interface DashboardParameterCollection {
    getParameterList(): Array<DashboardParameter>;
    getParameterByName(name: string): DashboardParameter;
    getParameterByIndex(index: number): DashboardParameter;
}
