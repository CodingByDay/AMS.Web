/**
* DevExpress Dashboard (_undo-engine-helper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { UndoEngine } from '@devexpress/analytics-core/analytics-utils';
export declare class UndoEngineContainer {
    static undoEngine: UndoEngine;
}
export declare function wrapFuncWithUndoRedo<T extends (...a: any[]) => any>(func: T): T;
export declare function callFuncWithUndoRedo(func: () => void): void;
export declare function wrapWithUndoRedo(target: any, key: string, value: any): {
    value: any;
};
