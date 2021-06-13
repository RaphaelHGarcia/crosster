const createBrand = require("./lib/anymarket/create-brand");

const brands = [
"MCUSTA",
"NITECORE",
"CURTLO",
"MASERIN",
"OLIGHT",
"LEATHERMAN",
"KANETSUNE",
"MORAKNIV",
"WORK SHARP",
"SPYDERCO",
"NITE IZE",
"B KER",
"TRUE UTILITY",
"BUCK",
"NEBO",
"OLD TIMER",
"AZTEQ",
"ANTONINI",
"IMPERIAL",
"CALIFORNIA TOYS",
"SCHRADE",
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
]

Promise.all(
  brands.map(async (brand) => {
    await createBrand(brand);
    console.log("Criou -> ", brand);
  })
);
