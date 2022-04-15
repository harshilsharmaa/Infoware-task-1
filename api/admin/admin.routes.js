const express = require('express');

const router = express.Router();

const {isAuthenticated, isAdmin} = require('./validation');

const {addAdmin} = require('./admin.controller');

router.route("/add/admin/:id").post(isAuthenticated, isAdmin, addAdmin);


module.exports = router;