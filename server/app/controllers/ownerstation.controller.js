const db = require("../models");
const Ownerstation = db.ownerstation;
const Op = db.Sequelize.Op;

// Create and Save a new record
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id_station) {
      res.status(400).send({
        message: "Код станции пустой"
      });
      return;
    }
  
    // Create a Ownerstation
    const create_body = {
      id_station: req.body.id_station,
      name: req.body.name,
      comment: req.body.comment,
      datebegin: req.body.datebegin,
      dateend: req.body.dateend,
    };
  
    console.log(create_body)

    // Save Ownerstation in the database
    Ownerstation.create(create_body)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи Ownerstation."
        });
      });
  };

// Retrieve all Ownerstation from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Ownerstation.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи Ownerstation."
      });
    });
};

// Find a single Ownerstation with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Ownerstation.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Ownerstation with id=" + id
        });
      });
};

// Update a  by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Ownerstation.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Ownerstation was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Ownerstation with id=${id}. Maybe Employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Ownerstation with id=" + id
        });
      });
};

// Delete a Station with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Ownerstation.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Ownerstation was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Ownerstation with id=${id}. Maybe Ownerstation was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Ownerstation with id=" + id
        });
        });
};

// Delete all Ownerstation from the database.
exports.deleteAll = (req, res) => {
    Ownerstation.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Ownerstation were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Ownerstation."
          });
        });
 
};
