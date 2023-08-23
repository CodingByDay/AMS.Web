﻿/**
* DevExpress Analytics (core\widgets\colorPickerEditor.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Editor } from '../../property-grid/widgets/editor';
export class ColorPickerEditor extends Editor {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, level, parentDisabled, textToSearch);
        this._disposables.push(this.displayValue = ko.pureComputed({
            read: () => {
                var value = ko.unwrap(this.value);
                if (!value)
                    return undefined;
                if (value && value.toLowerCase() === 'transparent') {
                    return 'rgba(0,0,0,0)';
                }
                if ((/^rgba\s*\((\s*[a-f\d]+\s*,){3}\s*[a-f\d]+\s*\)$/i).test(value))
                    return value;
                var div = document.createElement('div');
                div.style.backgroundColor = value;
                return div.style.backgroundColor || 'rgba(0,0,0,1)';
            },
            write: (val) => {
                this.value(val);
            }
        }));
    }
}
