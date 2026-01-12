// docs/.vitepress/config.mts

import { defineConfig } from 'vitepress'
import {
    generateChanges,
    generateVersionRewrites,
    generateVersionSidebars,
    generateVersionSwitcher
} from './data/versions'

export default defineConfig({
    title: 'sholokhov.frontboot',
    description: 'Документация по модулю sholokhov.frontboot',
    base: '/frontboot.doc/',
    cleanUrls: true,
    rewrites: generateVersionRewrites(),
    head: [
        [
            'link',
            {rel: 'icon', href: '/frontboot.doc/favicon.ico'}
        ]
    ],

    themeConfig: {
        themeConfig: {
            versionSwitcher: true,
        },
        outline: {
            level: [2,3,4],
            label: 'На этой странице'
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/sholokhov-daniil/frontboot' }
        ],
        nav: [
            generateChanges(),
            {text: 'Сообщить об ошибке', link: "https://github.com/sholokhov-daniil/frontboot/issues"},
            generateVersionSwitcher(),
        ],
        sidebar: generateVersionSidebars(),
    }
});