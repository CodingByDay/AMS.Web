import { ColorModelInfo } from '../../../../core/model/color/color-model-info';
import { DXColor } from '../../../../core/model/color/dx-color';
import { ThemeColorIndexConstants } from '../../../../core/model/color/enums';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { SectionExporter } from '../base/sections';
import { DocumentRelationsExporter } from '../relations/document-relations';
import { BaseSubDocumentExporter } from './base-sub-document';
export class MainSubDocumentExporter extends BaseSubDocumentExporter {
    createRelationExporter() { return new DocumentRelationsExporter(this.data); }
    get rootElement() { return 'document'; }
    fillWriterCore() {
        this.exportDocumentBackground();
        this.writer.writeWpStartElement('body');
        this.init();
        for (const section of this.data.model.sections)
            this.exportSection(section, section.interval);
        new SectionExporter(this.data).exportProperties(ListUtils.last(this.data.model.sections));
        this.writer.endElement();
    }
    exportDocumentBackground() {
        const color = this.data.model.pageBackColor;
        const colorInfo = this.data.model.cache.colorModelInfoCache.getItem(ColorModelInfo.makeByColor(color));
        if ((color == DXColor.empty) && (colorInfo.themeColorIndex == ThemeColorIndexConstants.None))
            return;
        this.writer.writeWpStartElement('background');
        this.data.colorExporter.exportColorInfo(colorInfo, 'color', false);
        this.writer.endElement();
    }
}
