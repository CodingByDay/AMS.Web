/**
 * DevExtreme (esm/ui/html_editor/formats/align.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import Quill from "devextreme-quill";
var AlignStyle = {};
if (Quill) {
    AlignStyle = Quill.import("attributors/style/align");
    AlignStyle.whitelist.push("left")
}
export default AlignStyle;
