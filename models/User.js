const Sequelize = require('sequelize');
const sequelize = require('../config/database');

    const User = sequelize.define('user', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        mobile:{
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
        },
        admin:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        user_id:{
            type:Sequelize.INTEGER,
            allowNULL: false,
            autoIncrement: true,
            primaryKey: true
        }
    })


module.exports = User;