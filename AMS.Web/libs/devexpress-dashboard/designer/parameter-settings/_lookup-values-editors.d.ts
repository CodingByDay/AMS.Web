/**
* DevExpress Dashboard (_lookup-values-editors.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceBrowser } from '../../common/_data-source-browser';
import { Parameter } from '../../model/parameters/parameter';
import { FormAdapterEditor } from '../form-adapter/_form-adapter-editors';
export declare const singleLookupValueEditor: FormAdapterEditor<{
    parameter: Parameter;
    dataSourceBrowser: DataSourceBrowser;
}>;
export declare const multipleLookupValueEditor: FormAdapterEditor<{
    parameter: Parameter;
    dataSourceBrowser: DataSourceBrowser;
}>;
