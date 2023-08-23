/**
 * DevExtreme (esm/core/utils/stubs.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
export function stubComponent(componentName) {
    return class {
        constructor() {
            throw new Error("Module '".concat(componentName, "' not found"))
        }
        static getInstance() {}
    }
}
