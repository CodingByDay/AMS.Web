﻿/**
* DevExpress Analytics (core\internal\_resizableBinding.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export interface IResizableOptions {
    starting?: () => void;
    $element?: Element;
    stopped?: () => void;
    zoom?: number;
    minimumWidth?: ko.Observable<number> | number;
    maximumWidth?: ko.Observable<number> | number;
}
