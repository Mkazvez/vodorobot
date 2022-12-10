const db = require("../models");
const Setup = db.setup;
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
  
    // Create a Setup
    const create_body = {
        id_text: req.body.id_text,
        price: req.body.price,
        discount: req.body.discount,
        twater: req.body.twater,
        tifw: req.body.tifw,
        Free: req.body.Free,
        discountONclock: req.body.discountONclock,
        discountONminute: req.body.discountONminute,
        discountOFFclock: req.body.discountOFFclock,
        discountOFFminute: req.body.discountOFFminute,
        MoDe: req.body.MoDe,
        s_date: req.body.s_date,
        d_date: req.body.d_date,
    };
  
    // Save Setup in the database
    Setup.create(create_body)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи Setup."
        });
      });
  };

// Retrieve all Setup from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Setup.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи Setup."
      });
    });
};

// Find a single Setup with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Setup.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Setup with id=" + id
        });
      });
};

// Update a  by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Setup.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Setup was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Setup with id=${id}. Maybe Employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Setup with id=" + id
        });
      });
};

// Delete a Setup with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Setup.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Setup was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Setup with id=${id}. Maybe Setup was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Setup with id=" + id
        });
        });
};

// Delete all Setup from the database.
exports.deleteAll = (req, res) => {
  Setup.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Setup were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Setup."
          });
        });
  
};
