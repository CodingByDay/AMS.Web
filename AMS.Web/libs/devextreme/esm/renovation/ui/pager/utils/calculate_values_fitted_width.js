/**
 * DevExtreme (esm/renovation/ui/pager/utils/calculate_values_fitted_width.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
export var oneDigitWidth = 10;
export function calculateValuesFittedWidth(minWidth, values) {
    return minWidth + oneDigitWidth * Math.max(...values).toString().length
}
