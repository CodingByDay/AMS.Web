/**
 * DevExtreme (esm/ui/popover/ui.popover.full.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import "../toolbar";
import Popover from "../popover/ui.popover";
import registerComponent from "../../core/component_registrator";
import {
    extend
} from "../../core/utils/extend";
export default class PopoverFull extends Popover {
    _getDefaultOptions() {
        return extend(super._getDefaultOptions(), {
            preventScrollEvents: false
        })
    }
    _getToolbarName() {
        return "dxToolbar"
    }
}
PopoverFull.defaultOptions = function(rule) {
    Popover.defaultOptions(rule)
};
registerComponent("dxPopover", PopoverFull);
