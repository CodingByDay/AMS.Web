import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { RtfImportData } from '../../rtf-import-data';
import { RtfTableReaderStateBase } from './state-base';
export class TableRtfTableManagerState extends RtfTableReaderStateBase {
    constructor(reader) {
        super(reader);
        reader.tableController.createCurrentTable();
    }
    onEndParagraph(paragraphFormattingInfo) {
        if (this.isParagraphInTable(paragraphFormattingInfo) || this.isCurrentTableNotComplete())
            this.onEndInTableParagraph(paragraphFormattingInfo.nestingLevel);
        else {
            this.validateCurrentTable();
            this.reader.resetState();
        }
    }
    validateCurrentTable() {
        const currentTable = this.tableController.currentTable;
        if (currentTable.rows.length == 0) {
            const ind = this.reader.tables.findIndex(t => t == currentTable);
            if (ind >= 0)
                this.reader.tables.splice(ind, 1);
            return;
        }
        const lastRow = ListUtils.last(currentTable.rows);
        if (lastRow.cells.length > 0)
            return;
        currentTable.rows.splice(currentTable.rows.length - 1);
        this.validateCurrentTable();
    }
    onEndInTableParagraph(nestingLevel) {
        const tableController = this.reader.tableController;
        if (tableController.currentTable.nestingLevel != nestingLevel)
            tableController.changeTable(nestingLevel);
        const pos = this.data.importers.character.logPosition;
        tableController.rowController.cellController.setCharacterPosition(pos);
        if (this.reader.rtfTableStyleIndexForRowOrCell != 0)
            this.data.importers.style.paragraph.paragraphTableStyles[pos] = this.reader.rtfTableStyleIndexForRowOrCell;
    }
    isParagraphInTable(paragraphFormattingInfo) {
        return paragraphFormattingInfo.inTableParagraph || paragraphFormattingInfo.nestingLevel > 0;
    }
    isCurrentTableNotComplete() {
        return this.reader.tableController.rowController.isCurrentRowNotComplete() ||
            (this.reader.tableController.rowController.isCurrentRowValid() &&
                this.reader.tableController.rowController.currentRow.cells.length < this.reader.cellPropertiesCollection.length);
    }
    onEndRow() {
        if (this.tableController.currentTable.nestingLevel > 1)
            RtfImportData.throwInvalidRtfFile();
        this.onEndRowCore();
    }
    onEndRowCore() {
        const rowController = this.reader.tableController.rowController;
        rowController.finishRow();
        rowController.startNewRow();
    }
    onEndCell() {
        this.onEndCellCore(1);
    }
    onEndCellCore(nestingLevel) {
        const cellController = this.reader.tableController.rowController.cellController;
        this.onEndInTableParagraph(nestingLevel);
        cellController.finishCell();
        cellController.startNewCell();
    }
    onEndNestedRow() {
        if (this.tableController.currentTable.nestingLevel == 1)
            RtfImportData.throwInvalidRtfFile();
        this.onEndRowCore();
    }
    onEndNestedCell() {
        this.onEndCellCore(this.data.importers.paragraph.paragraphFormatting.nestingLevel);
    }
    onStartNestedTableProperties() {
    }
    onTableRowDefaults() {
        const currentTable = this.reader.tableController.currentTable;
        if (!this.reader.isNestedTableProperetiesReading && currentTable != null && currentTable.nestingLevel > 1)
            this.tableController.changeTable(1);
    }
}
