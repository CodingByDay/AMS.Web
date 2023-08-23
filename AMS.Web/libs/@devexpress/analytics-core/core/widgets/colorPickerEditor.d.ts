/**
* DevExpress Analytics (core\widgets\colorPickerEditor.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Editor } from '../../property-grid/widgets/editor';
import { ISerializationInfo } from '../../serializer/serializationInfo';
export declare class ColorPickerEditor extends Editor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    displayValue: ko.Computed<string>;
}
