import { MapCreator } from '../../../base-utils/map-creator';
import { NumberingFormat } from '../../../core/model/numbering-lists/list-level-properties';
import { NumberingType } from '../../../core/model/numbering-lists/numbering-list';
import { DomUtils } from '@devexpress/utils/lib/utils/dom';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { StringUtils } from '@devexpress/utils/lib/utils/string';
import { ImportedParagraphListInfo } from '../containers/runs';
import { HtmlImportUtils } from './utils';
export class ParagraphListPropertiesUtils {
    constructor(importer, htmlImporterMaskedCharacterProperties) {
        this.htmlImporterMaskedCharacterProperties = htmlImporterMaskedCharacterProperties;
        this.importer = importer;
    }
    import(element, interval) {
        this.listItemElement = DomUtils.getParentByTagName(element, "LI");
        this.msoListAttr = element.outerHTML.match(/mso-list:\s*\w*\s*level[^ ]/gi);
        if (!this.listItemElement && !this.msoListAttr)
            return null;
        this.parentListElement = this.listItemElement ? ParagraphListPropertiesUtils.getParentListElement(this.listItemElement) : null;
        if (!this.parentListElement)
            return null;
        const listIndex = this.importListIndex();
        const listLevelIndex = this.importListLevelIndex();
        let listFormat;
        let displayFormatString;
        let maskedCharacterProperties;
        if (this.listItemElement) {
            listFormat = this.importListFormatByListItemElement();
            displayFormatString = this.importDisplayFormatStringByParentListElement(listFormat, listLevelIndex);
            maskedCharacterProperties = null;
        }
        else {
            const listTextElement = ParagraphListPropertiesUtils.getListTextElement(element);
            const listText = ParagraphListPropertiesUtils.getListText(listTextElement);
            listFormat = ParagraphListPropertiesUtils.importListFormatByReserveWay(listText);
            displayFormatString = ParagraphListPropertiesUtils.importDisplayFormatStringByReserveWay(listFormat, listLevelIndex, listText);
            maskedCharacterProperties = this.htmlImporterMaskedCharacterProperties.import(listTextElement, interval, this.importer.charPropsBundle.props);
            ParagraphListPropertiesUtils.removeSomeHtml(element, listTextElement, listText);
        }
        return new ImportedParagraphListInfo(listIndex, listLevelIndex, listFormat, listFormat == NumberingFormat.Bullet ? NumberingType.Bullet : NumberingType.MultiLevel, displayFormatString, maskedCharacterProperties);
    }
    importListIndex() {
        if (this.msoListAttr && this.msoListAttr.length)
            return parseInt(this.msoListAttr[0].replace(/mso-list:\s*[A-Za-z]*(\d*)[\s\S]*/gi, '$1'));
        const mainParentListElement = this.getMainParentListElement();
        if (!mainParentListElement)
            return 0;
        const lists = DomUtils.getChildNodes(mainParentListElement.parentNode, (e) => {
            return e.tagName == "UL" || e.tagName == "OL";
        });
        return ListUtils.accumulate(lists, 0, (acc, list, index) => acc + (list == mainParentListElement ? index : 0));
    }
    importListLevelIndex() {
        if (this.msoListAttr && this.msoListAttr.length)
            return parseInt(this.msoListAttr[0].replace(/mso-list:\s*\w*\s*level/gi, '')) - 1;
        let listLevelIndex = 0;
        let parentListItemElement = this.parentListElement ? DomUtils.getParentByTagName(this.parentListElement, "LI") : null;
        while (parentListItemElement) {
            listLevelIndex++;
            parentListItemElement = DomUtils.getParentByTagName(parentListItemElement.parentNode, "LI");
        }
        return listLevelIndex;
    }
    importListFormatByListItemElement() {
        return ParagraphListPropertiesUtils.getListType(this.parentListElement);
    }
    static importListFormatByReserveWay(listText) {
        if (!listText)
            return NumberingFormat.None;
        const encodedIndexText = encodeURI(listText);
        if (listText == "o" || encodedIndexText.indexOf("%B7") > -1 || encodedIndexText.indexOf("%A7") > -1)
            return NumberingFormat.Bullet;
        if (/^(IX|IV|V?I{1,3})/.test(listText))
            return NumberingFormat.UpperRoman;
        if (/^(ix|iv|v?i{1,3})/.test(listText))
            return NumberingFormat.LowerRoman;
        if (/[0-9]/.test(listText))
            return NumberingFormat.Decimal;
        if (/[a-z]/.test(listText))
            return NumberingFormat.LowerLetter;
        if (/[A-Z]/.test(listText))
            return NumberingFormat.UpperLetter;
        return NumberingFormat.None;
    }
    importDisplayFormatStringByParentListElement(listFormat, listLevelIndex) {
        const listElementParentList = ParagraphListPropertiesUtils.getParentListElement(this.parentListElement.parentNode);
        if (listElementParentList) {
            const parentListFormat = ParagraphListPropertiesUtils.getListType(listElementParentList);
            if (listFormat != parentListFormat)
                return "{" + listLevelIndex + "}";
        }
        return "";
    }
    static importDisplayFormatStringByReserveWay(listFormat, listLevelIndex, listText) {
        if (listFormat == NumberingFormat.Bullet)
            return "";
        if (listText.indexOf(".") > -1)
            return ListUtils.accumulate(listText.split("."), "", (acc, listItem, listIndex) => listItem ? acc + "{" + listIndex + "}." : acc);
        const matches = listText.match(/^(\W?)(\w+)(\W?)/);
        return matches && matches.length > 2 ? matches[1] + "{" + listLevelIndex + "}" + matches[3] : listText.charAt(0);
    }
    getMainParentListElement() {
        let listElement = this.parentListElement ? this.parentListElement : null;
        let mainParentListElement = null;
        while (listElement) {
            mainParentListElement = listElement;
            listElement = ParagraphListPropertiesUtils.getParentListElement(listElement.parentNode);
        }
        return mainParentListElement;
    }
    static getListType(listElement) {
        return HtmlImportUtils.getPropertyByMap(ParagraphListPropertiesUtils.MapListTypeToType, DomUtils.getCurrentStyle(listElement).listStyleType, NumberingFormat.None);
    }
    static getListTextElement(element) {
        const ignoreElements = DomUtils.getNodes(element, (e) => { return e.outerHTML.match(/mso-list:Ignore/gi) != null; });
        let listTextElement = ignoreElements.length ? ignoreElements[0] : null;
        if (!listTextElement) {
            const whiteSpacesOnlyTextElements = DomUtils.getNodes(element, (e) => DomUtils.isTextNode(e) && e.nodeValue && !StringUtils.trim(e.nodeValue) ||
                e.textContent && !StringUtils.trim(e.textContent) ||
                e.innerText && !StringUtils.trim(e.innerText));
            listTextElement = whiteSpacesOnlyTextElements.length ? whiteSpacesOnlyTextElements[0].previousSibling : (element.firstChild);
        }
        return listTextElement;
    }
    static getListText(listTextElement) {
        return listTextElement ? StringUtils.trim((listTextElement.nodeValue || DomUtils.getInnerText(listTextElement)).split(" ")[0]) : "";
    }
    static getParentListElement(childElement) {
        return DomUtils.getParentByTagName(childElement, "UL") || DomUtils.getParentByTagName(childElement, "OL");
    }
    static removeSomeHtml(element, listTextElement, listText) {
        if (element.childNodes.length == 1)
            element.innerHTML = StringUtils.trimStart(element.innerHTML.replace(listText, ''));
        else {
            const listTextElementParent = listTextElement.parentNode;
            listTextElementParent.removeChild(listTextElement);
            listTextElementParent.innerHTML = listTextElementParent.innerHTML.replace(/^<([^\s>]+)(\s[^>]*)?>(\s|&nbsp;){2,}<\/\1>/g, '');
            if (listTextElement.parentNode != element)
                element.innerHTML = element.innerHTML.replace(/<([^\s>]+)(\s[^>]*)?><\/\1>/g, '');
        }
    }
}
ParagraphListPropertiesUtils.MapListTypeToType = new MapCreator()
    .add("decimal", NumberingFormat.Decimal)
    .add("circle", NumberingFormat.Bullet)
    .add("disc", NumberingFormat.Bullet)
    .add("square", NumberingFormat.Bullet)
    .add("lower-alpha", NumberingFormat.LowerLetter)
    .add("lower-latin", NumberingFormat.LowerLetter)
    .add("upper-alpha", NumberingFormat.UpperLetter)
    .add("upper-latin", NumberingFormat.UpperLetter)
    .add("lower-roman", NumberingFormat.LowerRoman)
    .add("upper-roman", NumberingFormat.UpperRoman)
    .get();
