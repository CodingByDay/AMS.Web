/**
* DevExpress Dashboard (form-item-templates.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DxElement } from 'devextreme/core/element';
import dxForm from 'devextreme/ui/form';
export declare class FormItemTemplates {
    static buttonGroup: ((data: {
        component?: dxForm;
        dataField?: string;
        editorOptions?: any;
        editorType?: string;
        name?: string;
    }, itemElement: DxElement) => Element);
}
