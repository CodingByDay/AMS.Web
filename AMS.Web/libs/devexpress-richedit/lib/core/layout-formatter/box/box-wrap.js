import { ListUtils } from '@devexpress/utils/lib/utils/list';
export class BoxWrap {
    constructor(box, info) {
        this.box = box;
        this.info = info;
    }
    splitByPosition(measurer, pos) {
        return new BoxWrap(this.box.splitBoxByPosition(measurer, pos), this.info);
    }
}
export class BoxWrapInfo {
    constructor(paragraphIndex, sectionIndex, tablePosition, fieldsInfo) {
        this.paragraphIndex = paragraphIndex;
        this.sectionIndex = sectionIndex;
        this.tablePosition = tablePosition;
        this.fieldsInfo = fieldsInfo;
    }
    equalsTablePositions(tablePos) {
        if (!this.tablePosition)
            return !tablePos;
        if (!tablePos || this.tablePosition.length != tablePos.length)
            return false;
        return ListUtils.allOf2(this.tablePosition, tablePos, (a, b) => a.equals(b));
    }
    getTableNestedLevel() {
        return (this.tablePosition ? this.tablePosition.length : 0) - 1;
    }
}
export class BoxWrapFieldInfo {
    constructor(field, isInCodePart) {
        this.field = field;
        this.isInCodePart = isInCodePart;
    }
    static make(field, pos) {
        return new BoxWrapFieldInfo(field, field.getCodeIntervalWithBorders().contains(pos));
    }
}
