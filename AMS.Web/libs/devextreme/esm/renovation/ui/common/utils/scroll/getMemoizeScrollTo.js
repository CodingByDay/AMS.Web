/**
 * DevExtreme (esm/renovation/ui/common/utils/scroll/getMemoizeScrollTo.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
export function getMemoizeScrollTo(getScrollableInstance) {
    var instance = getScrollableInstance();
    var lastParams = {};
    return function(params) {
        var force = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : false;
        var normalizedParams = {
            top: void 0 !== params.top ? Math.ceil(params.top) : void 0,
            left: void 0 !== params.left ? Math.ceil(params.left) : void 0
        };
        var isSameParams = normalizedParams.top === lastParams.top && normalizedParams.left === lastParams.left;
        if (!force && isSameParams) {
            return
        }
        lastParams = normalizedParams;
        instance.scrollTo(params)
    }
}
