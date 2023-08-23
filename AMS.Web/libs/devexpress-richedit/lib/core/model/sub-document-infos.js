import { Errors } from '@devexpress/utils/lib/errors';
import { SubDocumentInfoType } from './enums';
import { HeaderFooterType } from './section/enums';
export class SubDocumentInfoBase {
    constructor(subDocumentId) {
        this.isMain = true;
        this.isHeaderFooter = false;
        this.isFooter = false;
        this.isHeader = false;
        this.isNote = false;
        this.isFootNote = false;
        this.isEndNote = false;
        this.isTextBox = false;
        this.isComment = false;
        this.isReferenced = true;
        this.subDocumentId = subDocumentId;
    }
    getEndPosition(documentModel) {
        return documentModel.subDocuments[this.subDocumentId].getLastChunk().getEndPosition();
    }
    getSubDocument(documentModel) {
        return documentModel.subDocuments[this.subDocumentId];
    }
    static create(type, subDocumentId, parentSubDocumentId) {
        switch (type) {
            case SubDocumentInfoType.Main:
                return new MainSubDocumentInfo();
            case SubDocumentInfoType.Header:
                return new HeaderSubDocumentInfo(subDocumentId);
            case SubDocumentInfoType.Footer:
                return new FooterSubDocumentInfo(subDocumentId);
            case SubDocumentInfoType.TextBox:
                return new TextBoxSubDocumentInfoBase(subDocumentId, parentSubDocumentId);
        }
        throw new Error(Errors.NotImplemented);
    }
}
export class TextBoxSubDocumentInfoBase extends SubDocumentInfoBase {
    constructor(subDocumentId, parentSubDocumentId) {
        super(subDocumentId);
        this.isMain = false;
        this.isTextBox = true;
        this.parentSubDocumentId = parentSubDocumentId;
    }
    getType() {
        return SubDocumentInfoType.TextBox;
    }
    clone() {
        return new TextBoxSubDocumentInfoBase(this.subDocumentId, this.parentSubDocumentId);
    }
}
export class MainSubDocumentInfo extends SubDocumentInfoBase {
    constructor() {
        super(0);
    }
    getType() {
        return SubDocumentInfoType.Main;
    }
    getEndPosition(documentModel) {
        var sections = documentModel.sections;
        var lastSection = sections[sections.length - 1];
        return lastSection.startLogPosition.value + lastSection.getLength();
    }
    clone() {
        return new MainSubDocumentInfo();
    }
}
export class HeaderFooterSubDocumentInfoBase extends SubDocumentInfoBase {
    constructor() {
        super(...arguments);
        this.headerFooterType = HeaderFooterType.Odd;
        this.isMain = false;
        this.isHeaderFooter = true;
    }
}
export class HeaderSubDocumentInfo extends HeaderFooterSubDocumentInfoBase {
    constructor() {
        super(...arguments);
        this.isHeader = true;
    }
    getType() {
        return SubDocumentInfoType.Header;
    }
    clone() {
        return new HeaderSubDocumentInfo(this.subDocumentId);
    }
}
export class FooterSubDocumentInfo extends HeaderFooterSubDocumentInfoBase {
    constructor() {
        super(...arguments);
        this.isFooter = true;
    }
    getType() {
        return SubDocumentInfoType.Footer;
    }
    clone() {
        return new FooterSubDocumentInfo(this.subDocumentId);
    }
}
