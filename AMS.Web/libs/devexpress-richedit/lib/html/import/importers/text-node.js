import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { DomUtils } from '@devexpress/utils/lib/utils/dom';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { ImportedTextRunInfo } from '../containers/runs';
import { HtmlTagImporterBase } from './base';
export class HtmlTextNodeImporter extends HtmlTagImporterBase {
    elementTag() {
        return "TextNode";
    }
    importBefore() {
        const text = this.element.nodeValue || DomUtils.getInnerText(this.element);
        if (text && text.length) {
            if (/^ +$/.test(text) && this.element.parentNode && this.element.parentNode.tagName == "TD") {
                const parentLevel = this.importer.levelInfo[this.importer.levelInfo.length - 2];
                if (parentLevel.childElements[0] == this.element || ListUtils.last(parentLevel.childElements) == this.element) {
                    return;
                }
            }
            this.addRun(new ImportedTextRunInfo(this.importer.modelManager.model, this.importer.measurer, text, this.importer.htmlImporterMaskedCharacterProperties.getBundleFrom(this.element, new FixedInterval(this.importer.currPosition, text.length))));
        }
    }
    isImportChilds() {
        return false;
    }
    importAfter() {
    }
}
