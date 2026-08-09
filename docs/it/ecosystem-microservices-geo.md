# Documentazione @ares/ecosystem-microservices-geo

## Scopo

Descrizione e obiettivi del modulo `@ares/ecosystem-microservices-geo`.

## Installazione

```bash
yarn add @ares/ecosystem-microservices-geo
```

In un monorepo Yarn Workspaces:

```bash
yarn workspace <app> add @ares/ecosystem-microservices-geo
```

## Quickstart

Esempio minimale:

```js
import * as mod from "@ares/ecosystem-microservices-geo";
```

## API pubbliche (exports)

Questa sezione documenta la superficie pubblica reale a livello di entrypoint e simboli principali.

Entrypoint root:

- `@ares/ecosystem-microservices-geo`

File principali nel root del package (indicativi):

- `address.js`
- `app.js`
- `GeoTreeNode.js`
- `index.js`
- `it-street-address-ai.js`
- `permissionData.js`

## Configurazione (appSetup / config / policies)

Questo modulo può leggere configurazioni da `appSetup`, `config` o `policies` a seconda del tipo. Documenta qui le chiavi effettivamente consumate quando stabilizzi il contract.

## Test

Esecuzione test del modulo (se presenti):

```bash
yarn workspace @ares/ecosystem-microservices-geo test
```

## Note

- Questo documento è mantenuto in parallelo ai ticket del modulo.
