import { __awaiter } from "tslib";
import { Log } from '../../../core/rich-utils/debug/logger/base-logger/log';
import { LogSource } from '../../../core/rich-utils/debug/logger/base-logger/log-source';
import { XmlNodeType } from '../../zip/xml-reader';
export class ElementDestination {
    constructor(data) {
        this.forbidProcessElementOpenClose = false;
        this.data = data;
    }
    get documentModel() { return this.data.documentModel; }
    get subDocument() { return this.data.subDocument; }
    processElementOpen(_reader) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    processElementClose(_reader) { }
    processText(_reader) {
        return true;
    }
    onAlternateContent() {
        return new AlternateContentDestination(this.data, this);
    }
    isChoiceNamespaceSupported(_requeriesNamespaceUri) {
        return false;
    }
    processCurrentElementInternal(reader) {
        return this.processCurrentElement(reader);
    }
    process(reader) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (reader.nodeType) {
                case XmlNodeType.Element: {
                    Log.print(LogSource.DocxImporter, 'process', () => `Element "${reader.localName}"`);
                    const nextDestination = this.processCurrentElement(reader);
                    if (nextDestination) {
                        this.data.destinationStack.push(nextDestination);
                        if (!this.data.destinationStack.last.forbidProcessElementOpenClose)
                            yield this.data.destinationStack.last.processElementOpen(reader);
                    }
                    else
                        reader.skipElement();
                    break;
                }
                case XmlNodeType.SignificantWhitespace:
                case XmlNodeType.CDATA:
                case XmlNodeType.Text: {
                    Log.print(LogSource.DocxImporter, 'process', () => `Text "${reader.value}"`);
                    return this.data.destinationStack.last.processText(reader);
                }
                case XmlNodeType.EndElement: {
                    Log.print(LogSource.DocxImporter, 'process', () => `Element end "${reader.localName}"`);
                    const destination = this.data.destinationStack.pop();
                    if (!destination.forbidProcessElementOpenClose)
                        destination.processElementClose(reader);
                    break;
                }
            }
            return Promise.resolve();
        });
    }
    peek() {
        return this;
    }
    shouldProcessWhitespaces(_reader) {
        return false;
    }
    processCurrentElement(reader) {
        const localName = reader.localName;
        if (localName == 'AlternateContent')
            return this.onAlternateContent();
        const handler = this.elementHandlerTable[localName];
        return handler ? handler(this.data, reader) : null;
    }
}
export class AlternateContentDestination extends ElementDestination {
    constructor(data, parentDestination) {
        super(data);
        this.parentDestination = parentDestination;
        parentDestination.forbidProcessElementOpenClose = true;
    }
    get elementHandlerTable() {
        this.data.options.throwInvalidFile('AlternateContentDestination exception');
        return null;
    }
    processElementClose(reader) {
        super.processElementClose(reader);
        this.parentDestination.forbidProcessElementOpenClose = false;
    }
    processCurrentElement(reader) {
        const localName = reader.localName;
        if (localName == 'Choice' && !this.hasProcessedChoice) {
            const requeries = reader.getAttribute('Requires');
            const namespaceUri = this.data.constants.lookupNamespaceByPrefix(requeries);
            if (this.parentDestination.isChoiceNamespaceSupported(namespaceUri)) {
                this.hasProcessedChoice = true;
                return this.parentDestination;
            }
        }
        else if (localName == 'Fallback' && !this.hasProcessedChoice)
            return this.parentDestination;
        return new EmptyDestination(this.data);
    }
}
export class LeafElementDestination extends ElementDestination {
    get elementHandlerTable() {
        return {};
    }
}
export class LeafSetMaskedPropertyDestination extends LeafElementDestination {
    constructor(data, properties, desc) {
        super(data);
        this.properties = properties;
        this.desc = desc;
    }
}
export class EmptyDestination extends LeafElementDestination {
}
export class TransparentDestination extends ElementDestination {
    constructor(data) {
        super(data);
        this.destination = this.data.destinationStack.last;
    }
    get elementHandlerTable() { return {}; }
    processElementOpen(_reader) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    processElementClose(_reader) {
    }
    processText(reader) {
        return this.destination.processText(reader);
    }
    peek() {
        return this.destination.peek();
    }
    processCurrentElement(reader) {
        return this.destination.processCurrentElementInternal(reader);
    }
}
export class CustomXmlDestination extends TransparentDestination {
}
