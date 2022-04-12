const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const sequelize = require('./config/database.js');

// Using Middleware
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());


// database Models 
const Product = require('./models/Product');
const Order = require('./models/Order');
const User = require('./models/User');



// Assocition
User.hasMany(Order, {foreignKey: 'user_id'});
Order.belongsTo(User, {foreignKey: 'user_id'});

Order.hasOne(Product, {foreignKey: 'product_id'});
Product.belongsTo(Order, {foreignKey: 'product_id'});




// Import routes
const user = require('./routes/user');
const admin = require('./routes/admin');
const product = require('./routes/product');
const order = require('./routes/order');

// // Using routes
app.use('/api/v1/user', user);
app.use('/api/v1/admin', admin);
app.use('/api/v1/product', product);
app.use('/api/v1/order', order);

module.exports = app;
