import { TableCell } from '../../../../core/model/tables/main-structures/table-cell';
import { RtfTableCellProperties } from './properties/rtf-table-cell-properties';
export class RtfTableCell {
    constructor(row, _right = 0) {
        this.startPos = -1;
        this.endPos = -1;
        this.index = -1;
        this.columnSpan = 0;
        this.idForParentCellMap = RtfTableCell.__id++;
        this.row = row;
        this.properties = new RtfTableCellProperties();
    }
    get isEmpty() { return this.startPos == -1 || this.endPos == -1; }
    createCell(row, subDocument) {
        const cell = new TableCell(row, this.properties.coreProperties);
        cell.startParagraphPosition = subDocument.positionManager.registerPosition(subDocument.getParagraphByPosition(this.startPos).startLogPosition.value);
        cell.endParagrapPosition = subDocument.positionManager.registerPosition(subDocument.getParagraphByPosition(this.endPos).getEndPosition());
        cell.columnSpan = this.columnSpan;
        this.properties.apply(cell);
        return cell;
    }
}
RtfTableCell.__id = 0;
