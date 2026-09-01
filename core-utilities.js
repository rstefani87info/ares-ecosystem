import * as arrays from "@ares/core/arrays.js";
import * as crypto from "@ares/core/crypto.js";
import * as dates from "@ares/core/dates.js";
import * as datesAndTime from "@ares/core/datesAndTime.js";
import * as geographical from "@ares/core/geographical.js";
import * as i18n from "@ares/core/i18n.js";
import * as json from "@ares/core/json.js";
import * as numbers from "@ares/core/numbers.js";
import * as objects from "@ares/core/objects.js";
import * as regex from "@ares/core/regex.js";
import * as security from "@ares/core/security.js";
import * as text from "@ares/core/text.js";
import * as timeMapping from "@ares/core/time-mapping.js";
import * as trees from "@ares/core/trees.js";
import * as url from "@ares/core/url.js";
import * as xml from "@ares/core/xml.js";

const CORE_MODULES = {
  arrays,
  crypto,
  dates,
  datesAndTime,
  geographical,
  i18n,
  json,
  numbers,
  objects,
  regex,
  security,
  text,
  timeMapping,
  trees,
  url,
  xml,
};

function toKebab(value) {
  return String(value)
    .replace(/([a-z0-9]+)([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase();
}

function normalizeName(value) {
  return String(value ?? "").trim();
}

function isCallableExport(name, value) {
  if (name === "default") return false;
  if (name === "aReSInitialize") return false;
  return typeof value === "function";
}

function createModuleAliases() {
  const aliases = new Map();
  for (const key of Object.keys(CORE_MODULES)) {
    aliases.set(key, key);
    aliases.set(toKebab(key), key);
  }
  return aliases;
}

const MODULE_ALIASES = createModuleAliases();

export function resolveCoreModuleName(moduleName) {
  const resolved = MODULE_ALIASES.get(normalizeName(moduleName));
  if (!resolved) {
    throw new Error(`Modulo core non trovato: ${moduleName}`);
  }
  return resolved;
}

export function getCoreUtilityRegistry() {
  const registry = {};
  for (const [moduleName, namespace] of Object.entries(CORE_MODULES)) {
    const utilities = {};
    for (const [exportName, value] of Object.entries(namespace)) {
      if (!isCallableExport(exportName, value)) continue;
      utilities[exportName] = value;
    }
    registry[moduleName] = utilities;
  }
  return registry;
}

export function getCoreUtilityManifest() {
  const registry = getCoreUtilityRegistry();
  const manifest = {};
  for (const [moduleName, utilities] of Object.entries(registry)) {
    manifest[moduleName] = Object.entries(utilities).map(([name, fn]) => ({
      name,
      arity: typeof fn?.length === "number" ? fn.length : 0,
      endpoint: `/ares/core/${toKebab(moduleName)}/${name}`,
      mcpTool: `core.${moduleName}.${name}`,
    }));
  }
  return manifest;
}

export function resolveCoreUtility(moduleName, utilityName) {
  const normalizedModuleName = resolveCoreModuleName(moduleName);

  const namespace = CORE_MODULES[normalizedModuleName];
  const fn = namespace?.[normalizeName(utilityName)];
  if (!isCallableExport(utilityName, fn)) {
    throw new Error(`Utility non trovata: core/${normalizedModuleName}/${utilityName}`);
  }

  return {
    moduleName: normalizedModuleName,
    utilityName: normalizeName(utilityName),
    fn,
  };
}

export async function invokeCoreUtility(moduleName, utilityName, args = []) {
  const { moduleName: resolvedModuleName, utilityName: resolvedUtilityName, fn } =
    resolveCoreUtility(moduleName, utilityName);
  const normalizedArgs = Array.isArray(args) ? args : [args];
  const result = await fn(...normalizedArgs);

  return {
    target: `core/${resolvedModuleName}/${resolvedUtilityName}`,
    module: resolvedModuleName,
    utility: resolvedUtilityName,
    args: normalizedArgs,
    result,
  };
}
