const db = require("../models");
const Traffic = db.traffic;
const Op = db.Sequelize.Op;

// Create and Save a new record
exports.create = (req, res) => {
    // Validate request
    if (!req.body.traffic) {
      res.status(400).send({
        message: "traffic пустое"
      });
      return;
    }
  
    // Create a Status
    const traffic = {
      id_text: req.body.id_text,
      traffic: req.body.traffic,
      s_date: req.body.s_date,
      d_date: req.body.d_date,
    };
  
    // Save Traffic in the database
    Traffic.create(traffic)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи Traffic."
        });
      });
  };

// Retrieve all Traffic from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Traffic.findAll({ 
      where: condition,
      order: [
        ['d_date', 'DESC'] 
      ]  
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи Traffic."
      });
    });
};

// Find a single Traffic with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Traffic.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Traffic with id=" + id
        });
      });
};

// Update a  by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Traffic.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Traffic was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Traffic with id=" + id
        });
      });
};

// Delete a Traffic with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Traffic.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Traffic was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Traffic with id=${id}. Maybe Traffic was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Traffic with id=" + id
        });
        });
};

// Delete all Traffic from the database.
exports.deleteAll = (req, res) => {
    Traffic.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Traffic were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Traffic."
          });
        });
  
};
