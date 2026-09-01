import {
  getCoreUtilityManifest,
  getCoreUtilityRegistry,
  invokeCoreUtility,
  resolveCoreModuleName,
} from "./core-utilities.js";

function toText(value) {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function parseArgs(req) {
  const args = req?.body?.args;
  if (Array.isArray(args)) return args;
  if (args !== undefined) return [args];
  return [];
}

export function registerCoreUtilityHttpRoutes(aReS) {
  const app = aReS?.httpServer;
  if (!app) return;

  app.get("/ares/core", (_req, res) => {
    const manifest = getCoreUtilityManifest();
    res.json({
      ok: true,
      kind: "manifest",
      namespace: "core",
      modules: Object.keys(manifest),
      manifest,
    });
  });

  app.get("/ares/core/:moduleName", (req, res) => {
    try {
      const { moduleName } = req.params;
      const registry = getCoreUtilityRegistry();
      const resolvedModuleName = resolveCoreModuleName(moduleName);
      const list = Object.keys(registry[resolvedModuleName] ?? {}).map((name) => ({
        name,
        endpoint: `/ares/core/${req.params.moduleName}/${name}`,
        mcpTool: `core.${resolvedModuleName}.${name}`,
      }));
      res.json({
        ok: true,
        module: resolvedModuleName,
        utilities: list,
      });
    } catch (error) {
      res.status(404).json({ ok: false, error: error.message });
    }
  });

  app.post("/ares/core/:moduleName/:utilityName", async (req, res) => {
    try {
      const { moduleName, utilityName } = req.params;
      const args = parseArgs(req);
      const out = await invokeCoreUtility(moduleName, utilityName, args);
      res.json({ ok: true, ...out });
    } catch (error) {
      res.status(400).json({ ok: false, error: error.message });
    }
  });
}

export async function handleCoreUtilityWebSocketMessage(rawMessage) {
  try {
    const payload =
      typeof rawMessage === "string" || rawMessage instanceof String
        ? JSON.parse(String(rawMessage))
        : JSON.parse(rawMessage.toString("utf-8"));

    if (payload?.action !== "invoke-core") return undefined;

    const moduleName = payload.module ?? payload.moduleName;
    const utilityName = payload.utility ?? payload.utilityName;
    const args = Array.isArray(payload.args) ? payload.args : [];
    const out = await invokeCoreUtility(moduleName, utilityName, args);
    return JSON.stringify({ ok: true, ...out });
  } catch (error) {
    return JSON.stringify({ ok: false, error: error.message });
  }
}

export function registerCoreUtilityMcpTools(aReS) {
  aReS.registerMCPTool({
    name: "core.list_modules",
    description: "Elenca i moduli utility esposti dal namespace @ares/core",
    schema: {},
    handler: async () => ({
      content: [
        {
          type: "text",
          text: toText({
            ok: true,
            modules: Object.keys(getCoreUtilityManifest()),
          }),
        },
      ],
    }),
  });

  aReS.registerMCPTool({
    name: "core.list_utilities",
    description: "Elenca le utility di un modulo @ares/core",
    schema: {
      moduleName: { type: "string", description: "Modulo core, es. text" },
    },
    handler: async ({ moduleName }) => {
      const manifest = getCoreUtilityManifest();
      const resolvedModuleName = resolveCoreModuleName(moduleName);
      const entry = manifest[resolvedModuleName] ?? null;
      if (!entry) {
        return { content: [{ type: "text", text: toText({ ok: false, error: "module not found" }) }] };
      }
      return { content: [{ type: "text", text: toText({ ok: true, moduleName: resolvedModuleName, utilities: entry }) }] };
    },
  });

  aReS.registerMCPTool({
    name: "core.invoke",
    description: "Invoca genericamente una utility di @ares/core",
    schema: {
      moduleName: { type: "string", description: "Modulo core, es. text" },
      utilityName: { type: "string", description: "Nome funzione esportata" },
      args: {
        type: "array",
        description: "Argomenti posizionali",
        items: { type: "any" },
        optional: true,
      },
    },
    handler: async ({ moduleName, utilityName, args = [] }) => {
      try {
        const out = await invokeCoreUtility(moduleName, utilityName, args);
        return { content: [{ type: "text", text: toText({ ok: true, ...out }) }] };
      } catch (error) {
        return { content: [{ type: "text", text: toText({ ok: false, error: error.message }) }] };
      }
    },
  });

  const registry = getCoreUtilityRegistry();
  for (const [moduleName, utilities] of Object.entries(registry)) {
    for (const utilityName of Object.keys(utilities)) {
      aReS.registerMCPTool({
        name: `core.${moduleName}.${utilityName}`,
        description: `Invoca @ares/core/${moduleName}.${utilityName}`,
        schema: {
          args: {
            type: "array",
            description: "Argomenti posizionali",
            items: { type: "any" },
            optional: true,
          },
        },
        handler: async ({ args = [] }) => {
          try {
            const out = await invokeCoreUtility(moduleName, utilityName, args);
            return { content: [{ type: "text", text: toText({ ok: true, ...out }) }] };
          } catch (error) {
            return { content: [{ type: "text", text: toText({ ok: false, error: error.message }) }] };
          }
        },
      });
    }
  }
}
