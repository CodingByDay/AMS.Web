/**
 * DevExtreme (esm/renovation/utils/resolve_rtl.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    isDefined
} from "../../core/utils/type";
import globalConfig from "../../core/config";
export function resolveRtlEnabled(rtlProp, config) {
    if (void 0 !== rtlProp) {
        return rtlProp
    }
    if (void 0 !== (null === config || void 0 === config ? void 0 : config.rtlEnabled)) {
        return config.rtlEnabled
    }
    return globalConfig().rtlEnabled
}
export function resolveRtlEnabledDefinition(rtlProp, config) {
    var isPropDefined = isDefined(rtlProp);
    var onlyGlobalDefined = isDefined(globalConfig().rtlEnabled) && !isPropDefined && !isDefined(null === config || void 0 === config ? void 0 : config.rtlEnabled);
    return isPropDefined && rtlProp !== (null === config || void 0 === config ? void 0 : config.rtlEnabled) || onlyGlobalDefined
}
