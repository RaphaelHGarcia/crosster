const request = require("request-promise");

module.exports = async (product) => {
  try {
    const options = {
      method: "POST",
      url: "http://api.anymarket.com.br/v2/products",
      headers: {
        gumgaToken: "259062475L1E1713038529270C161972652927000O1.I",
        "Content-Type": "application/json",
        create_brand: "true",
        crop_title: "true",
      },
      body: product,
      json: true,
    };

    await request(options);
  } catch (err) {
    console.log(err.message);
  }
};
