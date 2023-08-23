/**
 * DevExtreme (esm/renovation/utils/getThemeType.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    isMaterial,
    isCompact,
    current
} from "../../ui/themes";
var getThemeType = () => {
    var theme = current();
    return {
        isCompact: isCompact(theme),
        isMaterial: isMaterial(theme)
    }
};
export default getThemeType;
