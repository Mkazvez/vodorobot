const db = require("../models");
const Collection = db.collection;
const Op = db.Sequelize.Op;

// Create and Save a new record
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id_station) {
      res.status(400).send({
        message: "Valve пустое"
      });
      return;
    }
  
    // Create a Collection
    const create_body = {
      id_station: req.body.id_station,
      balance: req.body.balance,
      id_user: req.body.id_user,
      user_string: req.body.user_string,
      date_maintenance: req.body.date_maintenance,
      comment: req.body.comment,
    };
  
    // Save Tutorial in the database
    Collection.create(create_body)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи Collection."
        });
      });
  };

// Retrieve all Collection from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Collection.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи Collection."
      });
    });
};

// Find a single Collection with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Collection.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Collection with id=" + id
        });
      });
};

// Update a  by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Collection.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Collection was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Collection with id=${id}. Maybe Employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Collection with id=" + id
        });
      });
};

// Delete a Collection with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Collection.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Collection was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Collection with id=${id}. Maybe Collection was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Collection with id=" + id
        });
        });
};

// Delete all Collection from the database.
exports.deleteAll = (req, res) => {
  Collection.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Collection were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Collection."
          });
        });
  
};
