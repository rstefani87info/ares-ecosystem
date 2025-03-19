import { GeoTreeNode } from "../index.js";

const continents = {
  "002": new GeoTreeNode("002", {
    name: {
      it: "Africa",
      en: "Africa"
    },
    code: "AF",
    iso3166_numeric: "002"
  }),
  "010": new GeoTreeNode("010",{
    name: {
      it: "Antartide",
      en: "Antarctica"
    },
    code: "AN",
    iso3166_numeric: "010"
  }),
  "142": new GeoTreeNode("142",{
    name: {
      it: "Asia",
      en: "Asia"
    },
    code: "AS",
    iso3166_numeric: "142"
  }),
  "150": new GeoTreeNode("150",{
    name: {
      it: "Europa",
      en: "Europe"
    },
    code: "EU",
    iso3166_numeric: "150"
  }),
  "003": new GeoTreeNode("003",{
    name: {
      it: "Nord America",
      en: "North America"
    },
    code: "NA",
    iso3166_numeric: "003"
  }),
  "009":new GeoTreeNode("009",{
    name: {
      it: "Oceania",
      en: "Oceania"
    },
    code: "OC",
    iso3166_numeric: "009"
  }),
  "005": new GeoTreeNode("005",{
    name: {
      it: "Sud America",
      en: "South America"
    },
    code: "SA",
    iso3166_numeric: "005"
  })
};

export default continents;
