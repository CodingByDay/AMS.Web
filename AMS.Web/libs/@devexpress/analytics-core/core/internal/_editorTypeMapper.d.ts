﻿/**
* DevExpress Analytics (core\internal\_editorTypeMapper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IEditorInfo } from '../../serializer/serializationInfo';
export declare const ExpressionType = "DevExpress.DataAccess.Expression";
export declare function IsDataAccessExpression(type: string): boolean;
export declare var editorTypeMapper: {
    [key: string]: IEditorInfo;
};
export declare function getEditorType(typeString: string): {
    header?: any;
    content?: any;
    custom?: any;
};
