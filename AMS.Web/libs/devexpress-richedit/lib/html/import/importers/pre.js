import { HtmlTagImporterBase } from './base';
export class HtmlPreTagImporter extends HtmlTagImporterBase {
    elementTag() {
        return "PRE";
    }
    importBefore() {
    }
    isImportChilds() {
        return true;
    }
    importAfter() {
    }
}
