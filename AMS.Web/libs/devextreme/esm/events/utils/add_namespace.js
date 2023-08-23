/**
 * DevExtreme (esm/events/utils/add_namespace.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import errors from "../../core/errors";
var addNamespace = (eventNames, namespace) => {
    if (!namespace) {
        throw errors.Error("E0017")
    }
    if (Array.isArray(eventNames)) {
        return eventNames.map(eventName => addNamespace(eventName, namespace)).join(" ")
    }
    if (-1 !== eventNames.indexOf(" ")) {
        return addNamespace(eventNames.split(/\s+/g), namespace)
    }
    return "".concat(eventNames, ".").concat(namespace)
};
export default addNamespace;
