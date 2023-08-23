﻿/**
* DevExpress Dashboard (_parameters-item-provider.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { PathRequest } from '@devexpress/analytics-core/analytics-utils';
import { Parameter } from '../../../model/parameters/parameter';
export declare class ParametersItemProvider {
    private dashboardParameters;
    constructor(dashboardParameters?: Array<Parameter>);
    getItems(pathRequest: PathRequest): JQuery.Promise<any, any, any>;
}
