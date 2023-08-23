﻿/**
* DevExpress Analytics (core\tools\toolbox.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { getTypeNameFromFullName, getImageClassName } from '../internal/_getNameHelpers';
import { SvgTemplatesEngine } from '../../property-grid/widgets/internal/_svgTemplateEngine';
export class ToolboxItem {
    constructor(info) {
        this.disabled = ko.observable(false);
        this.info = info;
    }
    get type() {
        return getTypeNameFromFullName(this.info['@ControlType']);
    }
    get imageClassName() {
        return [getImageClassName(this.type), this.disabled() ? 'dxrd-disabled-button' : ''].join(' ');
    }
    get imageTemplateName() {
        var _a;
        var _templateName = getImageClassName(this.type, true);
        return (_a = SvgTemplatesEngine.getExistingTemplate(_templateName)) !== null && _a !== void 0 ? _a : SvgTemplatesEngine.getExistingTemplate('dxrd-svg-toolbox-unknown');
    }
    get index() {
        return this.info.index;
    }
    get displayName() {
        return this.info.displayName || this.type;
    }
}
