# Panoramica CLI — @ares/ecosystem-microservices-geo

## Stato

Questo modulo **non ha una CLI binaria dedicata** (`package.json` non definisce `bin`). È un server applicativo aReS avviato tramite npm scripts.

## Comandi (npm scripts)

| Comando | Scopo |
|---|---|
| `npm start` | Avvia il server: `node --preserve-symlinks index.js` (usa symlink per i workspace). |
| `npm run lint` | Esegue ESLint su tutta la codebase: `eslint .`. |
| `npm test` | Placeholder (nessun test definito, ritorna errore). |

## Comandi esposti dal runtime (non CLI)

Il modulo non è un binario, ma quando è in esecuzione espone servizi su HTTP, WebSocket e MCP:

- `GET /ares/geo/doc/compare-addresses` — pagina di documentazione geo (localizzata da `accept-language`).
- `POST /ares/geo/compare-addresses` — confronta due indirizzi (`{address1, address2}`) → `{matches, matchPercentage, differences}`.
- `GET /ares/core` — manifest delle core utility (modules/utilities).
- `GET /ares/core/:moduleName` — elenco utility per modulo core.
- `POST /ares/core/:moduleName/:utilityName` — invoca una core utility.
- WebSocket `invoke-core` — invoca core utility via WS.
- MCP tool `core.list_modules`, `core.list_utilities`, `core.invoke`, `core.<module>.<utility>`.
