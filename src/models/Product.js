const Sequelize = require('sequelize');
const Connection= require('../Database/connection');

const ModelPerson = require('../models/Person');

const ModelProduct = Connection.define('Product', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    price: {
        type: Sequelize.REAL,
        allowNull: false
    },
    info: {
        type: Sequelize.TEXT
    },
    image: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    person_modification: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "product",
    timestamps: true,
})
ModelPerson.hasMany(ModelProduct, {foreignKey: "person_modification"})
module.exports = ModelProduct