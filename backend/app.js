const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();
const port = 3000;

const routesConfig = [
    {
        route: "/contacts",
    }
];


//automatically create all routes from config
routesConfig.forEach((route) => {
    var routes = require("./routes/" + route.route);
    app.use(route.route, routes);

    console.log ("Setting up route \"" + route.route +"\"");
});


//connect to db
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    (error) => {
        console.log("Could not connect to db");
    }
);


//start listening
app.listen(port);

console.log("Started listening on port " + port);