const asyncForeach = require("./lib/async-foreach");
const getProducts = require("./lib/mbm/get-products");
const dbProd = require("./db");
const createProduct = require("./lib/anymarket/create-product");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const run = async () => {
  const products = await getProducts();

  let all = products.length;

  await asyncForeach(products, async (prod) => {
    try {
      console.log(all--);
      await sleep(2000);
      const query = `SELECT cod_item AS id, qtd_atual AS stock FROM estoq_saldo WHERE cod_item = '${prod.cod_item}'`;
      const [stocks] = await dbProd.query(query, { raw: true });

      let stock_sum = 0;
      stocks.map((s) => (stock_sum += parseInt(s.stock)));

      const queryEAN = `SELECT TRIM(cod_barra) as cod_barra FROM item_codigobarra WHERE cod_item = '${prod.cod_item}'`;
      const [getEAN] = await dbProd.query(queryEAN, { raw: true });

      const queryPrice = `SELECT preco_venda FROM tabpreco_item WHERE cod_item = '${prod.cod_item}' AND cod_tabelapreco = '1000'`;
      const [prices] = await dbProd.query(queryPrice, { raw: true });

      const price = prices && prices.length > 0 ? prices[0].preco_venda : 0;
      const ean = getEAN && getEAN.length > 0 ? getEAN[0].cod_barra : null;

      const body = {
        id: null,
        title: prod.nome,
        description: prod.narrativa,
        nbm: { id: "0" },
        brand: {
          id: null,
          name: prod.rev_desenho,
        },
        origin: { id: "0" },
        category: { id: "1500285" },
        model: prod.modelo,
        warrantyText: prod.mesesgarantia + " Meses de garantia.",
        warrantyTime: prod.mesesgarantia,
        weight: prod.peso_bruto,
        height: prod.altura,
        width: prod.largura,
        length: prod.comprimento,
        images: [],
        priceFactor: 1,
        calculatedPrice: false,
        characteristics: [],
        skus: [
          {
            price: price || 0.1,
            amount: stock_sum,
            ean,
            partnerId: prod.codigo,
            title: prod.nome,
            idProduct: null,
            internalIdProduct: prod.codigo,
          },
        ],
      };

      await createProduct(body);
      console.log(`Criou Produto: ${prod.nome}`);
    } catch (err) {
      // console.error(err);
    }
  });
};

Promise.resolve(run());
