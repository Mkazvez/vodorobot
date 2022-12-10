const db = require("../models");
const Maintenance = db.maintenance;
const Op = db.Sequelize.Op;

// Create and Save a new record
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id_station) {
      res.status(400).send({
        message: "id_station пустое"
      });
      return;
    }
  
    // Create a Maintenance
    const create_body = {
      id_station: req.body.id_station,
      date_replace: req.body.date_replace,
      type_catrige: req.body.type_catrige,
      qty_litr: req.body.qty_litr,
      procent_of_used: req.body.procent_of_used,
      status: req.body.status,
      comment: req.body.comment,
      d_date: req.body.d_date,
    };
  
    // Save Tutorial in the database
    Maintenance.create(create_body)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи Maintenance."
        });
      });
  };

// Retrieve all Maintenance from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Maintenance.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи Maintenance."
      });
    });
};

// Find a single Maintenance with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Maintenance.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Maintenance with id=" + id
        });
      });
};

// Update a  by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Maintenance.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Maintenance was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Maintenance with id=${id}. Maybe Employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Maintenance with id=" + id
        });
      });
};

// Delete a Maintenance with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Maintenance.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Maintenance was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Maintenance with id=${id}. Maybe Maintenance was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Maintenance with id=" + id
        });
        });
};

// Delete all Maintenance from the database.
exports.deleteAll = (req, res) => {
  Maintenance.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Maintenance were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Maintenance."
          });
        });
  
};
