/**
* DevExpress Analytics (core\tools\_tabInfoWithPropertyGrid.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ObjectProperties } from '../../property-grid/propertygrid';
import { TabInfo } from './tabInfo';
export class TabInfoWithPropertyGrid extends TabInfo {
    constructor(options) {
        super(options);
        this.propertyGrid = new ObjectProperties(ko.observable(options.model), undefined, undefined, undefined, true);
        this._disposables.push(ko.computed(() => {
            var someRendered = this.propertyGrid.getEditors().some(editor => editor.visible && editor.isRendered());
            if (someRendered) {
                this.keyboardHelper && this.keyboardHelper.initialize();
                this.focus();
            }
        }));
        this._disposables.push(this.propertyGrid);
    }
}
