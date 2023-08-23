/**
 * DevExtreme (esm/integration/jquery/element.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    setPublicElementWrapper
} from "../../core/element";
import useJQueryFn from "./use_jquery";
var useJQuery = useJQueryFn();
var getPublicElement = function($element) {
    return $element
};
if (useJQuery) {
    setPublicElementWrapper(getPublicElement)
}
