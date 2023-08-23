/**
 * DevExtreme (esm/integration/jquery/element_data.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import jQuery from "jquery";
import {
    setDataStrategy
} from "../../core/element_data";
import useJQueryFn from "./use_jquery";
var useJQuery = useJQueryFn();
if (useJQuery) {
    setDataStrategy(jQuery)
}
