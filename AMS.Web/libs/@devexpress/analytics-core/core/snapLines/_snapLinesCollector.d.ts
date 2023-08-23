﻿/**
* DevExpress Analytics (core\snapLines\_snapLinesCollector.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISnapLine } from './_snapLineSurface';
import { IArea } from '../elements/baseSurface';
export declare class SnapLinesCollector {
    private _verticalSnapLines;
    private _horizontalSnapLines;
    private _snapTargetToIgnore;
    private _appendSnapLine;
    private _collectSnaplines;
    _getCollection(parent: any): {
        rect: ko.Observable<IArea>;
    }[];
    _enumerateCollection(parent: any, parentAbsoluteProsition: {
        top: number;
        left: number;
    }, callback: (item: any, itemAbsoluteRect: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    }) => void): void;
    collectSnaplines(root: any, snapTargetToIgnore: any): {
        vertical: ISnapLine[];
        horizontal: ISnapLine[];
    };
}
