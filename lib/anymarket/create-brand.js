const request = require("request-promise");

module.exports = async (brand) => {
  try {
    const options = {
      method: "POST",
      url: "http://api.anymarket.com.br/v2/brands",
      headers: {
        gumgaToken: "259062475L1E1713038529270C161972652927000O1.I",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: brand, partnerId: "" }),
    };

    await request(options);
  } catch (err) {
    console.log(err);
  }
};
