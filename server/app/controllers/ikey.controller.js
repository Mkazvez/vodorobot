const db = require("../models");
const Ikey = db.ikey;
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
  
    // Create a Ikey
    const create_body = {
      id_text: req.body.id_text,
      ikey: req.body.ikey,
      s_date: req.body.s_date,
      d_date: req.body.d_date,
      balance: req.body.balance,
      balance_litr: req.body.balance_litr,
      number_u: req.body.number_u,
      type_key: req.body.type_key,
    };
  
    // Save Ikey in the database
    Ikey.create(create_body)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи Ikey."
        });
      });
  };

// Retrieve all Ikey from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Ikey.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи Ikey."
      });
    });
};

// Find a single Ikey with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Ikey.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Ikey with id=" + id
        });
      });
};

// Update a  by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Ikey.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Ikey was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Ikey with id=${id}. Maybe Employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Ikey with id=" + id + ". Code : " + err
        });
      });
};

// Delete a Ikey with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Ikey.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Ikey was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Ikey with id=${id}. Maybe Ikey was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Ikey with id=" + id
        });
        });
};

// Delete all Ikey from the database.
exports.deleteAll = (req, res) => {
  Ikey.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Ikey were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Ikey."
          });
        });
  
};

exports.findAllEmail = (req, res) => {
  const ikey = req.query.ikey;
  var condition = ikey ? { ikey: { [Op.like]: `%${ikey}%` } } : null;

  Ikey.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи ikey ikey."
      });
    });
};