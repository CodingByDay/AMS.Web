import { LayoutBox } from '../../layout/main-structures/layout-boxes/layout-box';
import { IMeasurer } from '../../measurer/measurer';
import { Field } from '../../model/fields/field';
import { TablePosition } from '../../model/tables/main-structures/table';
export declare class BoxWrap {
    box: LayoutBox;
    info: BoxWrapInfo;
    constructor(box: LayoutBox, info: BoxWrapInfo);
    splitByPosition(measurer: IMeasurer, pos: number): BoxWrap;
}
export declare class BoxWrapInfo {
    paragraphIndex: number;
    sectionIndex: number;
    tablePosition: TablePosition[];
    fieldsInfo: BoxWrapFieldInfo[];
    constructor(paragraphIndex: number, sectionIndex: number, tablePosition: TablePosition[], fieldsInfo: BoxWrapFieldInfo[]);
    equalsTablePositions(tablePos: TablePosition[]): boolean;
    getTableNestedLevel(): number;
}
export declare class BoxWrapFieldInfo {
    field: Field;
    isInCodePart: boolean;
    fieldType: string;
    constructor(field: Field, isInCodePart: boolean);
    static make(field: Field, pos: number): BoxWrapFieldInfo;
}
//# sourceMappingURL=box-wrap.d.ts.map