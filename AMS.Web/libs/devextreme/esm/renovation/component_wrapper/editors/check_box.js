/**
 * DevExtreme (esm/renovation/component_wrapper/editors/check_box.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import Editor from "./editor";
export default class CheckBox extends Editor {
    _useTemplates() {
        return false
    }
    _isFocused() {
        var focusTarget = this.$element()[0];
        return focusTarget.classList.contains("dx-state-focused")
    }
    getSupportedKeyNames() {
        return ["space"]
    }
    getProps() {
        var props = super.getProps();
        if (null !== props.value) {
            props.value = Boolean(props.value)
        }
        return props
    }
}
