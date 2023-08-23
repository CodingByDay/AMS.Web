import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { StringUtils } from '@devexpress/utils/lib/utils/string';
import { FontLoadStatus } from './control-font';
export class ControlFontsLoader {
    constructor(controlFontsCache, fontsSettings, showConsoleMessage) {
        this.fontsCache = controlFontsCache;
        this.fontsSettings = fontsSettings;
        this.showConsoleMessage = showConsoleMessage;
    }
    loadFonts(fonts, loadWithStatus, callback) {
        this.needInvalidateLayout = false;
        const fontsToLoad = [];
        for (let font of fonts) {
            font = this.fontsCache.addFont(font);
            if (ListUtils.unsafeAnyOf(loadWithStatus, s => s == font.status))
                fontsToLoad.push(new FontToLoad(font, this.fontsSettings));
        }
        let notLoadedFontsCount = fontsToLoad.length;
        if (notLoadedFontsCount) {
            for (let font of fontsToLoad) {
                font.font.status = FontLoadStatus.Loading;
                this.makeRequest(font, (data) => {
                    font.font.status = data ? FontLoadStatus.Loaded : FontLoadStatus.Error;
                    if (data) {
                        font.font.applySource(data, () => {
                            this.needInvalidateLayout = true;
                        });
                        if (StringUtils.endsAt(font.currentPath, '.ttc'))
                            font.font.isFontCollection = true;
                    }
                    notLoadedFontsCount--;
                    if (!notLoadedFontsCount)
                        callback();
                });
            }
        }
        else
            setTimeout(callback, 0);
    }
    makeRequest(fontInfo, afterLoading) {
        const notLoaded = () => {
            if (this.showConsoleMessage)
                fontInfo.showError();
            afterLoading(null);
        };
        const xhr = new XMLHttpRequest();
        xhr.onload = (_e) => {
            const fontSource = xhr.response;
            if (xhr.status >= 400 || !fontSource) {
                if (fontInfo.next())
                    this.makeRequest(fontInfo, afterLoading);
                else
                    notLoaded();
            }
            else
                afterLoading(fontSource);
        };
        xhr.onerror = () => notLoaded();
        xhr.open("GET", fontInfo.currentPath, true);
        xhr.responseType = "arraybuffer";
        xhr.send();
    }
}
class FontToLoad {
    constructor(font, fontsSettings) {
        this.sourceUrls = [];
        this.ind = 0;
        this.font = font;
        this.sourceUrls = font.allSourceUrls(fontsSettings.defaultFolder);
    }
    get currentPath() { return this.sourceUrls[this.ind]; }
    next() {
        return ++this.ind < this.sourceUrls.length;
    }
    showError() {
        console.log('Font is not loaded: {name = ' + this.font.fontFamily
            + ', bold = ' + this.font.descriptors.msWordBold()
            + ', italic = ' + this.font.descriptors.msWordItalic() + '}');
    }
}
