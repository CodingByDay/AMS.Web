﻿/**
* DevExpress Dashboard (_custom-range-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Dimension } from '../../../model/data-item/dimension';
import { DateFilterItem } from '../../../model/items/filter-items/date-filter-item';
import { DateTimePeriod } from '../../../model/items/range-filter/date-time-period';
import { RangeFilterItem } from '../../../model/items/range-filter/range-filter-item';
import { ObjectPropertiesWrapper } from '../../form-adapter/_object-properties-wrapper';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { IComposeTabsArgs, IDetailsPropertiesComposerBase } from './_base-properties-composer';
export declare class CustomRangePropertiesComposer implements IDetailsPropertiesComposerBase<DateTimePeriod, IDateTimePeriodComposeTabsArgs> {
    composeTabs(model: DateTimePeriod, args: IDateTimePeriodComposeTabsArgs): AccordionTab<any>[];
    getCommonWrapper(model: DateTimePeriod, argument: Dimension, rangeFilterItem: RangeFilterItem | DateFilterItem): ObjectPropertiesWrapper;
}
export interface IDateTimePeriodComposeTabsArgs extends IComposeTabsArgs {
    argument: Dimension;
    rangeFilterItem: RangeFilterItem | DateFilterItem;
}
