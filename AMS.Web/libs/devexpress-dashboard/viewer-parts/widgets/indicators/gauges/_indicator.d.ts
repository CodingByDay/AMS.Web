/**
* DevExpress Dashboard (_indicator.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class GaugeDeltaIndicator {
    _renderer: any;
    _root: any;
    _getOptions: Function;
    constructor(parameters: any);
    dispose(): this;
    draw(): any[];
    layoutOptions(): {
        horizontalAlignment: any;
        verticalAlignment: any;
    };
    measure(): any[];
    move(rect: any): void;
    freeSpace(): void;
}
