const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const cors = require("cors");
const path = require('path');
const mqtt_in = require('./app/lib/email/mqtt_in.js');

global.__basedir = __dirname + "/..";

const app = express();


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const db = require("./app/models");

db.sequelize.sync({ alter: true });

// require("./app/routes/employee.routes")(app);
require("./app/routes/user.routes")(app);
// require("./app/routes/reportgeneral.routes")(app);
// require("./app/routes/order.routes")(app);
// require("./app/routes/result.routes")(app);
// require("./app/routes/department.routes")(app);
// require("./app/routes/mail.routes")(app);
// require("./app/routes/object.routes")(app);
// require("./app/routes/news.routes")(app);
// require("./app/routes/documenthouse.routes")(app);
// require("./app/routes/documenttarif.routes")(app);
// require("./app/routes/topici.routes")(app);
// require("./app/routes/files.routes")(app);
require("./app/routes/status.routes")(app);
require("./app/routes/traffic.routes")(app);
require("./app/routes/sales.routes")(app);
require("./app/routes/ikey.routes")(app);
require("./app/routes/setting.routes")(app);
require("./app/routes/setup.routes")(app);
require("./app/routes/tips.routes")(app);
require("./app/routes/temperature.routes")(app);
require("./app/routes/station.routes")(app);
require("./app/routes/ownerstation.routes")(app);
require("./app/routes/buyer.routes")(app);
require("./app/routes/collection.routes")(app);
require("./app/routes/maintenance.routes")(app);
require("./app/routes/mqtt.routes")(app);

// simple route
app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});


mqtt_in.mqtt_in('0001/info')
mqtt_in.mqtt_in('0002/info')
mqtt_in.mqtt_in('0003/info')
mqtt_in.mqtt_in('0004/info')
mqtt_in.mqtt_in('0005/info')
mqtt_in.mqtt_in('0006/info')

// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, '/public/index.html'), function(err) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })


// set port, listen for requests
const PORT = process.env.PORT || 8089;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
