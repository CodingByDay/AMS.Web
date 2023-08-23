import { Flag } from '@devexpress/utils/lib/class/flag';
import { Rectangle } from '@devexpress/utils/lib/geometry/rectangle';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { TableCellBoundFlags } from './layout-table-cell-info';
export class LayoutTableInfo {
    constructor(backgroundColor, grid) {
        this.isEditable = true;
        this.backgroundColor = backgroundColor;
        this.grid = grid;
    }
}
export class LayoutTableColumnInfo extends Rectangle {
    constructor(parentCell, logicInfo, bound) {
        super(bound.x, bound.y, bound.width, bound.height);
        this.horizontalBorders = [];
        this.verticalBorders = [];
        this.verticalCursorBorders = [];
        this.horizontalCursorBorders = [];
        this.tableRows = [];
        this.parentCell = parentCell;
        this.logicInfo = logicInfo;
    }
    isLastLayoutColumnInModelTable() {
        const topColumn = this.getTopLevelColumn();
        return !topColumn.isBoundWithNext() && ListUtils.last(topColumn.tableRows).rowIndex == topColumn.logicInfo.grid.table.rows.length - 1;
    }
    calculateFlags() {
        this.boundFlags = new Flag(TableCellBoundFlags.StartOnThisColumn | TableCellBoundFlags.EndOnThisColumn);
        ListUtils.forEach(this.tableRows, (row) => ListUtils.forEach(row.rowCells, (cell) => {
            if (!cell.boundFlags.get(TableCellBoundFlags.StartOnThisColumn))
                this.boundFlags.set(TableCellBoundFlags.StartOnThisColumn, false);
            if (!cell.boundFlags.get(TableCellBoundFlags.EndOnThisColumn))
                this.boundFlags.set(TableCellBoundFlags.EndOnThisColumn, false);
        }));
    }
    getTopLevelColumn() {
        let currCol = this;
        let parent;
        while (parent = currCol.parentCell)
            currCol = parent.parentRow.parentTable;
        return currCol;
    }
    isBoundWithPrev() {
        return !this.boundFlags.get(TableCellBoundFlags.StartOnThisColumn);
    }
    isBoundWithNext() {
        return !this.boundFlags.get(TableCellBoundFlags.EndOnThisColumn);
    }
    static getFirstCellInPageThatBoundWithCellPlacedInNextPage(tableInfos) {
        let resultCell = null;
        let resultTblNestedLevel = -1;
        let currLvl;
        for (let tblInd = tableInfos.length - 1, tbl; tbl = tableInfos[tblInd]; tblInd--) {
            const cell = ListUtils.unsafeAnyOf(tbl.tableRows, (row) => ListUtils.unsafeAnyOf(row.rowCells, (cell) => !cell.boundFlags.get(TableCellBoundFlags.EndOnThisColumn) ? cell : null));
            if (cell && (!resultCell ||
                (currLvl = cell.parentRow.parentTable.logicInfo.grid.table.nestedLevel) > resultTblNestedLevel)) {
                resultCell = cell;
                resultTblNestedLevel = currLvl;
            }
        }
        return resultCell;
    }
    isEmpty() {
        return !this.tableRows.length;
    }
}
