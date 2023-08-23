/**
* DevExpress Analytics (core\internal\_utils.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IElementMetadata } from '../elements/elementViewModel';
import { ToolboxItem } from '../tools/toolbox';
export declare function getToolboxItems(controlsMap: {
    [key: string]: IElementMetadata;
}, defaultGroup?: string): ToolboxItem[];
export declare function blur(element: Element): void;
export declare const convertToCssPixelUnits: (value: number) => string;
export declare const convertFromCssPixelUnits: (value: string) => number;
export declare function isDefined(object: any): boolean;
