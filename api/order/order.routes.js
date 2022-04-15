const express = require('express');
const { isAdmin, isAuthenticated } = require('../admin/validation');

const {allOrders, orderById, orderByUserId, myOrders} = require('./order.controller');

const router = express.Router();

router.route('/my').get(isAuthenticated ,myOrders);
router.route('/all').get(isAuthenticated ,isAdmin, allOrders);
router.route('/:id').get(isAuthenticated ,isAdmin, orderById);
router.route('/user/:id').get(isAuthenticated ,isAdmin, orderByUserId);



module.exports = router;