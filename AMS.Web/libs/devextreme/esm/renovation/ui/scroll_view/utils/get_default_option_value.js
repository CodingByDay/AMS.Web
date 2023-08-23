/**
 * DevExtreme (esm/renovation/ui/scroll_view/utils/get_default_option_value.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import devices from "../../../../core/devices";
import {
    nativeScrolling
} from "../../../../core/utils/support";
import browser from "../../../../core/utils/browser";
export function isDesktop() {
    return !devices.isSimulator() && "desktop" === devices.real().deviceType && "generic" === devices.current().platform
}
export function getDefaultUseSimulatedScrollbar() {
    return !!nativeScrolling && "android" === devices.real().platform && !browser.mozilla
}
export function getDefaultBounceEnabled() {
    return !isDesktop()
}
export function getDefaultUseNative() {
    return !!nativeScrolling
}
export function getDefaultNativeRefreshStrategy() {
    return "android" === devices.real().platform ? "swipeDown" : "pullDown"
}
