// Kuratierter Katalog gängiger Medizinal-Cannabissorten auf dem deutschen
// Markt. THC/CBD-Werte sind typische Deklarationswerte und können je nach
// Charge abweichen – sie dienen als Vorschlag und werden vor dem Speichern
// vom Nutzer geprüft.

export type CatalogStrain = {
  name: string;
  manufacturer: string;
  thc: string;
  cbd: string;
  genetics: "Indica" | "Sativa" | "Hybrid" | "";
  aliases?: string[];
};

export const strainCatalog: CatalogStrain[] = [
  // Bedrocan International
  { name: "Bedrocan", manufacturer: "Bedrocan", thc: "22%", cbd: "<1%", genetics: "Sativa", aliases: ["Jack Herer", "Afina"] },
  { name: "Bedrobinol", manufacturer: "Bedrocan", thc: "13.5%", cbd: "<1%", genetics: "Sativa", aliases: ["Ludina"] },
  { name: "Bedica", manufacturer: "Bedrocan", thc: "14%", cbd: "<1%", genetics: "Indica", aliases: ["Talea"] },
  { name: "Bediol", manufacturer: "Bedrocan", thc: "6.3%", cbd: "8%", genetics: "Hybrid", aliases: ["Elida"] },
  { name: "Bedrolite", manufacturer: "Bedrocan", thc: "<1%", cbd: "9%", genetics: "Hybrid", aliases: ["Rensina"] },

  // Aurora / Pedanios
  { name: "Pedanios 22/1", manufacturer: "Aurora", thc: "22%", cbd: "<1%", genetics: "Indica", aliases: ["22/1"] },
  { name: "Pedanios 20/1", manufacturer: "Aurora", thc: "20%", cbd: "<1%", genetics: "Hybrid", aliases: ["20/1"] },
  { name: "Pedanios 18/1", manufacturer: "Aurora", thc: "18%", cbd: "<1%", genetics: "Hybrid", aliases: ["18/1"] },
  { name: "Pedanios 14/1", manufacturer: "Aurora", thc: "14%", cbd: "<1%", genetics: "Hybrid", aliases: ["14/1"] },
  { name: "Pedanios 8/8", manufacturer: "Aurora", thc: "8%", cbd: "8%", genetics: "Hybrid", aliases: ["8/8"] },
  { name: "Pedanios 1/12", manufacturer: "Aurora", thc: "<1%", cbd: "12%", genetics: "Hybrid", aliases: ["1/12"] },

  // Tilray
  { name: "Tilray THC25", manufacturer: "Tilray", thc: "25%", cbd: "<1%", genetics: "Hybrid", aliases: ["THC25"] },
  { name: "Tilray THC22", manufacturer: "Tilray", thc: "22%", cbd: "<1%", genetics: "Hybrid", aliases: ["THC22"] },
  { name: "Tilray THC18", manufacturer: "Tilray", thc: "18%", cbd: "<1%", genetics: "Hybrid", aliases: ["THC18"] },
  { name: "Tilray THC10:CBD10", manufacturer: "Tilray", thc: "10%", cbd: "10%", genetics: "Hybrid", aliases: ["THC10 CBD10", "10:10"] },

  // Four 20 Pharma (420 Natural / 420 Evolution)
  { name: "420 Evolution 22/1 PNK", manufacturer: "Four 20 Pharma", thc: "22%", cbd: "<1%", genetics: "Indica", aliases: ["Pink Kush", "PNK"] },
  { name: "420 Natural 20/1 GG4", manufacturer: "Four 20 Pharma", thc: "20%", cbd: "<1%", genetics: "Hybrid", aliases: ["Gorilla Glue", "GG4"] },
  { name: "420 Evolution 25/1 SLM", manufacturer: "Four 20 Pharma", thc: "25%", cbd: "<1%", genetics: "Hybrid", aliases: ["Slurricane", "SLM"] },
  { name: "420 Natural 18/1 STB", manufacturer: "Four 20 Pharma", thc: "18%", cbd: "<1%", genetics: "Hybrid", aliases: ["Strawberry Banana", "STB"] },

  // Demecan
  { name: "Demecan 22/1", manufacturer: "Demecan", thc: "22%", cbd: "<1%", genetics: "Indica", aliases: ["DEM 22/1"] },
  { name: "Demecan 18/1", manufacturer: "Demecan", thc: "18%", cbd: "<1%", genetics: "Hybrid", aliases: ["DEM 18/1"] },

  // Cannamedical
  { name: "Cannamedical THC 18+ Indica", manufacturer: "Cannamedical", thc: "18%", cbd: "<1%", genetics: "Indica" },
  { name: "Cannamedical THC 18+ Sativa", manufacturer: "Cannamedical", thc: "18%", cbd: "<1%", genetics: "Sativa" },
  { name: "Cannamedical Forte THC 22+", manufacturer: "Cannamedical", thc: "22%", cbd: "<1%", genetics: "Hybrid", aliases: ["Forte"] },

  // Avaay
  { name: "Avaay 22/1 Do-Si-Dos", manufacturer: "Avaay", thc: "22%", cbd: "<1%", genetics: "Indica", aliases: ["Do-Si-Dos", "DSD"] },
  { name: "Avaay 27/1 WZK", manufacturer: "Avaay", thc: "27%", cbd: "<1%", genetics: "Hybrid", aliases: ["Wizard Trees Kush", "WZK"] },

  // Remexian
  { name: "Remexian 22/1", manufacturer: "Remexian", thc: "22%", cbd: "<1%", genetics: "Hybrid" },
  { name: "Remexian 25/1", manufacturer: "Remexian", thc: "25%", cbd: "<1%", genetics: "Hybrid" },

  // enua
  { name: "enua 22/1", manufacturer: "enua", thc: "22%", cbd: "<1%", genetics: "Hybrid" },
  { name: "enua 25/1", manufacturer: "enua", thc: "25%", cbd: "<1%", genetics: "Hybrid" },

  // IMC
  { name: "IMC 22/1", manufacturer: "IMC", thc: "22%", cbd: "<1%", genetics: "Hybrid" },

  // Peace Naturals
  { name: "Peace Naturals 25/1 PPD", manufacturer: "Peace Naturals", thc: "25%", cbd: "<1%", genetics: "Indica", aliases: ["Pink Pepper Diesel", "PPD"] },
  { name: "Peace Naturals 22/1 GMO", manufacturer: "Peace Naturals", thc: "22%", cbd: "<1%", genetics: "Indica", aliases: ["GMO Cookies", "GMO"] },

  // Bekannte Strain-Namen, die von mehreren Herstellern angeboten werden
  { name: "Gorilla Glue #4", manufacturer: "", thc: "20%", cbd: "<1%", genetics: "Hybrid", aliases: ["GG4", "Gorilla Glue", "Original Glue"] },
  { name: "Pink Kush", manufacturer: "", thc: "22%", cbd: "<1%", genetics: "Indica", aliases: ["PNK"] },
  { name: "Wedding Cake", manufacturer: "", thc: "22%", cbd: "<1%", genetics: "Hybrid", aliases: ["WDC"] },
  { name: "Gelato 41", manufacturer: "", thc: "21%", cbd: "<1%", genetics: "Hybrid", aliases: ["Gelato"] },
  { name: "Amnesia Haze", manufacturer: "", thc: "20%", cbd: "<1%", genetics: "Sativa", aliases: ["Amnesia"] },
  { name: "Ghost Train Haze", manufacturer: "", thc: "24%", cbd: "<1%", genetics: "Sativa", aliases: ["GTH"] },
  { name: "Sour Diesel", manufacturer: "", thc: "20%", cbd: "<1%", genetics: "Sativa", aliases: ["Sour D"] },
  { name: "LA Kush Cake", manufacturer: "", thc: "23%", cbd: "<1%", genetics: "Indica", aliases: ["L.A. Kush Cake", "LKC"] },
  { name: "Mimosa", manufacturer: "", thc: "22%", cbd: "<1%", genetics: "Hybrid" },
  { name: "Black Cherry Punch", manufacturer: "", thc: "22%", cbd: "<1%", genetics: "Indica", aliases: ["BCP"] },
  { name: "Blue Dream", manufacturer: "", thc: "19%", cbd: "<1%", genetics: "Hybrid" },
  { name: "Hindu Kush", manufacturer: "", thc: "18%", cbd: "<1%", genetics: "Indica" },
  { name: "Northern Lights", manufacturer: "", thc: "18%", cbd: "<1%", genetics: "Indica", aliases: ["NL"] },
  { name: "Jack Herer", manufacturer: "", thc: "20%", cbd: "<1%", genetics: "Sativa" },
  { name: "Zkittlez", manufacturer: "", thc: "20%", cbd: "<1%", genetics: "Indica", aliases: ["GMO Zkittlez"] },
  { name: "Purple Punch", manufacturer: "", thc: "20%", cbd: "<1%", genetics: "Indica" },
  { name: "Apple Fritter", manufacturer: "", thc: "24%", cbd: "<1%", genetics: "Hybrid" },
  { name: "Permanent Marker", manufacturer: "", thc: "26%", cbd: "<1%", genetics: "Hybrid" },
  { name: "MAC 1", manufacturer: "", thc: "23%", cbd: "<1%", genetics: "Hybrid", aliases: ["Miracle Alien Cookies", "MAC"] },
  { name: "Do-Si-Dos", manufacturer: "", thc: "22%", cbd: "<1%", genetics: "Indica", aliases: ["Dosidos", "DSD"] },
  { name: "Critical Kush", manufacturer: "", thc: "20%", cbd: "<1%", genetics: "Indica" },
  { name: "Super Lemon Haze", manufacturer: "", thc: "20%", cbd: "<1%", genetics: "Sativa", aliases: ["SLH"] },
];

export const knownManufacturers = Array.from(
  new Set(
    strainCatalog
      .map((strain) => strain.manufacturer)
      .filter(Boolean)
      .concat(["Sibanax", "HUALA", "Big Dreams", "Cantourage", "Vayamed", "Grünhorn"])
  )
);
