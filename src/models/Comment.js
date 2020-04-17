const Sequelize = require('sequelize');
const Connection= require('../Database/connection');

const ModelPerson = require('../models/Person');
const ModelProduct = require('../models/Product');

const ModelComment = Connection.define('Comment', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    comment: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    comment_date: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    person: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    product: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: "comment",
    timestamps: true,
})

ModelPerson.hasMany(ModelComment, {
    foreignKey: 'person',
    constraints: "comment_person"
})
ModelProduct.hasMany(ModelComment, {
    foreignKey: 'product',
    constraints: "comment_product"
})

module.exports = ModelComment