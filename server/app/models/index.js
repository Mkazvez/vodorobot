const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.mail = require("./mail.model.js")(sequelize, Sequelize);
// db.documenthouse = require("./documenthouse.model.js")(sequelize, Sequelize);
// db.documenttarif = require("./documenttarif.model.js")(sequelize, Sequelize);
// db.object = require("./object.model.js")(sequelize, Sequelize);
// db.news = require("./news.model.js")(sequelize, Sequelize);
// db.employee = require("./employee.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
// db.reportgeneral = require("./reportgeneral.model.js")(sequelize, Sequelize);
// db.order = require("./order.model.js")(sequelize, Sequelize);
// db.result = require("./result.model.js")(sequelize, Sequelize);
// db.department = require("./department.model.js")(sequelize, Sequelize);
// db.topici = require("./topici.model.js")(sequelize, Sequelize);
db.status = require("./status.model.js")(sequelize, Sequelize);
db.traffic = require("./traffic.model.js")(sequelize, Sequelize);
db.sales = require("./sales.model.js")(sequelize, Sequelize);
db.ikey = require("./ikey.model.js")(sequelize, Sequelize);
db.setting = require("./setting.model.js")(sequelize, Sequelize);
db.setup = require("./setup.model.js")(sequelize, Sequelize);
db.tips = require("./tips.model.js")(sequelize, Sequelize);
db.temperature = require("./temperature.model.js")(sequelize, Sequelize);
db.station = require("./station.model.js")(sequelize, Sequelize);
db.ownerstation = require("./ownerstation.model.js")(sequelize, Sequelize);
db.buyer = require("./buyer.model.js")(sequelize, Sequelize);
db.collection = require("./collection.model.js")(sequelize, Sequelize);
db.maintenance = require("./maintenance.model.js")(sequelize, Sequelize);

module.exports = db;