import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { DomUtils } from '@devexpress/utils/lib/utils/dom';
import { StringUtils } from '@devexpress/utils/lib/utils/string';
import { HtmlTagImporterBase } from './base';
export class HtmlPTagImporter extends HtmlTagImporterBase {
    constructor() {
        super(...arguments);
        this.listInfo = null;
        this.importChilds = false;
    }
    elementTag() {
        return "P";
    }
    importBefore() {
        let emptyParagraphMatches = this.element.outerHTML.match(/^<([^\s >]+)(\s[^>]*)?>&nbsp;<\/\1>/gi);
        if (!(emptyParagraphMatches && emptyParagraphMatches.length)) {
            if (StringUtils.trim(DomUtils.getInnerText(this.element)))
                this.listInfo = this.importer.paragraphListpropertiesUtils.import(this.element, new FixedInterval(this.importer.currPosition, 0));
            this.importChilds = true;
        }
    }
    isImportChilds() {
        return this.importChilds;
    }
    importAfter() {
        this.importer.addParagraphRun(this.listInfo, this.element);
    }
}
export class HtmlH1TagImporter extends HtmlPTagImporter {
    elementTag() {
        return "H1";
    }
}
export class HtmlH2TagImporter extends HtmlPTagImporter {
    elementTag() {
        return "H2";
    }
}
export class HtmlH3TagImporter extends HtmlPTagImporter {
    elementTag() {
        return "H3";
    }
}
export class HtmlH4TagImporter extends HtmlPTagImporter {
    elementTag() {
        return "H4";
    }
}
export class HtmlH5TagImporter extends HtmlPTagImporter {
    elementTag() {
        return "H5";
    }
}
export class HtmlH6TagImporter extends HtmlPTagImporter {
    elementTag() {
        return "H6";
    }
}
