const Sequelize = require('sequelize');
const sequelize = require('../config/database');

    const Order = sequelize.define('order', {
        user_id:{
            type: Sequelize.INTEGER,
        },
        product_id:{
            type: Sequelize.STRING,
        },
        quantity:{
            type: Sequelize.INTEGER,
        },
        orderDate:{
            type: Sequelize.DATE,
            default: Date.now,
        },
        price:{
            type: Sequelize.INTEGER,
        },
        totalAmount:{
            type: Sequelize.INTEGER,
        },
        order_id:{
            type:Sequelize.INTEGER,
            allowNULL: false,
            autoIncrement: true,
            primaryKey: true
        }
    })


module.exports = Order;