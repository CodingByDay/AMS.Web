/**
 * DevExtreme (esm/localization/globalize/core.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import Globalize from "globalize";
import coreLocalization from "../core";
import {
    enCldr
} from "../cldr-data/en";
import {
    supplementalCldr
} from "../cldr-data/supplemental";
if (Globalize && Globalize.load) {
    if (!Globalize.locale()) {
        Globalize.load(enCldr, supplementalCldr);
        Globalize.locale("en")
    }
    coreLocalization.inject({
        locale: function(_locale) {
            if (!_locale) {
                return Globalize.locale().locale
            }
            Globalize.locale(_locale)
        }
    })
}
