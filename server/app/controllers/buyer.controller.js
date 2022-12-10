const db = require("../models");
const Buyer = db.buyer;
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
  
    // Create a Buyer
    const create_body = {
      id_station: req.body.id_station,
      qty: req.body.qty,
      comment: req.body.comment,
      d_date: req.body.d_date,
    };
  
    // Save Tutorial in the database
    Buyer.create(create_body)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи Buyer."
        });
      });
  };

// Retrieve all Buyer from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Buyer.findAll({ 
      where: condition,
      order: [
        ['createdAt', 'DESC']       ]     
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи Buyer."
      });
    });
};

// Find a single Buyer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Buyer.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Buyer with id=" + id
        });
      });
};

// Update a  by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Buyer.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Buyer was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Buyer with id=${id}. Maybe Employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Buyer with id=" + id
        });
      });
};

// Delete a Buyer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Buyer.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Buyer was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Buyer with id=${id}. Maybe Buyer was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Buyer with id=" + id
        });
        });
};

// Delete all Buyer from the database.
exports.deleteAll = (req, res) => {
  Buyer.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Buyer were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Buyer."
          });
        });
  
};
