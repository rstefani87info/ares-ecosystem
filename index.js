/**
 * @author Roberto Stefani
 * @license MIT
 */
import inspector from "node:inspector";
// import { asyncConsole } from "@ares/core/console.js";
import aReSInitialize from "@ares/core";
import * as aReSWeb from "@ares/web/server.js";
import * as aReSWebSocket from "@ares/web-socket";
import * as aReSMcp from "@ares/mcp/server.js";
import * as fileUtilities from "@ares/files";
import {
  enableDatasourceHotReload,
  initAllDatasources,
} from "@ares/datasource-files";
import { compareAddresses } from "./address.js";
import app from "./app.js";
import {
  handleCoreUtilityWebSocketMessage,
  registerCoreUtilityHttpRoutes,
  registerCoreUtilityMcpTools,
} from "./core-utilities-server.js";

if (app.environment !== "production") {
  inspector.open(undefined, undefined, true);
  console.log("Debugger attached");
}

const dsRoot = fileUtilities.getAbsolutePath(app.datasourcesRoot);
console.log("datasource root: ", dsRoot);
app.webDatasources = await initAllDatasources(dsRoot);
app.webSocketLogin = ({ username }) => ({ username: username ?? "anonymous" });
app.webSocketUnderstandMessage = handleCoreUtilityWebSocketMessage;

const aReS = aReSInitialize(app);
aReS
  .include(aReSWeb)
  .then(async () => {
    const originalWebServerPort = aReS.appSetup.webServerPort;
    aReS.appSetup.webServerPort = aReS.appSetup.webSocketPort ?? (originalWebServerPort + 1);
    await aReS.include(aReSWebSocket);
    aReS.appSetup.webServerPort = originalWebServerPort;

    await aReS.include(aReSMcp);

    init(aReS);
    enableDatasourceHotReload(aReS, app.webDatasources, { datasourcesRoot: dsRoot });
    aReS.isResourceAllowed = () => {
      return true;
    };
    await aReS.startMCPServer();
  })
  .catch((error) => {
    console.error(`Error initializing aReS-web: ${error.message}`);
  });

function init(aReS) {
  registerCoreUtilityHttpRoutes(aReS);
  registerCoreUtilityMcpTools(aReS);

  // Serve the geo.html documentation at the specified endpoint
  aReS.httpServer.get("/ares/geo/doc/compare-addresses", (req, res) => {
    const lang =
      req.headers["accept-language"]?.split(",")[0]?.split("-")[0] || "en";
    const localizedPath = fileUtilities.getAbsolutePath(
      `./public/geo/doc/compare-addresses.${lang}.html`
    );
    const defaultPath = fileUtilities.getAbsolutePath(
      "./public/geo/doc/compare-addresses.en.html"
    );

    // Check if the localized file exists
    if (fileUtilities.fileExists(localizedPath)) {
      res.sendFile(localizedPath);
    } else {
      // Fall back to English version
      res.sendFile(defaultPath);
    }
  });

  aReS.httpServer.post("/ares/geo/compare-addresses", async (req, res) => {
    try {
      const { address1, address2 } = req.body;

      // Use the business logic from the address module
      const result = compareAddresses(address1, address2);
      res.json(result);
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  });
}
