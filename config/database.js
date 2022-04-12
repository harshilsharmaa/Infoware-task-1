// const mongoose = require('mongoose');


// exports.connectDatabase = ()=>{
    
//     mongoose.connect('mongodb://localhost:27017/intertask1').then(() => {
//         console.log('MongoDB connected');
//     }).catch(err => {
//         console.log(err);
//     })
// }

const Sequelize = require('sequelize');

const sequelize = new Sequelize('for_infoware', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false
})

sequelize.authenticate()
.then(()=>{
    console.log('Connection has been established successfully.');
})
.catch((err)=>{
    console.error('Unable to connect to the database:', err);
})


sequelize
// .sync({force: true})
.sync()
.then(result=>{
  console.log("Database & tables created!");  
})
.catch(err=>{
    console.log(err);
})

module.exports = sequelize;
