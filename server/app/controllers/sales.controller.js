const db = require("../models");
const Sales = db.sales;
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
  
    // Create a Sales
    const create_body = {
      id_text: req.body.id_text,
      purchase: req.body.purchase,
      balance: req.body.balance,
      pay: req.body.pay,      
      litr: req.body.litr,
      s_date: req.body.s_date,
      d_date: req.body.d_date,
    };
  
    // Save Tutorial in the database
    Sales.create(create_body)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи Sales."
        });
      });
  };

// Retrieve all Sales from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Sales.findAll({ 
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
          err.message || "Ошибка при поиске записи Sales."
      });
    });
};

// Find a single Sales with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Sales.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Sales with id=" + id
        });
      });
};

// Update a  by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Sales.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Sales was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Sales with id=${id}. Maybe Employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Sales with id=" + id
        });
      });
};

// Delete a Sales with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Sales.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Sales was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Sales with id=${id}. Maybe Sales was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Sales with id=" + id
        });
        });
};

// Delete all Sales from the database.
exports.deleteAll = (req, res) => {
  Sales.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Sales were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all sales."
          });
        });
  
};
