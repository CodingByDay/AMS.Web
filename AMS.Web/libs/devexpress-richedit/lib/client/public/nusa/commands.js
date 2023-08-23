export function createDefaultCommandSets() {
    return [
        {
            title: 'Text formatting commands',
            description: 'a set of formatting commands',
            commands: [
                {
                    commandId: 'DxReFontColor',
                    phrase: 'set <DxReColorName> font color',
                    title: 'set <DxReColorName> font color',
                    description: 'Set font color'
                },
                {
                    commandId: 'DxReFontSize',
                    phrase: 'font size <standard:cardinal0-100>',
                    title: 'Font size <standard:cardinal0-100>',
                    description: 'Change font size'
                },
            ]
        }
    ];
}
