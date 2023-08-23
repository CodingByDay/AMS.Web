import { AutoCorrectReplaceInfo, AutoCorrectSettings } from '../../core/model/options/auto-correct';
import { SubDocument } from '../../core/model/sub-document';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { IRichEditControl } from '../interfaces/i-rich-edit-core';
export declare abstract class AutoCorrectProviderBase {
    protected control: IRichEditControl;
    protected get subDocument(): SubDocument;
    constructor(control: IRichEditControl);
    revise(): boolean;
    protected abstract reviseCore(text: string, interval: FixedInterval): boolean;
    protected isSeparator(char: string): boolean;
    protected isTriggerChar(char: string): boolean;
    protected includeTriggerChar(_char: string): boolean;
}
export declare class EventAutoCorrectProvider extends AutoCorrectProviderBase {
    reviseCore(text: string, interval: FixedInterval): boolean;
    protected isTriggerChar(_char: string): boolean;
    protected includeTriggerChar(_char: string): boolean;
}
export declare class TwoInitialCapitalsAutoCorrectProvider extends AutoCorrectProviderBase {
    protected reviseCore(text: string, interval: FixedInterval): boolean;
}
export declare class BulletedListAutoCorrectProvider extends AutoCorrectProviderBase {
    private numberingRegEx;
    protected reviseCore(text: string, interval: FixedInterval): boolean;
    protected isSeparator(char: string): boolean;
    protected isTriggerChar(char: string): boolean;
    private getTargetNumberingListType;
}
export declare class UrlAutoCorrectProvider extends AutoCorrectProviderBase {
    private urlRegex;
    private emailRegex;
    private localRegex;
    protected reviseCore(text: string, interval: FixedInterval): boolean;
    private createNavigateUri;
    protected isSeparator(char: string): boolean;
}
export declare abstract class TableBasedAutoCorrectProviderBase extends AutoCorrectProviderBase {
    protected caseSensitiveReplacement: boolean;
    protected replaceInfoCollection: AutoCorrectReplaceInfo[];
    constructor(control: IRichEditControl, settings: AutoCorrectSettings);
    protected abstract initReplaceInfo(replaceInfoCollection: AutoCorrectReplaceInfo[]): any;
    protected compare(origin: string, target: string): number;
}
export declare class TableBasedSimpleAutoCorrectProvider extends TableBasedAutoCorrectProviderBase {
    protected initReplaceInfo(replaceInfoCollection: AutoCorrectReplaceInfo[]): void;
    protected reviseCore(text: string, interval: FixedInterval): boolean;
    private splitByLines;
}
export declare class TableBasedCompositeAutoCorrectProvider extends TableBasedAutoCorrectProviderBase {
    protected initReplaceInfo(replaceInfoCollection: AutoCorrectReplaceInfo[]): void;
    protected reviseCore(text: string, interval: FixedInterval): boolean;
    private isEndOf;
}
export declare class TableBasedImmediateAutoCorrectProvider extends TableBasedCompositeAutoCorrectProvider {
    private triggeredChar;
    protected initReplaceInfo(replaceInfoCollection: AutoCorrectReplaceInfo[]): void;
    protected isTriggerChar(char: string): boolean;
    protected includeTriggerChar(_char: string): boolean;
}
//# sourceMappingURL=auto-correct-providers.d.ts.map