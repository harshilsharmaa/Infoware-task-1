const Sequelize = require("sequelize");
const Op = Sequelize.Op;


module.exports = (sequelize,DataTypes)=>{

    const Product = sequelize.define('product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
        },
        size: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        available: {
            type: DataTypes.INTEGER,
        },
        product_id:{
            type:DataTypes.INTEGER,
            allowNULL: false,
            autoIncrement: true,
            primaryKey: true
        }
    })

    return Product;
}
