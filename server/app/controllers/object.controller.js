const db = require("../models");
const Object = db.object;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.adres) {
      res.status(400).send({
        message: "Адрес пустой"
      });
      return;
    }
  
    // Create a Object
    const object = {
        logo_1: req.body.logo_1, 
        logo_2: req.body.logo_2, 
        adres: req.body.adres,
        build: req.body.build, 
        qty_etazh: req.body.qty_etazh, 
        sq_all: req.body.sq_all,
        q_flats: req.body.q_flats,
        wall: req.body.wall,  
        qty_pod: req.body.qty_pod, 
        qty_flat: req.body.qty_flat,
        manager: req.body.manager,
        idsort: req.body.idsort
    };
  
    // Save Tutorial in the database
    console.log(object)
    Object.create(object)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи объектов."
        });
      });
  };

// Retrieve all Emails from the database.
exports.findAll = (req, res) => {
  const Adres = req.query.adres;
  var condition = Adres ? { adres: { [Op.like]: `%${Adres}%` } } : null;

  Object.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи адреса."+Adres ? Adres:""
      });
    });
};

// Find a single Email with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Object.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Email with id=" + id
        });
      });
};

// Update a Email by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Object.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Object was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Object with id=${id}. Maybe Email was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Object with id=" + id
        });
      });
};


// Delete a Email with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Object.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Object was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Object with id=${id}. Maybe Object was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Object with id=" + id
        });
        });
};

// Delete all Emails from the database.
exports.deleteAll = (req, res) => {
    Object.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Object were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all objects."
          });
        });
  
};

// Find all published Tutorials
exports.findAllObject = (req, res) => {
    const Adres = req.query.adres;
    var condition = Adres ? { adres: { [Op.like]: `%${Adres}%` } } : null;
  
    Object.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при поиске записи Object from adres."
        });
      });
};

exports.downloadOne = (req, res) => {
  const id = req.params.id;
    News.findByPk(id)
    .then(data => {
      const pathFile = data.pathPicture
      // res.send(pathFile)
      fs.access("public/static/news/"+id+"/", function(error) {
        if (error) {
          console.log("Directory does not exist.")
          res.status(500).send("Нет директории")
        } else {
            const file = "public/static/news/"+id+"/"+pathFile;
            console.log(file)
            res.download(file); // Set disposition and send it.
        }  
        })      
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving News with id=" + id
      });
    });
 }
