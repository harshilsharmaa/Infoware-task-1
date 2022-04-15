const Sequelize = require("sequelize");
const Op = Sequelize.Op;


module.exports = (sequelize,DataTypes)=>{

    const Order = sequelize.define('order', {
        user_id:{
            type: DataTypes.INTEGER,
        },
        product_id:{
            type: DataTypes.STRING,
        },
        quantity:{
            type: DataTypes.INTEGER,
        },
        orderDate:{
            type: DataTypes.DATE,
            default: Date.now,
        },
        price:{
            type: DataTypes.INTEGER,
        },
        totalAmount:{
            type: DataTypes.INTEGER,
        },
        order_id:{
            type:DataTypes.INTEGER,
            allowNULL: false,
            autoIncrement: true,
            primaryKey: true
        }
    })

    return Order;
}
