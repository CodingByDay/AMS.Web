﻿/**
* DevExpress Analytics (core\utils\_utils.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import * as ko from 'knockout';
import { calculateWithZoomFactor } from '../../accessibility/_internal';
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { noDataText, searchPlaceholder, selectPlaceholder } from '../../property-grid/localization/_localization';
import { editorTemplates } from '../../property-grid/widgets/editorsInfo';
import { createGlobalModuleVariableFunc } from '../../serializer/_internal';
import { extend } from '../../serializer/_utils';
import { getParentContainer } from '../../widgets/_utils';
import { ajaxSetup } from '../internal/ajaxSetup';
import { dxversions } from '../internal/dx-versions';
import { _errorProcessor, _processError } from '../internal/_processError';
import { convertFromCssPixelUnits } from '../internal/_utils';
import { getErrorMessage as igetErrorMessage } from './_infoMessageHelpers';
import { objectsVisitor } from './_visitors';
import { requestManager } from '../internal/requestManager';
import { fetchSetup } from '../internal/fetchSetup';
export function copyObservables(from, to) {
    Object.keys(from || {}).forEach((name) => {
        if (ko.isObservable(from[name])) {
            to[name](from[name]());
        }
        else if (!$.isFunction(from[name])) {
            copyObservables(from[name], to[name]);
        }
    });
}
export function _wrapModelInObservable(model) {
    return ko.isWritableObservable(model) ? model : ko.observable(null);
}
export function collectGroupsFromFlatList(list, getGroupId) {
    var temp = {};
    return list.reduce((res, val) => {
        var groupId = getGroupId(val);
        if (groupId) {
            if (temp[groupId])
                temp[groupId].push(val);
            else {
                var group = { group: groupId, items: [val] };
                res.push(group);
                temp[groupId] = group.items;
            }
        }
        return res;
    }, []);
}
export function compareObjects(a, b) {
    var result = a && b && !(a instanceof Array) && !(b instanceof Array);
    result = result && (Object.getOwnPropertyNames(a).length === Object.getOwnPropertyNames(b).length);
    if (result) {
        Object.keys(a || {}).some((name) => {
            if (name.indexOf('_') !== 0 && (typeof a[name] !== 'function' || ko.isObservable(a[name]))) {
                if (ko.isObservable(a[name])) {
                    result = ko.unwrap(a[name]) === ko.unwrap(b[name]);
                }
                else if (a[name] instanceof Array) {
                    if ((b[name] instanceof Array) && a[name].length === b[name].length) {
                        for (var i = 0; i < a[name].length; i++) {
                            result = compareObjects(a[name][i], b[name][i]);
                            if (result === false)
                                break;
                        }
                    }
                    else {
                        result = false;
                    }
                }
                else if (a[name] instanceof Object) {
                    result = compareObjects(a[name], b[name]);
                }
                else {
                    result = a[name] === b[name];
                }
                return !result;
            }
        });
    }
    return result;
}
export var cssTransform = ['-webkit-transform', '-moz-transform', '-ms-transform', '-o-transform', 'transform'];
export function getFullPath(path, dataMember) {
    return path + (dataMember ? '.' + dataMember : '');
}
export function loadTemplates() {
    var promises = $.fn.constructor("script[type='text/html']").map(function (_, script) {
        if (script.src) {
            var deffered = $.Deferred();
            $.get(script.src)
                .done(function (tmpl) {
                script.text = tmpl;
                if (tmpl.indexOf('type="text/html"') !== -1 || tmpl.indexOf("type='text/html'") !== -1) {
                    $.fn.constructor(document.body).append(tmpl);
                }
                deffered.resolve();
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                deffered.reject();
            });
            return deffered.promise();
        }
    });
    return $.when.apply($.when, promises);
}
export function getSizeFactor(width) {
    if (width < 768) {
        return 'xs';
    }
    else if (width < 992) {
        return 'sm';
    }
    else if (width < 1200) {
        return 'md';
    }
    else if (width < 1380) {
        return 'lg';
    }
    else {
        return 'xl';
    }
}
export var staticContext = {
    _static: {
        searchPlaceholder: () => searchPlaceholder(),
        selectPlaceholder: () => selectPlaceholder(),
        noDataText: () => noDataText(),
        ajaxSetup: ajaxSetup
    }
};
export var _defaultStaticContext = createGlobalModuleVariableFunc({});
export function appendStaticContextToRootViewModel(root, dx = staticContext, className) {
    if (dx)
        root.dx = Object.assign(Object.assign({}, dx), _defaultStaticContext());
    root.getLocalization = function () {
        return getLocalization.apply(root, arguments);
    };
    root.getPopupContainer = getParentContainer;
    root.calculateWithZoomFactor = calculateWithZoomFactor;
    root.surfaceClass = (el) => 'dx-designer-viewport dx-designer-viewport-' + getSizeFactor(el.clientWidth) +
        ' ' + (!getParentContainer(el, '.dx-theme-generic').length ? ' dx-theme-generic' : '') +
        (className ? ' ' + className : '');
}
export function _ajax(uri, action, arg, processErrorCallback, ignoreError, customOptions, isError = (data) => !data.success, getErrorMessage = igetErrorMessage, method = 'POST') {
    var deferred = $.Deferred();
    var requestData;
    if (action !== undefined && arg !== undefined) {
        requestData = {
            actionKey: action,
            arg: arg,
            dxversions: JSON.stringify(dxversions)
        };
    }
    const requestManagerSetup = {
        ajaxSetup,
        fetchSetup
    };
    requestManager.getInstance(requestManagerSetup).sendRequest(extend({}, {
        type: method,
        data: requestData,
        url: uri
    }, customOptions)).fail((jqXHR, textStatus, errorThrown) => {
        if (ignoreError && ignoreError()) {
            deferred.reject();
            return;
        }
        _errorProcessor.call({ jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown, getRequestDetails: () => requestData || uri });
        _processError(errorThrown, deferred, jqXHR, textStatus, processErrorCallback);
    })
        .done((data, textStatus, jqXHR) => {
        if (!data) {
            deferred.reject();
            return;
        }
        if (!isError(data)) {
            deferred.resolve(data.result);
        }
        else {
            if (ignoreError && ignoreError()) {
                deferred.reject();
                return;
            }
            _errorProcessor.call({ jqXHR: jqXHR, textStatus: textStatus, data: data, errorThrown: getErrorMessage(jqXHR), getRequestDetails: () => requestData || uri });
            _processError('Internal Server Error', deferred, jqXHR, textStatus, processErrorCallback);
        }
    });
    return deferred.promise();
}
export function _ajaxWithOptions(options) {
    return _ajax(options.uri, options.action, options.arg, options.processErrorCallback, options.ignoreError, options.customOptions, options.isError, options.getErrorMessage, options.method);
}
export var ajax = (...params) => {
    if (params.length > 1) {
        return _ajax.apply(this, params);
    }
    else {
        return _ajaxWithOptions(params[0]);
    }
};
export function setAjax(newFunc) {
    ajax = newFunc;
}
export function cutRefs(model) {
    objectsVisitor(model, (target) => {
        delete target['@Ref'];
    });
    return model;
}
export var DesignerBaseElements = {
    MenuButton: 'dxrd-menubutton-template-base',
    Toolbar: 'dxrd-toolbar-template-base',
    Toolbox: 'dxrd-toolbox-template-base',
    GroupedToolbox: 'dxrd-grouped-toolbox-template-base',
    Surface: 'dxrd-surface-template-base',
    RightPanel: 'dxrd-right-panel-template-base'
};
export function generateDefaultParts(model) {
    return [
        { id: DesignerBaseElements.MenuButton, templateName: DesignerBaseElements.MenuButton, model: model },
        { id: DesignerBaseElements.Toolbar, templateName: DesignerBaseElements.Toolbar, model: model },
        { id: DesignerBaseElements.Toolbox, templateName: DesignerBaseElements.Toolbox, model: model },
        { id: DesignerBaseElements.Surface, templateName: DesignerBaseElements.Surface, model: model },
        { id: DesignerBaseElements.RightPanel, templateName: DesignerBaseElements.RightPanel, model: model }
    ];
}
export function createActionWrappingFunction(wrapperName, func) {
    return (actions) => {
        actions.forEach(action => {
            if (!action['wrappedWith'] || action['wrappedWith'].indexOf(wrapperName) === -1) {
                var oldClickHandler = action.clickAction;
                action.clickAction = (model) => {
                    return func(model, oldClickHandler);
                };
                action['wrappedWith'] = action['wrappedWith'] || [];
                action['wrappedWith'].push(wrapperName);
            }
        });
    };
}
export function localizeNoneString(noneValue) {
    var value = ko.unwrap(noneValue);
    if (value === 'none') {
        return getLocalization('none', 'DataAccessStringId.ParameterListEmpty');
    }
    else if (value === '(none)') {
        return (getLocalization('(none)', 'DxDesignerStringId.None') !== '(none)') ? getLocalization('(none)', 'DxDesignerStringId.None') : ('(' + getLocalization('none', 'DataAccessStringId.ParameterListEmpty') + ')');
    }
    return value;
}
export function parseZoom(val) {
    var _value = Math.round(parseInt(val.replace('%', ''))) / 100;
    if (!_value)
        return 1;
    if (_value >= 5)
        return 5;
    if (_value <= 0.1)
        return 0.1;
    return _value;
}
export function getResizableOptions($element, panelOffset, minWidth, position, startPosition, width, disabled) {
    const disabledOption = ko.unwrap(disabled);
    const minWidthOption = ko.unwrap(minWidth);
    return {
        starting: function (e) {
            $.fn.constructor($element).css(position === startPosition ? 'right' : 'left', '');
        },
        handles: ko.observable(position === startPosition ? 'e' : 'w'),
        stopped: $.noop,
        stop: $.noop,
        resize: function (event, element) {
            const startResizePosition = convertFromCssPixelUnits(element.dataset.originalLeftMousePosition);
            const originalWidth = convertFromCssPixelUnits(element.dataset.originalWidth);
            const sizeDiff = event.x - startResizePosition;
            $.fn.constructor($element).css({ left: position === startPosition ? panelOffset + 'px' : '', right: position === startPosition ? '' : panelOffset + 'px' });
            const newWidth = Math.min(Math.max(minWidthOption, position === startPosition ? originalWidth + sizeDiff : originalWidth - sizeDiff), 1000);
            width && ko.isObservable(width) && width(newWidth);
        },
        disabled: disabled || false,
        zoom: 1,
        minimumWidth: ko.observable(disabledOption ? 0 : minWidthOption),
        maximumWidth: 1000,
        $element: $element
    };
}
export function createPasswordSerializationInfo(info, isNew = true) {
    info.editor = editorTemplates.getEditor('text');
    info.editorOptions = { mode: 'password' };
    if (isNew)
        info.editorOptions.inputAttr = { autocomplete: 'new-password' };
    return info;
}
