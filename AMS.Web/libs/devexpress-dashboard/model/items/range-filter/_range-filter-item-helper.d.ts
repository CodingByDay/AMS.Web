﻿/**
* DevExpress Dashboard (_range-filter-item-helper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { itemDataManager } from '../../../data/item-data/internal/_item-data-manager';
import { Dimension } from '../../data-item/dimension';
import { DateTimePeriod } from './date-time-period';
export declare const _subscribeToDimension: (dimension: ko.Observable<Dimension>, dateTimePeriods: ko.ObservableArray<DateTimePeriod>, dataManager: ko.Observable<itemDataManager>) => void;
