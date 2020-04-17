const {Sequelize} = require('sequelize');
const connection = new Sequelize(process.env.URL_CONNECTION_DB)

module.exports = connection