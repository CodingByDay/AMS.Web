/**
* DevExpress Dashboard (_conditional-formatting-custom-color-storage.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FontStyle } from '../../../model/enums';
export interface IAppearanceWrapper {
    fontFamily: string;
    fontStyles: string[];
    backColor: string;
    foreColor: string;
}
export interface ICustomAppearance {
    fontFamily: string;
    fontStyle: FontStyle;
    backColor: string;
    foreColor: string;
}
export interface ICustomStyleStorage<T> {
    getValue(): T[];
    setValue(value: T[]): void;
}
export declare class InMemoryStorage<T> implements ICustomStyleStorage<T> {
    value: T[];
    getValue(): T[];
    setValue(value: T[]): void;
}
export declare const conditionalFormattingEditor: {
    customColorStorage: ICustomStyleStorage<string>;
    customAppearanceStorage: ICustomStyleStorage<ICustomAppearance>;
};
