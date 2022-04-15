const Sequelize = require('sequelize');

exports.getSqlConnection = () => {
    const sequelize = new Sequelize('for_infoware2', 'root', '', {
        dialect: 'mysql',
        host: 'localhost',
        logging: false,
    })

    sequelize.authenticate()
    .then(()=>{
        console.log('Connection has been established successfully.');
    })
    .catch((err)=>{
        console.error('Unable to connect to the database:', err);
    })


    const db = {};

    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    db.user = require('./User.model.js')(sequelize, Sequelize);
    db.product = require('./Product.model')(sequelize, Sequelize);
    db.order = require('./Order.model')(sequelize, Sequelize);
    

     // Assocition
     db.user.hasMany(db.order, {foreignKey: 'user_id'});
     db.order.belongsTo(db.user, {foreignKey: 'user_id'});
 
     db.order.hasOne(db.product, {foreignKey: 'product_id'});
     db.product.belongsTo(db.order, {foreignKey: 'product_id'});
 


    db.sequelize.sync()
    .then(()=>{
        console.log("Database & tables created!");
    })
    .catch((err)=>{
        console.log(err);
    })


   
}


