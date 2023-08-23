﻿/**
* DevExpress Dashboard (card-widget.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DxElement } from 'devextreme/core/element';
export interface CardWidget {
    onCustomizeText: (args: {
        getValue: () => any;
        getDefaultText: () => string;
    }) => string;
    cardBackColor: string;
    element: () => DxElement;
}
