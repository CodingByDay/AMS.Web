﻿/**
* DevExpress Analytics (core\widgets\fieldListEditor.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Editor } from '../../property-grid/widgets/editor';
import { TreeListController } from '../../widgets/treelist/_treelistController';
export class FieldListEditor extends Editor {
    constructor(modelPropertyInfo, level, parentDisabled, textToSearch) {
        super(modelPropertyInfo, level, parentDisabled, textToSearch);
        this.path = ko.pureComputed(() => {
            return this._model() && this._model()['getPath'] && this._model()['getPath'](this.name) || '';
        });
        this.treeListController = new TreeListController();
        this._disposables.push(this.path);
        this._disposables.push(this.treeListController);
    }
}
