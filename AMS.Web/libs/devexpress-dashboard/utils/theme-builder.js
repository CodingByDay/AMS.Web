﻿/**
* DevExpress Dashboard (theme-builder.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
const path = require('path');
const fs = require('fs');
const url = require('url');

const colorSchemeFile = "__color-scheme";
const sizeSchemeFile = "__size-scheme";
const devextremeThemeVars = "__devextreme-theme-vars";
const dashboardCustomVars = "__dashboard-custom-vars";

const defaultThemes = {
    generic: {
        indexFile: 'styles/generic/index.generic.scss',
        colorSchemes: {
            "light": { path: "styles/generic/color-schemes/light/generic.light.devextreme.scss" },
            "dark": { path: "styles/generic/color-schemes/dark/generic.dark.devextreme.scss" },

            "carmine": { path: "styles/generic/color-schemes/light/generic.carmine.devextreme.scss" },
            "greenmist": { path: "styles/generic/color-schemes/light/generic.green.mist.devextreme.scss" },
            "softblue": { path: "styles/generic/color-schemes/light/generic.soft.blue.devextreme.scss" },

            "darkmoon": { path: "styles/generic/color-schemes/dark/generic.dark.moon.devextreme.scss" },
            "darkviolet": { path: "styles/generic/color-schemes/dark/generic.dark.violet.devextreme.scss" }
        },
        sizeSchemes: {
            "": { name: "", path: "styles/generic/size-schemes/default.scss" },
            "compact": { name: "compact", path: "styles/generic/size-schemes/compact.scss" }
        }
    },
    material: {
        indexFile: 'styles/material/index.material.scss',
        colorSchemes: {
            "blue.light": { path: "styles/material/color-schemes/light/material.blue.light.devextreme.scss" },
            "blue.dark": { path: "styles/material/color-schemes/dark/material.blue.dark.devextreme.scss" },
            "lime.light": { path: "styles/material/color-schemes/light/material.lime.light.devextreme.scss" },
            "lime.dark": { path: "styles/material/color-schemes/dark/material.lime.dark.devextreme.scss" },
            "orange.light": { path: "styles/material/color-schemes/light/material.orange.light.devextreme.scss" },
            "orange.dark": { path: "styles/material/color-schemes/dark/material.orange.dark.devextreme.scss" },
            "purple.light": { path: "styles/material/color-schemes/light/material.purple.light.devextreme.scss" },
            "purple.dark": { path: "styles/material/color-schemes/dark/material.purple.dark.devextreme.scss" },
            "teal.light": { path: "styles/material/color-schemes/light/material.teal.light.devextreme.scss" },
            "teal.dark": { path: "styles/material/color-schemes/dark/material.teal.dark.devextreme.scss" },
        },
        sizeSchemes: {
            "": { name: "", path: "styles/material/size-schemes/default.scss" },
            "compact": { name: "compact", path: "styles/material/size-schemes/compact.scss" }
        }
    }
};

const getBaseThemeInfo = (themeName) => {
    let themeParts = themeName.split('.');

    let isCompact = themeParts[themeParts.length - 1] === 'compact';
    return {
        type: themeParts[0],
        size: isCompact ? 'compact' : '',
        color: themeParts.slice(1, isCompact ? themeParts.length - 1 : themeParts.length).join('.'),
    }
}

const isBaseThemeValid = (themeInfo) => {
    let themeTypeInfo = defaultThemes[themeInfo.type];
    return !!(
        themeTypeInfo
        && themeTypeInfo.indexFile
        && themeTypeInfo.colorSchemes[themeInfo.color] 
        && themeTypeInfo.sizeSchemes[themeInfo.size]
    );
}

const readInput = options => new Promise(resolve => {
    const fileName = options.inputFile;
    if(!fileName)
        resolve(options);
    else {
        fs.readFile(fileName, (error, data) => {
            if(error) {
                console.error(`Unable to read the ${fileName} file.`);
            } else {
                const extension = path.extname(fileName);
                if(extension !== '.json') {
                    options.data = data;
                } else {
                    const inputObject = JSON.parse(data);
                    Object.assign(options, inputObject);
                }
            }
            resolve(options);
        });
    }
});

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if(fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

function buildDashboardTheme(baseThemeInfo, dashboardColorVariables, devextremeMetadata, resolvePath, sass) {
    let themeTypeInfo = defaultThemes[baseThemeInfo.type];

    let colorSchemeScss = themeTypeInfo.colorSchemes[baseThemeInfo.color];
    let sizeSchemeScss = themeTypeInfo.sizeSchemes[baseThemeInfo.size];
  
    var devextremeVarsFile = Object.keys(devextremeMetadata)
        .reduce((acc, key) => acc + `${key.replace('@', '$')}: ${devextremeMetadata[key]};\n`, '');
    var customDashboardVarsFile = (dashboardColorVariables || [])
        .reduce((acc, value) => acc + `${value.key.replace('@', '$')}: ${value.value};\n`, '');

    var dashboardThemeResult = sass.renderSync({
        file: resolvePath(themeTypeInfo.indexFile),
        importer: function(fileUrl, prev, done) {
            if(fileUrl.indexOf(colorSchemeFile) !== -1) {
                return { file: resolvePath(colorSchemeScss.path) };
            } else if(fileUrl.indexOf(sizeSchemeFile) !== -1) {
                return { file: resolvePath(sizeSchemeScss.path) };
            } else if(fileUrl.indexOf(devextremeThemeVars) !== -1) {
                return { contents: devextremeVarsFile };
            } else if(fileUrl.indexOf(dashboardCustomVars) !== -1) {
                return { contents: customDashboardVarsFile };
            } else {
                return { file: url.parse(fileUrl).protocol === 'file:' ? url.fileURLToPath(fileUrl) : fileUrl };
            }
        }
    });

    return new Promise((resolve) => resolve(dashboardThemeResult));
}

function writeResult(
    cleanCSS,
    devextremeResult, analyticsResult, dashboardResult,
    getDashboardCssHeader,
    outputColorScheme, outDir,
    saveDevExtremeCss = false, saveAnalyticsCss = false, createMinFile = false
) {
    var outFileName = path.join(outDir, `dx-dashboard.${outputColorScheme}.css`);
    ensureDirectoryExistence(outFileName);

    if(saveDevExtremeCss) {
        let getFileName = (isMin) => path.join(outDir, `dx.${outputColorScheme}${isMin ? '.min' : ''}.css`);

        fs.writeFileSync(getFileName(false), devextremeResult.css); // TODO: ensure devextreme file name
        if(createMinFile) {
            let minFile = new cleanCSS().minify(devextremeResult.css);
            fs.writeFileSync(getFileName(true), minFile.styles);
        }
    }
    if(saveAnalyticsCss) {
        let getFileName = (isMin) => path.join(outDir, `dx-analytics.${outputColorScheme}${isMin ? '.min' : ''}.css`);

        fs.writeFileSync(getFileName(false), analyticsResult.css); // TODO: ensure devextreme file name
        if(createMinFile) {
            let minFile = new cleanCSS().minify(analyticsResult.css);
            fs.writeFileSync(getFileName(true), minFile.styles);
        }
    }

    let dashboardCSS = dashboardResult.css.toString();
    fs.writeFileSync(outFileName, getDashboardCssHeader(outputColorScheme) + dashboardCSS);
    if(createMinFile) {
        let minFile = new cleanCSS().minify(dashboardCSS);
        let outMinFileName = path.join(outDir, `dx-dashboard.${outputColorScheme}.min.css`);
        fs.writeFileSync(outMinFileName, minFile.styles);
    }
}

async function buildTheme(options, devExtremeThemeBuilder, analyticsThemeBuilder, sass, nodeLess, cleanCSS, getCssHeader = () => '') {
    const processedOptions = await readInput(options);
    options.baseTheme = options.baseTheme || "generic.light";

    let baseThemeInfo = getBaseThemeInfo(options.baseTheme);
    
    if(!isBaseThemeValid(baseThemeInfo)) {
        throw new Error('Incorrect or unsupported base theme.')
    }
    
    let devextremeOptions = { ...processedOptions }; // devextremeOptions object is changed while running the devextreme theme builder
    let devextremeResult = await devExtremeThemeBuilder.buildTheme(devextremeOptions)

    if(options.createAnalyticsCss && analyticsThemeBuilder) {
        var analyticsResult = await analyticsThemeBuilder(nodeLess, options.baseTheme, options.analyticsItems);
    }

    let resolvePath = (p) => path.resolve(path.join(__dirname, "../scss"), p)
    let dashboardResult = await buildDashboardTheme(baseThemeInfo, options.dashboardItems, devextremeResult.compiledMetadata, resolvePath, sass);

    return writeResult(
        cleanCSS,
        devextremeResult,
        analyticsResult,
        dashboardResult,
        getCssHeader,
        options.outputColorScheme,
        options.outputDir,
        options.createDevExtremeCss,
        options.createAnalyticsCss,
        options.createMinifiedCss
    );
}

module.exports.buildTheme = buildTheme;
