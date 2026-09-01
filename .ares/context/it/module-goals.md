# Obiettivi del modulo @ares/ecosystem-microservices-geo

## Introduzione

`@ares/ecosystem-microservices-geo` è il modulo *ecosystem* del framework aReS: raccoglie dati geografici condivisi, datasource canonici e servizi di utilità esposti tramite HTTP, WebSocket e MCP. Nel contesto "application managing" ospita anche il datasource canonico di manutenzione in `./datasources/maintenance`.

Si tratta di un modulo **ESM** (`"type": "module"`) con entrypoint root `index.js` e server REST che avvia su porta `webServerPort` (default 3009) e socket su `webSocketPort` (default 3010).

## Obiettivi principali

- Fornire datasource condivisi e canonici (geo/`ares`, `maintenance`, `privacy`) con relativi SQL e `current-schemas.json`.
- Esporre un server REST/`aReS` che integra web, web-socket, MCP e datasource del filesystem.
- Rendere disponibili le utility di `@ares/core` tramite endpoint HTTP, WebSocket e tool MCP (namespace `core.*`).
- Fornire funzionalità geo: confronto indirizzi (`compareAddresses`) con endpoint dedicati e pagina di documentazione locale (`.html`).
- Integrare pagamenti PayPal, autenticazione JWT e sessioni (configurazione in `app.js`).

## Responsabilità

- Init e avvio del runtime `aReS` (web + web-socket + MCP) in `index.js`.
- Registrazione delle route HTTP e dei tool MCP per le core utility (vedi `core-utilities-server.js`).
- Gestione datasource da filesystem: init, hot reload e routing (via `@ares/datasource-files`).
- Logica confronto indirizzi (`address.js` + `it-street-address-ai.js`).
- Dati SQL e migrazioni DB (geo, i18n) in `db/migrations/` e `datasources/`.

## Cosa NON fa

- Non è un framework di basso livello: delega a `@ares/core`, `@ares/web`, `@ares/web-socket`, `@ares/mcp`.
- Non gestisce direttamente credenziali Google: usa `@ares/google` come dipendenza.
- Non definisce un CLI standalone: è un server applicativo avviato via `npm start`.
