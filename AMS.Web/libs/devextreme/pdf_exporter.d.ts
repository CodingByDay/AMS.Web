/**
* DevExtreme (pdf_exporter.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { DxPromise } from './core/utils/deferred';
import dxDataGrid from './ui/data_grid';
import { ExportLoadPanel } from './exporter/export_load_panel';
import dxGantt, {
  GanttPdfExportMode,
  GanttPdfExportDateRange,
} from './ui/gantt';
import {
  DataGridCell as ExcelCell,
} from './excel_exporter';

export type DataGridCell = PdfDataGridCell;

 /**
 * @deprecated Use DataGridCell instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface PdfDataGridCell extends ExcelCell {}

/**
 * 
 */
export interface Cell {
  /**
   * 
   */
  backgroundColor?: string;
  /**
   * 
   */
  borderColor?: string;
  /**
   * 
   */
  borderWidth?: number;
  /**
   * 
   */
  drawLeftBorder?: boolean;
  /**
   * 
   */
  drawTopBorder?: boolean;
  /**
   * 
   */
  drawRightBorder?: boolean;
  /**
   * 
   */
  drawBottomBorder?: boolean;
  /**
   * 
   */
  font?: {
    /**
     * 
     */
    size?: number;
    /**
     * 
     */
    name?: string;
    /**
     * 
     */
    style?: 'normal' | 'bold' | 'italic';
  };
  /**
   * 
   */
  horizontalAlign?: 'left' | 'center' | 'right';
  /**
   * 
   */
  padding?: {
    /**
     * 
     */
    top?: number;
    /**
     * 
     */
    left?: number;
    /**
     * 
     */
    right?: number;
    /**
     * 
     */
    bottom?: number;
  };
  /**
   * 
   */
  text?: string;
  /**
   * 
   */
  textColor?: string;
  /**
   * 
   */
  verticalAlign?: 'top' | 'middle' | 'bottom';
  /**
   * 
   */
  wordWrapEnabled?: boolean;
}

/**
 * Properties that can be passed as a parameter to the exportDataGrid(options) method from the pdfExporter module.
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface PdfExportDataGridProps {
    /**
     * A jsPDF instance. This setting is required.
     */
    jsPDFDocument?: object;
    /**
     * A DataGrid instance. This setting is required.
     */
    component?: dxDataGrid;
    /**
     * 
     */
    topLeft?: {
      /**
       * 
       */
      x?: number;
      /**
       * 
       */
      y?: number;
    };
    /**
     * 
     */
    columnWidths?: Array<number>;
    /**
     * 
     */
    indent?: number;
    /**
     * 
     */
    margin?: {
      /**
       * 
       */
      top?: number;
      /**
       * 
       */
      left?: number;
      /**
       * 
       */
      right?: number;
      /**
       * 
       */
      bottom?: number;
    };
    /**
     * 
     */
    repeatHeaders?: boolean;
    /**
     * Specifies whether or not to export only selected rows.
     */
    selectedRowsOnly?: boolean;
    /**
     * 
     */
    customDrawCell?: ((options: { gridCell?: DataGridCell; pdfCell?: Cell; doc?: any; rect?: { x: number; y: number; h: number; w: number }; cancel?: boolean }) => void);
    /**
     * Customizes a cell in PDF after creation.
     */
    customizeCell?: ((options: { gridCell?: DataGridCell; pdfCell?: Cell }) => void);
    /**
     * 
     */
    onRowExporting?: ((options: { rowCells?: Array<Cell>; rowHeight?: number }) => void);
    /**
     * Configures the load panel.
     */
    loadPanel?: ExportLoadPanel;
}

/**
 * Exports grid data to a PDF file.
 */
export function exportDataGrid(options: PdfExportDataGridProps): DxPromise<void>;

/**
 * Properties that you can pass as a parameter to the exportGantt(options) method from the pdfExporter module.
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface PdfExportGanttProps {
  /**
   * A function that creates a PDF document.
   */
  createDocumentMethod?: ((options: any) => object);
  /**
   * A jsPDF instance. This setting is required.
   */
  jsPDFDocument?: object;
  /**
   * A Gantt instance. This setting is required.
   */
  component?: dxGantt;
  /**
   * Specifies the document size.
   */
  format?: string | object;
  /**
   * Specifies whether to use horizontal orientation for the document.
   */
  landscape?: boolean;
  /**
   * Specifies the file name.
   */
  fileName?: string;
  /**
   * Specifies the outer indents of the exported area.
   */
  margins?: object;
  /**
   * Specifies which part of the component to export (chart area, tree list area, or the entire component).
   */
  exportMode?: GanttPdfExportMode;
  /**
   * Specifies the date range for which to export tasks.
   */
  dateRange?: GanttPdfExportDateRange | object;
  /**
   * 
   */
  font?: PdfExportGanttFont;
}

/**
 * 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface PdfExportGanttFont {
  /**
   * 
   */
  fontObject: object;
  /**
   * 
   */
  name: string;
  /**
   * 
   */
  style?: string;
  /**
   * 
   */
  weight?: string | number;
}

/**
 * Exports Gantt data to a PDF file.
 */
export function exportGantt(options: PdfExportGanttProps): DxPromise<any>;
