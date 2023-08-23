﻿/**
* DevExpress Dashboard (dashboard-state.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PrimitiveType } from '../data/types';
export declare class DashboardState {
    Parameters: {
        [id: string]: PrimitiveType | Array<PrimitiveType>;
    };
    Items: {
        [id: string]: ItemState;
    };
}
export declare class RangeFilterSelection {
    Minimum: number | Date;
    Maximum: number | Date;
}
export declare class RangeFilterState {
    Selection?: RangeFilterSelection;
    PeriodName?: string;
}
export declare class ItemState {
    RangeFilterState?: RangeFilterState;
    MasterFilterValues?: Array<Array<PrimitiveType>>;
    DrillDownValues?: Array<PrimitiveType>;
    SelectedLayerIndex?: number;
    TabPageName?: string;
}
