const createBrand = require("./lib/anymarket/create-brand");

const brands = [
  "TRUE UTILITY",
  "BUCK",
  "NEBO",
  "OLD TIMER",
  "AZTEQ",
  "ANTONINI",
  "IMPERIAL",
  "CALIFORNIA TOYS",
  "SCHRADE",
  "BÖKER",
  "FENIX",
  "UNCLE HENRY",
  "REMINGTON",
  "NAUTIKA",
  "UNITED CUTLERY",
  "FOX KNIVES",
  "TRENTO",
  "BENCHMADE",
  "LEDLENSER",
  "RUGER",
  "PREMAX",
  "MASTER CUTLERY",
  "BUBBA",
  "DMT",
  "CRKT",
];

Promise.all(
  brands.map(async (brand) => {
    await createBrand(brand);
    console.log("Criou -> ", brand);
  })
);
