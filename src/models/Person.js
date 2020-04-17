const Sequelize = require('sequelize');
const Connection= require('../Database/connection');

const ModelPerson = Connection.define('Person', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    person_name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    mail: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    password_crypt: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    tableName: "person",
    timestamps: true,
})

// ModelPerson.sync()

module.exports = ModelPerson