const Sequelize = require('sequelize');
const sequelize = require('../config/database');

    const Product = sequelize.define('product', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        color: {
            type: Sequelize.STRING,
        },
        size: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.INTEGER,
        },
        available: {
            type: Sequelize.INTEGER,
        },
        product_id:{
            type:Sequelize.INTEGER,
            allowNULL: false,
            autoIncrement: true,
            primaryKey: true
        }
    })


module.exports = Product;