/**
 * DevExtreme (esm/mobile/hide_callback.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
export var hideCallback = function() {
    var callbacks = [];
    return {
        add: function(callback) {
            if (!callbacks.includes(callback)) {
                callbacks.push(callback)
            }
        },
        remove: function(callback) {
            var indexOfCallback = callbacks.indexOf(callback);
            if (-1 !== indexOfCallback) {
                callbacks.splice(indexOfCallback, 1)
            }
        },
        fire: function() {
            var callback = callbacks.pop();
            var result = !!callback;
            if (result) {
                callback()
            }
            return result
        },
        hasCallback: function() {
            return callbacks.length > 0
        }
    }
}();
