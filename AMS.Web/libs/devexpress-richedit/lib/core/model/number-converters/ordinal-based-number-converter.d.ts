import { SimpleFormattersManager } from '@devexpress/utils/lib/formatters/manager';
import { NumberingFormat } from '../numbering-lists/list-level-properties';
export interface INumberConverter {
    minValue: number;
    maxValue: number;
    type: NumberingFormat;
    convertNumber(value: number): string;
}
export declare abstract class OrdinalBasedNumberConverter implements INumberConverter {
    minValue: number;
    maxValue: number;
    type: NumberingFormat;
    constructor();
    convertNumber(value: number): string;
    abstract convertNumberCore(value: number): string;
}
export declare abstract class OrdinalLocalBasedNumberConverter extends OrdinalBasedNumberConverter {
    protected simpleFormattersManager: SimpleFormattersManager;
    constructor(simpleFormattersManager: SimpleFormattersManager);
}
export declare class OrdinalEnglishNumberConverter extends OrdinalLocalBasedNumberConverter {
    private ending;
    constructor(simpleFormattersManager: SimpleFormattersManager);
    convertNumberCore(value: number): string;
}
export declare class OrdinalFrenchNumberConverter extends OrdinalLocalBasedNumberConverter {
    constructor(simpleFormattersManager: SimpleFormattersManager);
    convertNumberCore(value: number): string;
}
export declare class OrdinalGermanNumberConverter extends OrdinalLocalBasedNumberConverter {
    constructor(simpleFormattersManager: SimpleFormattersManager);
    convertNumberCore(value: number): string;
}
export declare class OrdinalItalianNumberConverter extends OrdinalLocalBasedNumberConverter {
    constructor(simpleFormattersManager: SimpleFormattersManager);
    convertNumberCore(value: number): string;
}
export declare class OrdinalTurkishNumberConverter extends OrdinalLocalBasedNumberConverter {
    constructor(simpleFormattersManager: SimpleFormattersManager);
    convertNumberCore(value: number): string;
}
export declare class OrdinalGreekNumberConverter extends OrdinalLocalBasedNumberConverter {
    constructor(simpleFormattersManager: SimpleFormattersManager);
    convertNumberCore(value: number): string;
}
export declare class OrdinalSpanishNumberConverter extends OrdinalLocalBasedNumberConverter {
    constructor(simpleFormattersManager: SimpleFormattersManager);
    convertNumberCore(value: number): string;
}
export declare class OrdinalPortugueseNumberConverter extends OrdinalLocalBasedNumberConverter {
    constructor(simpleFormattersManager: SimpleFormattersManager);
    convertNumberCore(value: number): string;
}
export declare class OrdinalUkrainianNumberConverter extends OrdinalLocalBasedNumberConverter {
    constructor(simpleFormattersManager: SimpleFormattersManager);
    convertNumberCore(value: number): string;
}
export declare class OrdinalRussianNumberConverter extends OrdinalLocalBasedNumberConverter {
    constructor(simpleFormattersManager: SimpleFormattersManager);
    convertNumberCore(value: number): string;
}
export declare class OrdinalSwedishNumberConverter extends OrdinalLocalBasedNumberConverter {
    constructor(simpleFormattersManager: SimpleFormattersManager);
    convertNumberCore(value: number): string;
}
//# sourceMappingURL=ordinal-based-number-converter.d.ts.map