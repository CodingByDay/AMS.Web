/**
 * DevExtreme (esm/renovation/ui/editors/common/editor_label_props.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    isMaterial,
    current
} from "../../../../ui/themes";
export var EditorLabelProps = {
    label: "",
    get labelMode() {
        return isMaterial(current()) ? "floating" : "static"
    }
};
