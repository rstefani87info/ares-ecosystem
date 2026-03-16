/**
 * @author Roberto Stefani
 * @license MIT
 */
// import { asyncConsole } from "@ares/core/console.js";
import aReSInitialize from "@ares/core";
import * as aReSWeb from "@ares/web/server.js";
import * as fileUtilities from "@ares/files";
import { initAllDatasources } from "@ares/datasource-files";
import app from "./app.js";
import { compareAddresses } from "./address.js";

const dsRoot = fileUtilities.getAbsolutePath(app.datasourcesRoot);
console.log("datasource root: ", dsRoot);
app.webDatasources = await initAllDatasources(dsRoot);

const aReS = aReSInitialize(app);
aReS
  .include(aReSWeb)
  .then(() => {
    init(aReS);
  })
  .catch((error) => {
    console.error(`Error initializing aReS-web: ${error.message}`);
  });

function init(aReS) {
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
