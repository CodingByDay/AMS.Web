/**
* DevExpress Dashboard (_datasource-chooser-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { SliderController } from './_field-chooser-surface';
export declare class DataSourceChooserController extends SliderController {
    constructor(params: {
        dataSourceBrowser: DataSourceBrowser;
        dataSource: ko.Observable<string>;
        dataMember: ko.Observable<string>;
        active: ko.Observable<boolean>;
    });
}
