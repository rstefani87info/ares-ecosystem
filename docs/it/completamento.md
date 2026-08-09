# Piano di completamento @ares/ecosystem-microservices-geo
> Generato: 2026-05-07
## Stato Attuale (scan)
- package.json: description VUOTA
- test script: PLACEHOLDER/ASSENTE
- test files: ASSENTI
- docs: GENERICHE/PLACEHOLDER
## Obiettivo
Rendere il modulo pronto per adozione stabile: contratto chiaro, configurazioni documentate, test minimi e packaging coerente.
## Step di completamento
### Alta Priorita
- Definire la superficie pubblica: entrypoint, subpath (se usati) e principali export da considerare stabili.
- Aggiornare il documento principale con descrizione reale, casi d’uso e quickstart coerente con il contract.
- Formalizzare configurazione (chiavi lette da `appSetup`, `config`, `policies`) e fallback/legacy se presenti.
- Introdurre uno smoke test (o rendere reale lo `script test`) per evitare regressioni.
### Media Priorita
- Verificare packaging: `main`, `type`, eventuale `exports` e compatibilità import ESM/CJS.
- Aggiornare dipendenze vs devDependencies e dichiarare peerDependencies quando necessario.
### Bassa Priorita
- Raffinare esempi e aggiungere sezione compatibilità/sicurezza dove utile.
- Collegare cross-reference verso moduli correlati (core/web/files, ecc.).
### Note specifiche (ecosystem/app)
- Chiarire se il modulo è una libreria riusabile o una app/service (Express, migrations, datasources).
- Separare API pubbliche da script operativi; documentare configurazione e dipendenze esterne (DB, file, ecc.).

## Riferimenti
- Documento principale IT: ./ecosystem-microservices-geo.md
- Documento principale EN: ../en/ecosystem-microservices-geo.md
- Ticket: ../tickets/20260506-1052.md