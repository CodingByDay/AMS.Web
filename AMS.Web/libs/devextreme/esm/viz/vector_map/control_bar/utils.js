/**
 * DevExtreme (esm/viz/vector_map/control_bar/utils.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
export var createTracker = (renderer, root) => renderer.g().attr({
    stroke: "none",
    "stroke-width": 0,
    fill: "#000000",
    opacity: 1e-4
}).css({
    cursor: "pointer"
}).append(root);
export var createVisibilityGroup = function(renderer, root) {
    var className = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
    return renderer.g().attr({
        class: className
    }).append(root)
};
export var toggleDisplay = (blocks, isVisible) => {
    var style = isVisible ? {
        display: "block"
    } : {
        display: "none"
    };
    blocks.map(item => item.css(style))
};
