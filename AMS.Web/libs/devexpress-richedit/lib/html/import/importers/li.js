import { HtmlTagImporterBase } from './base';
export class HtmlLiTagImporter extends HtmlTagImporterBase {
    elementTag() {
        return "LI";
    }
    importBefore() {
    }
    isImportChilds() {
        return true;
    }
    importAfter() {
    }
}
