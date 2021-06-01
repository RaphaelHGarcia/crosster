const Sequelize = require("sequelize");

const db = new Sequelize(
  "postgresql://0005643:Fe%235643%402020*@177.66.169.197:5453/0005643",
  {
    dialectOptions: {
      charset: "SQL_ASCII",
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  }
);

module.exports = db;
