const db = require("../models");
const Station = db.station;
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
  
    // Create a Station
    const create_body = {
      id_station: req.body.id_station,
      name: req.body.name,
      start: req.body.start,
      adres: req.body.adres,
      location: req.body.location,
      comment: req.body.comment,
      d_date: req.body.d_date,
    };
  
    console.log(create_body)

    // Save Station in the database
    Station.create(create_body)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи Station."
        });
      });
  };

// Retrieve all Station from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Station.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи Station."
      });
    });
};

// Find a single Station with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Station.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Station with id=" + id
        });
      });
};

// Update a  by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Station.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Station was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Station with id=${id}. Maybe Employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Station with id=" + id
        });
      });
};

// Delete a Station with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Station.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Station was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Station with id=${id}. Maybe Station was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Station with id=" + id
        });
        });
};

// Delete all Station from the database.
exports.deleteAll = (req, res) => {
  Station.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Station were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Station."
          });
        });
 
};
