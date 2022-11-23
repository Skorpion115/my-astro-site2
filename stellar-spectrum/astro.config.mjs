import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
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
    // Beispiel: Füge React- & Tailwind-Unterstützung zu Astro hinzu
    integrations: [react(), tailwind()],
    vite: {
        ssr: {
          // Beispiel: Erzwinge das Überspringen eines defekten Pakets
          // bei der SSR-Verarbeitung, falls erforderlich
          external: ['defektes-npm-paket'],
        }
    },
});
