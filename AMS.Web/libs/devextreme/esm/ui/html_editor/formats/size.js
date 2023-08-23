/**
 * DevExtreme (esm/ui/html_editor/formats/size.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import Quill from "devextreme-quill";
var SizeStyle = {};
if (Quill) {
    SizeStyle = Quill.import("attributors/style/size");
    SizeStyle.whitelist = null
}
export default SizeStyle;
