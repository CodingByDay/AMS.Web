import { ListUtils } from '@devexpress/utils/lib/utils/list';
export class HtmlTagImporterBase {
    constructor(importer) {
        this.importer = importer;
    }
    get colorProvider() { return this.importer.modelManager.model.colorProvider; }
    getClosestImporterByTagName(tagName) {
        return ListUtils.reverseElementBy(this.importer.levelInfo, (levelInfo) => levelInfo.tagImporter.elementTag() == tagName).tagImporter;
    }
    isAllowed() {
        return true;
    }
    addRun(run) {
        this.importer.addRun(run);
    }
    get element() {
        return this.importer.currElement;
    }
}
