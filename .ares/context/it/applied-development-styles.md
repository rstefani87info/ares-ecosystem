# Stili di sviluppo applicati — @ares/ecosystem-microservices-geo

## Standard di programmazione

- Modulo **ESM** (`"type": "module"`) con entrypoint root `index.js`.
- Convenzioni aReS: moduli importati via `import * as namespace from "@ares/..."`, codebase documentata con commenti `@author`, `@license`, `@prototype`.
- Lint tramite **ESLint** (flat config `eslint.config.js`, dev-deps `@eslint/js`, `globals`). Nessuno strumento di build/transpile: JS nativo ESM.
- Divieto di committare segreti e service account (vedi `@ares/google`).

## Contratto directory / file

```text
ecosystem/
├─ app.js                          # MANUALE  — config app (porte, sessione, jwt)
├─ index.js                        # MANUALE  — entrypoint server
├─ address.js                      # MANUALE  — logica confronto indirizzi
├─ it-street-address-ai.js         # MANUALE  — confronto AI vie
├─ core-utilities.js               # MANUALE  — registry/invoke utility @ares/core
├─ core-utilities-server.js        # MANUALE  — route HTTP / WS / MCP
├─ permissionData.js               # MANUALE  — dati permessi
├─ package.json                    # MANUALE
├─ README.md                       # MANUALE
├─ eslint.config.js                # MANUALE
├─ .gitignore                      # MANUALE
├─ debug.log / error.log           # GENERATO (runtime)
├─ public/geo/doc/*.html           # MANUALE  — pagine doc geo
├─ datasources/<name>/             # MISTO
│  ├─ *.sql / *.js (by_id, -list, -create, ...)   # GENERATO  (scaffold datasource)
│  ├─ datasource.js                # GENERATO/MANUALE
│  └─ current-schemas.json         # GENERATO  (da ares-datasource-current-schemas)
├─ db/
│  ├─ migrations/data/*.sql        # MANUALE  — dati (/ migrazioni applicate)
│  ├─ migrations/structure/*.sql   # MANUALE  — struttura vigente
│  └─ migrations/__old_structure/  # MANUALE (storico) — ignorato da .gitignore
├─ node_modules/                   # GENERATO  (ignorato)
├─ .git/                           # GENERATO  (locale)
└─ .ares/
   ├─ context/                     # MANUALE   — doc di contesto (prodotto)
   ├─ docs/{en,it}/                # MANUALE   — documentazione
   └─ tasks/                       # MANUALE   — task canonici
```

## Generato automaticamente vs Manuale

### Generato automaticamente (non committare / non editare a mano)

- `node_modules/` (ignorato da .gitignore).
- `current-schemas.json` dentro `datasources/<name>/` (prodotto da `ares-datasource-current-schemas`).
- Scaffold `.js`/`.sql` dei datasource (CRUD generati).
- `.git/` e `.yarn/` (tooling).
- `debug.log`, `error.log` (log di runtime).

### Manuale (scritto a mano, NON rigenerare/sovrascrivere)

- `index.js`, `app.js`, `address.js`, `core-utilities*.js`, `permissionData.js`, `it-street-address-ai.js`.
- `db/migrations/` (structure/data) — sorgente da preservare.
- `public/geo/doc/`, `README.md`, `eslint.config.js`, `.gitignore`.
- `package.json` e tutti i file dentro `.ares/` (context, docs, tasks) e `datasources/*/README.md`.
