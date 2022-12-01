import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    // Adapter installiert
    output: 'server',
    adapter: node({
    mode: 'standalone'
    }),
    // Die endgültige Seite bei deinem Hostanbieter
    site: 'https://musikstudio-ziebart.de',
    // Sitemap intergrieren, Eine Seite aufnehmen die nicht mit Astro erstellt wurde
    integrations: [sitemap({
        customPages: ['https://www.musikstudio-ziebart.de/contact.html', 'https://www.musikstudio-ziebart.de/thanks.html'],
        entryLimit: 10000,
        lastmod: new Date('2022-11-24'),
    })],
    // Beispiel: Erfordere abschließende Schrägstriche
    // in Seiten-URLs während der Entwicklung
    trailingSlash: 'always',
    build: {
    // Beispiel: Erzeuge `page.html` statt `page/index.html`
    // während des Build-Prozesses.
        format: 'directory'
    },
    server: { port: 3000, host: true },
    server: { port: 3000 },
    markdown: {
        // Beispiel: Alle Entwürfe in den endgültigen Build einbeziehen
        drafts: true,
    },
    markdown: {
        // Beispiel: Verarbeite Markdown-Dateien ohne MDX
        mode: 'md',
    },
    vite: {
        ssr: {
          // Beispiel: Erzwinge das Überspringen eines defekten Pakets
          // bei der SSR-Verarbeitung, falls erforderlich
          external: ['defektes-npm-paket'],
        }
    },
});
