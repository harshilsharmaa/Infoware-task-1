const express = require('express');
const cookieParser = require('cookie-parser');
const HttpStatus = require("http-status-codes");
const bodyParser = require("body-parser");
const { DbConn } = require("./config/DbConn");
const DBConnection = DbConn.getSqlConnection();
const routes = require("./routes");


global.DB = DBConnection;
global.HTTP_STATUS = HttpStatus;


const app = express();


// Using Middleware
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({extended: true}));

app.use(cookieParser());


require('./models');

app.use(
    bodyParser.urlencoded({
      parameterLimit: 100000,
      limit: "50mb",
      extended: true,
    })
  );
  app.use(bodyParser.json());

routes.initialize(app);

const PORT = 4000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`APP IS STARTED AT ${PORT} `);
})


