const db = require("../models");
const Employee = db.employee;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "ФИО пустое"
      });
      return;
    }
  
    // Create a Employee
    const employee = {
      tabel: req.body.tabel,
      name: req.body.name
    };
  
    // Save Tutorial in the database
    Employee.create(employee)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи Employee."
        });
      });
  };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Employee.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи Employee."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Employee.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Employee with id=" + id
        });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Employee.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Employee was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Employee with id=" + id
        });
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Employee.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Employee was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Employee with id=" + id
        });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Employee.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Employees were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all employees."
          });
        });
  
};

// Find all published Tutorials
exports.findAllTabel = (req, res) => {
    const tabel = req.query.tabel;
    var condition = tabel ? { tabel: { [Op.like]: `%${tabel}%` } } : null;
  
    Employee.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при поиске записи Employee."
        });
      });
};