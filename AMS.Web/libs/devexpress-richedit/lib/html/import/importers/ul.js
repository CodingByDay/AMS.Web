import { HtmlTagImporterBase } from './base';
export class HtmlUlTagImporter extends HtmlTagImporterBase {
    elementTag() {
        return "UL";
    }
    importBefore() {
    }
    isImportChilds() {
        return true;
    }
    importAfter() {
    }
}
