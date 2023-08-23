import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { RtfTableCell } from '../model/table/rtf-table-cell';
export class RtfTableCellController {
    constructor(rowController) {
        this.rowController = rowController;
    }
    startNewCell() {
        const row = this.rowController.currentRow;
        this.currentCell = new RtfTableCell(row);
    }
    isCurrentCellNotComplete() {
        return !ListUtils.elementBy(this.rowController.currentRow.cells, v => v == this.currentCell) && !this.currentCell.isEmpty;
    }
    assignLastCellAsCurrent() {
        this.currentCell = ListUtils.last(this.rowController.currentRow.cells);
    }
    finishCell() {
        const cells = this.rowController.currentRow.cells;
        if (cells.length == 0 || ListUtils.last(cells) != this.currentCell) {
            this.currentCell.index = cells.length;
            cells.push(this.currentCell);
        }
    }
    setCharacterPosition(charactePosition) {
        this.setPositionCore(this.currentCell, charactePosition);
        this.setParagraphIndexesToParentCell(charactePosition);
    }
    setParagraphIndexesToParentCell(paragraphIndex) {
        let parentCell = this.rowController.tableController.currentTable.parentCell;
        while (parentCell != null) {
            this.setPositionCore(parentCell, paragraphIndex);
            parentCell = parentCell.row.table.parentCell;
        }
    }
    setPositionCore(cell, position) {
        if (cell.startPos < 0)
            cell.startPos = position;
        cell.endPos = position;
    }
    reset() {
        this.currentCell = null;
    }
}
