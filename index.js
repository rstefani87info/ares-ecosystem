/**
 * @author Roberto Stefani
 * @license MIT
 */
import { asyncConsole } from "@ares/core/console.js";
import aReSWebInit from "@ares/web/server.js";
import * as fileUtilities from "@ares/files";
import { initAllDatasources } from "@ares/datasource-files";
import * as jwt from "@ares/web/jwt.js";
import app from "./app.js";
import { compareAddresses } from "./address.js";

const aReS = await aReSWebInit(3333, []);

aReS.validateJWT = async (req, res) => {
  return await jwt.validateJWT(req, res, async (notValidCallback) => {
    console.log("token", req.token);
    const res = await aReS.datasourceMap[
      "aresgoogle"
    ].getUserInfo.execute(req);
    console.log("__ userInfo", res.results.data);
    if (res?.results?.data && res.results.data.length >= 0) {
      req.session.userInfo = res.results.data[0];
      return true;
    } else if (res?.results && res?.results["€rror"]) {
      if (notValidCallback && typeof notValidCallback === "function")
        notValidCallback(res.results["€rror"]);
      return false;
    } else {
      if (notValidCallback && typeof notValidCallback === "function")
        notValidCallback("cannot find google user info");
      return false;
    }
  });
};

const dsRoot = fileUtilities.getAbsolutePath(app.datasourcesRoot);
console.log("datasource root: ", dsRoot);
initAllDatasources(dsRoot)
  .then((data) => {
    aReS.initAllDatasources(data);
    asyncConsole.output("datasources");
  })
  .catch((error) => console.error("promised error:", error));


// Serve the geo.html documentation at the specified endpoint
aReS.httpServer.get('/ares/geo/doc/compare-addresses', (req, res) => {
  const lang = req.headers['accept-language']?.split(',')[0]?.split('-')[0] || 'en';
  const localizedPath = fileUtilities.getAbsolutePath(`./public/geo/doc/compare-addresses.${lang}.html`);
  const defaultPath = fileUtilities.getAbsolutePath('./public/geo/doc/compare-addresses.en.html');
  
  // Check if the localized file exists
  if (fileUtilities.fileExists(localizedPath)) {
    res.sendFile(localizedPath);
  } else {
    // Fall back to English version
    res.sendFile(defaultPath);
  }
});

aReS.httpServer.post('/ares/geo/compare-addresses', async (req, res) => {
  try {
    const { address1, address2 } = req.body;
    
    // Use the business logic from the address module
    const result = compareAddresses(address1, address2);
    res.json(result);
    
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});
