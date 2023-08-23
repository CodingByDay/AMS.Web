﻿/**
* DevExpress Analytics (core\widgets\_buttonInlineEditor.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import registerComponent from 'devextreme/core/component_registrator';
import 'devextreme/ui/button';
import dxButton from 'devextreme/ui/button';
import * as $ from 'jquery';
import * as ko from 'knockout';
var editor_template = {
    render: function (options) {
        var $icon = $.fn.constructor('<i />').addClass('dx-icon');
        if (!!options.model.iconClass) {
            $icon.addClass(options.model.iconClass);
            $icon.addClass('dx-icon-' + options.model.iconClass);
            $icon.addClass('dx-icon-dxrd');
        }
        else if (!!options.model.icon) {
            $icon.addClass(options.model.icon);
        }
        if (options.model.icon) {
            $icon.attr('data-bind', "template: '" + options.model.icon + "'");
        }
        var icon = $icon.get(0);
        $.fn.constructor(options.container).append(icon);
        if (options.model.text) {
            var $span = $.fn.constructor('<span />').addClass('dx-button-text');
            $span.text(options.model.text);
            $.fn.constructor(options.container).append($span);
        }
        setTimeout(() => {
            if (!ko.dataFor(icon))
                ko.applyBindings(options.model, icon);
        }, 1);
    }
};
export class dxButtonWithTemplate extends dxButton {
    constructor(element, options) {
        options['template'] = editor_template;
        super(element, options);
    }
    _patchOptionValues(options) {
        var patchedOptions = super['_patchOptionValues'].call(this, options);
        var optionsToExtend = { iconClass: options['iconClass'] };
        ko.utils.extend(patchedOptions.templateData, optionsToExtend);
        return patchedOptions;
    }
}
registerComponent('dxButtonWithTemplate', dxButtonWithTemplate);
