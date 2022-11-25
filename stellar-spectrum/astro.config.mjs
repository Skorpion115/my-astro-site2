import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    // Die endgültige Seite bei deinem Hostanbieter
    site: 'https://musikstudio-ziebart.de',
    // Sitemap intergrieren
    integrations: [sitemap(), react()],
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
