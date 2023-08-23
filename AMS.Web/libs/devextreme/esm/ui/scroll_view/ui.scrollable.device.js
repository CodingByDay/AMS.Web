/**
 * DevExtreme (esm/ui/scroll_view/ui.scrollable.device.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import devices from "../../core/devices";
import {
    nativeScrolling,
    touch
} from "../../core/utils/support";
export var deviceDependentOptions = function() {
    return [{
        device: function() {
            return !nativeScrolling
        },
        options: {
            useNative: false
        }
    }, {
        device: function(_device) {
            return !devices.isSimulator() && "desktop" === devices.real().deviceType && "generic" === _device.platform
        },
        options: {
            bounceEnabled: false,
            scrollByThumb: true,
            scrollByContent: touch,
            showScrollbar: "onHover"
        }
    }]
};
