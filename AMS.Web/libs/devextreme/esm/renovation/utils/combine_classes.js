/**
 * DevExtreme (esm/renovation/utils/combine_classes.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
export function combineClasses(classesMap) {
    return Object.keys(classesMap).filter(p => classesMap[p]).join(" ")
}
