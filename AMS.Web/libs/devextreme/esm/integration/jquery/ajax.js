/**
 * DevExtreme (esm/integration/jquery/ajax.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import jQuery from "jquery";
import ajax from "../../core/utils/ajax";
import useJQueryFn from "./use_jquery";
var useJQuery = useJQueryFn();
if (useJQuery) {
    ajax.inject({
        sendRequest: function(options) {
            if (!options.responseType && !options.upload) {
                return jQuery.ajax(options)
            }
            return this.callBase.apply(this, [options])
        }
    })
}
