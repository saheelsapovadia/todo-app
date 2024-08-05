"use-strict";
const fs = require("fs");
const path = require("path");
const pg = require("pg");
const Sequelize = require("sequelize");
const models = {};
const basename = path.basename(__filename);

const dialect = "postgres";
const dbName = process.env.DB_NAME;
const host = process.env.DB_HOST;
const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;

delete pg.native;
const sequelizeOptions = {
    dialect: dialect,
    port: port,
    host: host,
    dialectOptions: {
        ssl:{
            require: true,
            rejectUnauthorized: false
        }
    },
    freezeTableName: true,
    logging: false, // Comment this line out if you want verbose pgsql console logs
};
const sequelize = new Sequelize(dbName, userName, password, sequelizeOptions);
sequelize.authenticate().then(() => {
    console.log('Connection to database has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
});

fs.readdirSync(__dirname).filter((file) => {
    return(file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js");
}).forEach((file) => {
    const makeModel = require(path.join(__dirname, file));
    const model = makeModel(sequelize, Sequelize.Sequelize);
    models[model.name] = model;
});

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) { // models['system_es_index'].Sequelize
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = {
    models
};
