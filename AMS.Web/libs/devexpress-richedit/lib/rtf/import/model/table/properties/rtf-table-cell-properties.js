import { ShadingInfo } from '../../../../../core/model/shadings/shading-info';
import { ShadingPattern } from '../../../../../core/model/shadings/shading-pattern';
import { TableCellProperties, TableCellPropertyDescriptor } from '../../../../../core/model/tables/properties/table-cell-properties';
import { TableWidthUnit } from '../../../../../core/model/tables/secondary-structures/table-units';
export class RtfTableCellProperties {
    constructor() {
        this.shadingPattern = ShadingPattern.Clear;
        this.preferredWidth = TableWidthUnit.createDefault();
        this.coreProperties = new TableCellProperties();
    }
    copyFrom(obj) {
        this.coreProperties.copyFrom(obj.coreProperties);
        this.right = obj.right;
        this.horizontalMerging = obj.horizontalMerging;
        this.shadingPattern = obj.shadingPattern;
        this.foreColor = obj.foreColor;
        this.backColor = obj.backColor;
        this.verticalMerging = obj.verticalMerging;
        this.preferredWidth = obj.preferredWidth;
    }
    apply(cell) {
        if (this.verticalMerging)
            cell.verticalMerging = this.verticalMerging;
        if (this.backColor || this.foreColor) {
            cell.properties.setValue(TableCellPropertyDescriptor.shadingInfo, new ShadingInfo(this.shadingPattern, this.backColor ? this.backColor : cell.properties.shadingInfo.backColor, this.foreColor ? this.foreColor : cell.properties.shadingInfo.foreColor));
        }
        cell.preferredWidth = this.preferredWidth;
    }
}
