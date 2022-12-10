const db = require("../models");
const Tips = db.tips;
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
  
    // Create a Tips
    const create_body = {
      id_text: req.body.id_text,
      tips_balance: req.body.tips_balance,
      s_date: req.body.s_date,
      d_date: req.body.d_date,
      comment: req.body.comment,
    };
  
    // Save Tutorial in the database
    Tips.create(create_body)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи Tips."
        });
      });
  };

// Retrieve all Tips from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Tips.findAll({ 
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
          err.message || "Ошибка при поиске записи Tips."
      });
    });
};

// Find a single Tips with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tips.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tips with id=" + id
        });
      });
};

// Update a  by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tips.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tips was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tips with id=${id}. Maybe Employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tips with id=" + id
        });
      });
};

// Delete a Tips with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tips.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Tips was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Tips with id=${id}. Maybe Tips was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Tips with id=" + id
        });
        });
};

// Delete all Tips from the database.
exports.deleteAll = (req, res) => {
  Tips.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Tips were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Tips."
          });
        });
  
};
