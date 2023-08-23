/**
* DevExpress Dashboard (_custom-item-properties-composer-helper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ICustomItemProperty } from '../../../model/items/custom-item/property';
import { FormAdapterItem } from '../../../model/metadata/_base-metadata';
export declare class CustomItemPropertiesComposerHelper {
    private static _getEditorValues;
    private static _mapEditor;
    static convertToDashboardSerializationInfo(property: ICustomItemProperty): {
        propertyName: string;
        formAdapterItem: FormAdapterItem;
        editorOptions: any;
    };
}
