// const Sequelize = require("sequelize");
// const Op = Sequelize.Op;


module.exports = (sequelize,DataTypes)=>{

    const User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        mobile:{
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        admin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNULL: false,
            autoIncrement: true,
            primaryKey: true
        }
    })

    return User;
}
