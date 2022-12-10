const db = require("../models");
const Temperature = db.temperature;
const Op = db.Sequelize.Op;

// Create and Save a new record
exports.create = (req, res) => {
    // Validate request
    if (!req.body.valve) {
      res.status(400).send({
        message: "Valve пустое"
      });
      return;
    }
  
    // Create a Temperature
    const create_body = {
      id_station: req.body.id_station,
      temparature: req.body.temparature,
      comment: req.body.comment,
    };
  
    // Save Tutorial in the database
    Temperature.create(create_body)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи Temperature."
        });
      });
  };

// Retrieve all Temperature from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Temperature.findAll({ 
      where: condition,
      order: [
        ['createdAt', 'DESC'] 
      ] 
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи Temperature."
      });
    });
};

// Find a single Temperature with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Temperature.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Temperature with id=" + id
        });
      });
};

// Update a  by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Temperature.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Temperature was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Temperature with id=${id}. Maybe Employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Temperature with id=" + id
        });
      });
};

// Delete a Temperature with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Temperature.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Temperature was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Temperature with id=${id}. Maybe Temperature was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Temperature with id=" + id
        });
        });
};

// Delete all Temperature from the database.
exports.deleteAll = (req, res) => {
  Temperature.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Temperature were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Temperature."
          });
        });
  
};
