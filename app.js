import * as jwt from '@ares/web/jwt.js';
import * as crypto from '@ares/core/crypto.js';
import { nanoid } from "nanoid";

const app = {
  name : "aReS-REST-API",
  viewName : "aReS REST API",
  datasourcesRoot : "datasources",
  environments : [
    { type: "production", domain: "aReS-RESTAPI.com" },
    { type: "test", domain: "test-aReS-RESTAPI.com" },
  ],
  environment: "test",
  minUserAge:0,
  session: {
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
    secret: "aReS-RESTAPI",
    resave: false,
    saveUninitialized: false,

    genid: (req) => {
      console.log("header", req.headers);
      jwt.extractToken(req);
      const token = req.token;
      if (token) {
        return token; 
      }
      return crypto.getSHA256Hash(nanoid()); 
    },
  },

};
export default app;
