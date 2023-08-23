import { RtfTable } from '../model/table/rtf-table';
import { RtfTableRowController } from './rtf-table-row-controller';
import { RtfTableState } from './rtf-table-state';
export class RtfTableController {
    constructor(reader) {
        this.reader = reader;
        this.rowController = this.createRowController();
    }
    createRowController() {
        return new RtfTableRowController(this);
    }
    changeTable(nestingLevel) {
        const depth = nestingLevel - this.currentTable.nestingLevel;
        if (depth > 0)
            this.createNestedTable(depth);
        else if (depth < 0)
            this.popParentTable(depth);
        else {
            this.finishTable();
            this.createCurrentTable();
        }
    }
    popParentTable(depth) {
        const count = Math.abs(depth);
        let state = null;
        for (let i = 0; i < count && this.reader.tableStack.count > 0; i++)
            state = this.reader.tableStack.pop();
        if (state == null)
            return;
        this.currentTable = state.table;
        this.reader.restoreProperties(state);
        this.rowController.assignLastRowAsCurrent();
    }
    createNestedTable(depth) {
        for (let i = 0; i < depth; i++) {
            this.finishTable();
            this.reader.tableStack.push(new RtfTableState(this.currentTable, this.reader));
            this.createCurrentTable();
        }
    }
    createCurrentTable() {
        this.currentTable = new RtfTable();
        const currentCell = this.rowController.cellController.currentCell;
        this.currentTable.parentCell = currentCell;
        if (currentCell != null) {
            let tables = this.reader.parentCellMap[currentCell.idForParentCellMap];
            if (tables === undefined) {
                tables = [];
                this.reader.parentCellMap[currentCell.idForParentCellMap] = tables;
            }
            tables.push(this.currentTable);
        }
        this.reader.tables.push(this.currentTable);
        this.rowController.startNewRow();
    }
    changeCurrentTable() {
        this.currentTable = new RtfTable();
        this.reader.tables.push(this.currentTable);
    }
    finishTable() {
        this.rowController.cellController.finishCell();
        this.rowController.finishRowCore();
    }
    reset() {
        this.currentTable = null;
        this.rowController.reset();
    }
}
