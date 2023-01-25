const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');
const initModels = require('./../models/init-models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
//conexion a la db
const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log,
});

var models = initModels(sequelize);

module.exports = models;
module.exports = sequelize;
