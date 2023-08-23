﻿/**
* DevExpress Analytics (core\widgets\registerDesignerEditors.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '../../property-grid/widgets/editorsInfo';
import { GuidEditor } from '../../property-grid/widgets/guideditor';
import { RequiredNullableEditor, createNumericEditor } from './_requiredNullableEditor';
import { PropertyGridEditor } from '../../property-grid/propertygrid';
import { FieldListEditor } from './fieldListEditor';
import { DataMemberEditor } from './dataMemberEditor';
import { ColorPickerEditor } from './colorPickerEditor';
export function registerDesignerEditors() {
    editorTemplates.registerEditors({
        guid: { header: 'dxrd-guid', editorType: GuidEditor },
        date: { header: 'dx-date', editorType: RequiredNullableEditor },
        borders: { header: 'dxrd-borders' },
        textAlignment: { header: 'dxrd-textalignment' },
        objecteditorCustom: { custom: 'dxrd-objectEditorContent', editorType: PropertyGridEditor },
        field: { header: 'dxrd-field', editorType: FieldListEditor },
        dataMember: { header: 'dxrd-field', editorType: DataMemberEditor },
        filterEditor: { header: 'dxrd-filterstring' },
        formatEditor: { header: 'dxrd-formatstring' },
        expressionEditor: { header: 'dxrd-expressionstring' },
        customColorEditor: { header: 'dxrd-colorpicker', editorType: ColorPickerEditor },
        sbyte: createNumericEditor('System.SByte', 'integer'),
        decimal: createNumericEditor('System.Decimal', 'float'),
        int64: createNumericEditor('System.Int64', 'integer'),
        int32: createNumericEditor('System.Int32', 'integer'),
        int16: createNumericEditor('System.Int16', 'integer'),
        single: createNumericEditor('System.Single', 'float'),
        double: createNumericEditor('System.Double', 'float'),
        byte: createNumericEditor('System.Byte', 'integer'),
        uint16: createNumericEditor('System.UInt16', 'integer'),
        uint32: createNumericEditor('System.UInt32', 'integer'),
        uint64: createNumericEditor('System.UInt64', 'integer')
    });
}
