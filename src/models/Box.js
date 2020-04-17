const Sequelize = require('sequelize');
const Connection= require('../Database/connection');

const ModelPerson = require('../models/Person');
const ModelProduct = require('../models/Product');


const ModelBox = Connection.define('Box', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    person: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    number_of_product: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    price_all_product: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    box_add_at: {
        type: Sequelize.DATE,
        allowNull: false
    },
    purchase: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'not'
    },
    purchase_date: {
        type: Sequelize.DATEONLY
    },    
}, {
    tableName: "box",
    timestamps: true,
})

ModelPerson.hasMany(ModelBox, {
    foreignKey: 'person',
    constraints: "comment_person"
})
ModelProduct.hasMany(ModelBox, {
    foreignKey: 'product',
    constraints: "comment_product"
})

module.exports = ModelBox