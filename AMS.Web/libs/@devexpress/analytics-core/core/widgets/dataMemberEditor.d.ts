/**
* DevExpress Analytics (core\widgets\dataMemberEditor.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { FieldListEditor } from './fieldListEditor';
import { DataMemberTreeListController } from './_dataMemberEditor';
export declare class DataMemberEditor extends FieldListEditor {
    constructor(modelPropertyInfo: any, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    treeListController: DataMemberTreeListController;
}
