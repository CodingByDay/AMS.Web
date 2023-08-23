/**
* DevExpress Dashboard (color-scheme-definition.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IDimensionDefinition } from './dimension-key';
export declare class ColorSchemeDefinition {
    dataSource: string;
    dataMember: string;
    dimensionDefinitions: IDimensionDefinition[];
    colorByMeasures: boolean;
    componentName: string;
    private name;
    key: ko.Computed<string>;
    typeText: ko.Computed<string>;
    dataSourceText: ko.Computed<string>;
    dataItems: ko.Computed<string[]>;
    constructor(dataSource: string, dataMember: string, dimensionDefinitions: IDimensionDefinition[], colorByMeasures?: boolean, componentName?: string, name?: string);
    equals(definition: ColorSchemeDefinition): boolean;
    _getDataSourceText(dataSourceName: string): string;
}
