# Dipendenze — @ares/ecosystem-microservices-geo

## Dipendenze @ares/* usate

| Modulo | Perché |
|---|---|
| `@ares/core` | Runtime principale `aReS` (`aReSInitialize`), plus utility nei namespace `@ares/core/*` esposte dalle core-utilities (arrays, crypto, dates, geographical, i18n, json, numbers, objects, regex, security, text, time-mapping, trees, url, xml). |
| `@ares/datasource-files` | Init (`initAllDatasources`) e hot reload (`enableDatasourceHotReload`) dei datasource da filesystem. |
| `@ares/datasource-mysql` | Supporto datasource MySQL (query geo/usati dal datasource `ares`). |
| `@ares/files` | Utility filesystem (`getAbsolutePath`, `fileExists` per fissare `datasourcesRoot` e servire i file geo). |
| `@ares/google` | Integrazione credenziali/service account Google (dichiarata in deps; non importata direttamente in `index.js` ma fornita al bundle ecosystem). |
| `@ares/mcp` | Esposizione server MCP (`@ares/mcp/server.js`) e registrazione tool. |
| `@ares/prototype-files` | Gestione prototipi/file legacy dell'ecosistema. |
| `@ares/web` | Framework web: `@ares/web/server.js` (servizio `aReSWeb`) e `@ares/web/jwt.js` (usato in `app.js`). |
| `@ares/web-socket` | Channel WebSocket (`@ares/web-socket`) per il runtime. |
| `@ares/core-dev` (dev) | Dev tools aReS per lo sviluppo. |
| `@ares/scd` (dev) | Strumenti SCD per analisi/generazione documentazione (project:*, context). |

## Dipendenze esterne rilevanti

`express`, `express-session`, `body-parser`, `jsonwebtoken`, `mysql`, `nanoid`, `levenshtein`, `string-similarity`, `whois`, `@paypal/checkout-server-sdk`.

## Chi dipende da questo modulo

Nessun altro modulo aReS dichiara `@ares/ecosystem-microservices-geo` come dipendenza nei relativi `package.json` (ad oggi è un modulo applicativo a sé stante nel monorepo).
