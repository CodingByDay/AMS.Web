import { ExporterBaseWithRootElement } from './base';
export declare class SettingsExporter extends ExporterBaseWithRootElement {
    get filePath(): string;
    get rootElement(): string;
    get rootNSPrefix(): string;
    get rootNSValue(): string;
    protected fillWriter(): void;
    private exportColorSchemeMapping;
    private exportCompatSettings;
    private exportCompatSetting;
    private exportDocumentVariables;
    private exportColorSchemeMappingElement;
    private exportDocumentProtectionSettings;
    private exportDocumentProtectionType;
    private exportDocumentProtectionSettingsCore;
}
//# sourceMappingURL=settings.d.ts.map