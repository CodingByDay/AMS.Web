/**
* DevExpress Analytics (core\tools\tabInfo.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { getLocalization } from '../../property-grid/localization/_localization';
import { SvgTemplatesEngine } from '../../property-grid/widgets/internal/_svgTemplateEngine';
import { Disposable } from '../../serializer/utils';
export class TabInfo extends Disposable {
    constructor(options) {
        super();
        this.active = ko.observable(false);
        this.visible = ko.observable();
        this.disabled = ko.observable();
        var imageBaseName = options.imageClassName || options.text.toLowerCase();
        this._text = options.text;
        this.name = options.text;
        this._localizationId = options.localizationId;
        this._disposables.push(this.imageClassName = ko.pureComputed(() => {
            return 'dxrd-image-' + imageBaseName;
        }));
        this.imageTemplateName = options.imageTemplateName || SvgTemplatesEngine.getExistingTemplate('dxrd-svg-tabs-' + options.text.toLowerCase());
        this.template = options.template;
        this._disposables.push(options.model, options.keyboardHelper);
        var computedVisible = options.visible;
        var computedDisabled = options.disabled;
        this._disposables.push(this.visible = ko.pureComputed(() => { return computedVisible !== undefined ? computedVisible() : true; }));
        this._disposables.push(this.disabled = ko.pureComputed(() => { return computedDisabled !== undefined ? computedDisabled() : false; }));
        this._disposables.push(this.visible.subscribe((visibility) => {
            if (!visibility) {
                this.active(false);
            }
        }));
        computedVisible && this._disposables.push(computedVisible);
        computedDisabled && this._disposables.push(computedDisabled);
        this.model = options.model;
        this.keyboardHelper = options.keyboardHelper;
        if (this.keyboardHelper)
            this._disposables.push(ko.computed(() => {
                if (this.active() && this.collapsed && !this.collapsed())
                    this.focus();
            }).extend({ rateLimit: 0 }));
    }
    focus() {
        this.keyboardHelper && this.keyboardHelper.focus(document.getElementsByClassName('dxrd-tab-item dxd-state-active')[0]);
    }
    get text() {
        return getLocalization(this._text, this._localizationId);
    }
}
