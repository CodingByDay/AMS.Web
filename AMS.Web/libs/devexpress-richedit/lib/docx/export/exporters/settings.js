import { ThemeColorIndexConstants } from '../../../core/model/color/enums';
import { DocumentProtectionType } from '../../../core/model/json/enums/json-document-enums';
import { CryptProviderType } from '../../../core/model/options/document-protection';
import { SchemeColorValues } from '../../../core/model/themes/enums';
import { ThemeDrawingColorCollection } from '../../../core/model/themes/theme-drawing-color-collection';
import { Base64Utils } from '@devexpress/utils/lib/utils/base64';
import { isDefined } from '@devexpress/utils/lib/utils/common';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { StringUtils } from '@devexpress/utils/lib/utils/string';
import { TranslationTables } from '../../translation-table/translation-tables';
import { WordProcessingMLValue } from '../../translation-table/word-processing-mlvalue';
import { DocxConstants, DocxNsType } from '../../utils/constants';
import { ExporterBaseWithRootElement } from './base';
export class SettingsExporter extends ExporterBaseWithRootElement {
    get filePath() { return 'word/settings.xml'; }
    get rootElement() { return new WordProcessingMLValue('settings', 'docPr').openXmlValue; }
    get rootNSPrefix() { return this.data.constants.namespaces[DocxNsType.WordProcessing].prefix; }
    get rootNSValue() { return this.data.constants.namespaces[DocxNsType.WordProcessing].namespace; }
    fillWriter() {
        const mirrorMargins = this.data.model.mirrorMargins;
        if (mirrorMargins)
            this.writer.writeWpBoolValueAsTag('mirrorMargins', mirrorMargins);
        this.writer.writeWpBoolValue('displayBackgroundShape', this.data.model.displayBackgroundShape);
        this.exportDocumentProtectionSettings();
        this.writer.writeWpIntValue('defaultTabStop', this.data.model.defaultTabWidth);
        this.writer.writeWpBoolValue('autoHyphenation', false);
        this.writer.writeWpBoolValue('evenAndOddHeaders', this.data.model.differentOddAndEvenPages);
        this.exportCompatSettings();
        this.exportDocumentVariables();
        this.exportColorSchemeMapping();
    }
    exportColorSchemeMapping() {
        const mapping = ThemeDrawingColorCollection.schemeColorValuesToThemeColorIndexTranslationTable;
        this.writer.writeWpStartElement('clrSchemeMapping');
        this.exportColorSchemeMappingElement(mapping, SchemeColorValues.Background1, 'bg1');
        this.exportColorSchemeMappingElement(mapping, SchemeColorValues.Text1, 't1');
        this.exportColorSchemeMappingElement(mapping, SchemeColorValues.Background2, 'bg2');
        this.exportColorSchemeMappingElement(mapping, SchemeColorValues.Text2, 't2');
        this.exportColorSchemeMappingElement(mapping, SchemeColorValues.Accent1, 'accent1');
        this.exportColorSchemeMappingElement(mapping, SchemeColorValues.Accent2, 'accent2');
        this.exportColorSchemeMappingElement(mapping, SchemeColorValues.Accent3, 'accent3');
        this.exportColorSchemeMappingElement(mapping, SchemeColorValues.Accent4, 'accent4');
        this.exportColorSchemeMappingElement(mapping, SchemeColorValues.Accent5, 'accent5');
        this.exportColorSchemeMappingElement(mapping, SchemeColorValues.Accent6, 'accent6');
        this.exportColorSchemeMappingElement(mapping, SchemeColorValues.Hyperlink, 'hyperlink');
        this.exportColorSchemeMappingElement(mapping, SchemeColorValues.FollowedHyperlink, 'followedHyperlink');
        this.writer.endElement();
    }
    exportCompatSettings() {
        this.writer.writeWpStartElement('compat');
        this.exportCompatSetting('compatibilityMode', this.data.model.compatibilitySettings.compatibilityMode.toString(), DocxConstants.wordNamespace);
        ListUtils.forEach(this.data.model.compatSettings.filter(s => s.name !== 'compatibilityMode'), (settings) => {
            this.exportCompatSetting(settings.name, settings.value, settings.uri);
        });
        this.writer.endElement();
    }
    exportCompatSetting(name, value, uri) {
        this.writer.writeWpStartElement('compatSetting');
        this.writer.writeWpStringAttr('name', name);
        this.writer.writeWpStringAttr('uri', uri);
        this.writer.writeWpStringAttr('val', value);
        this.writer.endElement();
    }
    exportDocumentVariables() {
        this.writer.writeWpStartElement('docVars');
        this.data.model.docVariables.foreach((name, value) => {
            if (!isDefined(value) || typeof (value) == 'object')
                return;
            value = String(value);
            if (StringUtils.isNullOrEmpty(value))
                return;
            this.writer.writeWpStartElement('docVar');
            this.writer.writeWpStringAttr('name', name);
            this.writer.writeWpStringAttr('val', value);
            this.writer.endElement();
        });
        this.writer.endElement();
    }
    exportColorSchemeMappingElement(mapping, key, attribute) {
        const themeColorIndex = mapping[key];
        if (themeColorIndex !== undefined && themeColorIndex != ThemeColorIndexConstants.None) {
            const value = TranslationTables.simpleThemeColorIndexTable[themeColorIndex];
            if (value !== undefined)
                this.writer.writeWpStringAttr(attribute, value);
        }
    }
    exportDocumentProtectionSettings() {
        const properties = this.data.model.documentProtectionProperties;
        if (!properties.enforceProtection)
            return;
        this.writer.writeWpStartElement('documentProtection');
        this.exportDocumentProtectionType(properties.protectionType);
        this.writer.writeWpBoolAttr('enforcement', properties.enforceProtection);
        this.exportDocumentProtectionSettingsCore(properties);
        this.writer.endElement();
    }
    exportDocumentProtectionType(protectionType) {
        if (protectionType == DocumentProtectionType.ReadOnly)
            this.writer.writeWpStringAttr('edit', 'readOnly');
        if (protectionType == DocumentProtectionType.AllowComments)
            this.writer.writeWpStringAttr('edit', 'comments');
        if (protectionType == DocumentProtectionType.TrackedChanges)
            this.writer.writeWpStringAttr('edit', 'trackedChanges');
    }
    exportDocumentProtectionSettingsCore(properties) {
        if (!properties.passwordHash || properties.passwordHash.length <= 0)
            return;
        this.writer.writeWpStringAttr('cryptProviderType', properties.cryptProviderType == CryptProviderType.RsaAES ? 'rsaAES' : 'rsaFull');
        this.writer.writeWpStringAttr('cryptAlgorithmClass', 'hash');
        this.writer.writeWpStringAttr('cryptAlgorithmType', 'typeAny');
        this.writer.writeWpIntAttr('cryptAlgorithmSid', properties.hashAlgorithmType);
        this.writer.writeWpStringAttr('cryptSpinCount', Math.max(1, properties.hashIterationCount).toString());
        if (properties.passwordHash)
            this.writer.writeWpStringAttr('hash', Base64Utils.fromArrayBuffer(properties.passwordHash));
        if (properties.passwordPrefix)
            this.writer.writeWpStringAttr('salt', Base64Utils.fromArrayBuffer(properties.passwordPrefix));
    }
}
