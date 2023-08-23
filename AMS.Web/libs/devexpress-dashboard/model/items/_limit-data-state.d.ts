/**
* DevExpress Dashboard (_limit-data-state.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export interface LimitDataViewModel {
    isReduceMode: boolean;
    isReduced: boolean;
}
export declare class LimitDataState {
    _visible: boolean;
    _enabled: boolean;
    get enabled(): boolean;
    setReduced(): void;
    getViewModel(): LimitDataViewModel;
    toggle(): void;
    reset(): void;
}
