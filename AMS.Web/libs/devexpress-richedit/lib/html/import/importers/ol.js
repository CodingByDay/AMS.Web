import { HtmlTagImporterBase } from './base';
export class HtmlOlTagImporter extends HtmlTagImporterBase {
    elementTag() {
        return "OL";
    }
    importBefore() {
    }
    isImportChilds() {
        return true;
    }
    importAfter() {
    }
}
