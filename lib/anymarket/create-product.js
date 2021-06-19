const request = require("request-promise");

const editProduct = async (product, product_id) => {
  try {
    const options = {
      method: "PUT",
      url: "http://api.anymarket.com.br/v2/products/" + product_id,
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

    if (err.message.includes('422')) {
      //console.log(err.message)
      const message = JSON.parse(err.message.replace('422 - ', ''))
      const { resources } = message

      await editProduct(product, resources.id_product)

      console.log('Editou o Produto : -> ', resources.id_product)

      return

    } 
      console.log(err.message);
  }
};
