/**
 * DevExtreme (esm/viz/gauges/theme_manager.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    extend
} from "../../core/utils/extend";
var _extend = extend;
import {
    BaseThemeManager
} from "../core/base_theme_manager";
var ThemeManager = BaseThemeManager.inherit({
    ctor(options) {
        this.callBase.apply(this, arguments);
        this._subTheme = options.subTheme
    },
    _initializeTheme: function() {
        var that = this;
        var subTheme;
        if (that._subTheme) {
            subTheme = _extend(true, {}, that._theme[that._subTheme], that._theme);
            _extend(true, that._theme, subTheme)
        }
        that.callBase.apply(that, arguments)
    }
});
export default {
    ThemeManager: ThemeManager
};
