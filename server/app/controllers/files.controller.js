const fs = require("fs");
const db = require("../models");
const Documenttarif = db.documenttarif;
const Op = db.Sequelize.Op;


// загрузка одного файла
exports.downloadOne = (req, res) => {
    const name = req.params.name;
    const file = "state/ssl/"+name;
    console.log(file)
    res.download(file); // Set disposition and send it.
 }

