# Maintenance datasource

## Scopo

Questo datasource è il punto di persistenza condiviso per i dev tools aReS che devono tracciare progetti, task, job, run, log e artefatti.

Nel repository corrente la sua posizione canonica è:

```txt
ecosystem/datasources/maintenance
```

## File presenti

- `datasource.js`: definizione del datasource e degli ambienti
- `current-schemas.json`: snapshot/schema corrente rilevato o mantenuto dal tooling

## Ruolo nel panorama application managing

Questo datasource è pensato per essere usato da:

- `@ares/dev-test-server`
- `@ares/scd`
- `@ares/project-manager`
- `@ares/db-client-api` / `@ares/db-client`
- moduli futuri che devono leggere o scrivere stato operativo condiviso

## Stato attuale

Lo stato attuale è da considerare **iniziale**:

- esistono già tabelle legacy (`applications`, `tickets`);
- il naming non è ancora perfettamente allineato al modello target del piano di sviluppo;
- la documentazione del contratto adesso vive anche nel ticket `../../../tickets/20260819-phase1-dev-tools-foundation-contract.md`.

## Modello target

Le aree dati da coprire nelle prossime fasi sono:

- progetti / workspace
- task
- definizioni di job
- esecuzioni job
- log
- artefatti

## Nota di compatibilità

Nel file `datasource.js` l'identificatore ambiente/connessione attuale usa il nome `mysql_ares_geo`, che appare derivato da un contesto precedente. Fino a una normalizzazione del codice, questo nome va considerato **legacy tecnico** e non il riferimento semantico corretto del datasource di manutenzione.
