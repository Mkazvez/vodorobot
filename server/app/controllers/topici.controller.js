const db = require("../models");
const Topici = db.topici;
const Op = db.Sequelize.Op;

// Create and Save a new Topic
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Название пустое"
      });
      return;
    }
  
    // Create a topic
    const topici = {
      name: req.body.name,
      qty_day: req.body.qty_day,
    };
  
    // Save Topic in the database
    Topici.create(topici)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи"
        });
      });
  };

// Retrieve all Topic from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Topici.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи в подразделение."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Topici.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Topic with id=" + id
        });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Topici.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Topic was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Topic with id=${id}. Maybe Topic was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Topic with id=" + id
        });
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Topici.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Topic was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Topic with id=${id}. Maybe Employee was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Topic with id=" + id
        });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Topici.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Topic were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Topics."
          });
        });
  
};
