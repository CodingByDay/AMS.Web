/**
 * DevExtreme (esm/renovation/utils/render_template.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    render
} from "inferno";
import {
    createElement
} from "inferno-create-element";
export function renderTemplate(template, props, container) {
    setTimeout(() => {
        render(createElement(template, props), null === container || void 0 === container ? void 0 : container.get(0))
    }, 0)
}
