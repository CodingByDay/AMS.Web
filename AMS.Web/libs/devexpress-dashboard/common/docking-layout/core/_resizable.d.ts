﻿/**
* DevExpress Dashboard (_resizable.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export interface IResizableModel {
    width: ko.Subscribable<number>;
    height: ko.Subscribable<number>;
    isValidWidth?: (width: number) => boolean;
    isValidHeight?: (width: number) => boolean;
    resizeHandles: () => string;
    resizeStarted?: () => void;
    resizeCompleted?: () => void;
}
