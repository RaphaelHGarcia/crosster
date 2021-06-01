const { QueryTypes } = require("sequelize");
const dbProd = require("../../db");

const convertField = (field) => {
  return `
    convert_from(
      convert(
        convert_to(${field}, 'WIN1252'), 'WIN1252', 'UTF8'
      ), 'UTF8'
    )
  `;
};

module.exports = async (getChange = false) => {
  try {
    const query = `
      SELECT
        item.cod_item,
        TRIM(item.codigo) AS codigo,
        TRIM(item.cod_grupoestoque) AS cod_grupoestoque,
        TRIM(item.cod_subgrupoestoque) AS cod_subgrupoestoque,
        item.cod_fmcomercial,
        TRIM(item.cod_fmindustrial) AS cod_fmindustrial,
        item.custo_reposicao,
        ${convertField("item.descricao")} AS nome,
        ${convertField("familia_industrial.descricao")} AS material,
        ${convertField("item.narrativa")} AS narrativa,
        ${convertField("grupo_estoque.descricao")} AS grupo,
        item.peso_bruto,
        item.altura,
        item.largura,
        item.comprimento,
        item.volume_m3,
        item.gramatura,
        ${convertField("item.aplicacao")} as aplicacao,
        item.dt_ultcotacao,
        ${convertField("item.desenho")} as desenho,
        ${convertField("item.rev_desenho")} as rev_desenho,
        ${convertField("item.modelo")} as modelo,
        ${convertField("item.descricao_completa")} as descricao_completa,
        item.dt_change
        FROM item
        INNER JOIN familia_industrial ON familia_industrial.cod_fmindustrial = item.cod_fmindustrial
        INNER JOIN grupo_estoque ON grupo_estoque.cod_grupoestoque = item.cod_grupoestoque
        --where item.cod_item = '0000000010'
      ORDER BY cod_item ASC
      OFFSET 384
    `;
    const products = await dbProd.query(query, { type: QueryTypes.SELECT });
    return products;
  } catch (err) {
    console.log(err);
  }
};
