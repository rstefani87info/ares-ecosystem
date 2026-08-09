# @ares/ecosystem-microservices-geo Documentation

## Purpose

Description and goals of the `@ares/ecosystem-microservices-geo` module.

## Installation

```bash
yarn add @ares/ecosystem-microservices-geo
```

In a Yarn Workspaces monorepo:

```bash
yarn workspace <app> add @ares/ecosystem-microservices-geo
```

## Quickstart

Minimal example:

```js
import * as mod from "@ares/ecosystem-microservices-geo";
```

## Public API (exports)

This section documents the actual public surface at entrypoint level and main exported symbols.

Root entrypoint:

- `@ares/ecosystem-microservices-geo`

Main files at package root (indicative):

- `address.js`
- `app.js`
- `GeoTreeNode.js`
- `index.js`
- `it-street-address-ai.js`
- `permissionData.js`

## Configuration (appSetup / config / policies)

This module may read configuration from `appSetup`, `config`, or `policies` depending on the type. Document the actually consumed keys as you stabilize the contract.

## Test

Run module tests (if present):

```bash
yarn workspace @ares/ecosystem-microservices-geo test
```

## Notes

- This document is maintained alongside the module tickets.
