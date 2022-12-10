const db = require("../models");
const Department = db.department;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Название отдела пустое"
      });
      return;
    }
  
    // Create a Employee
    const department = {
      name: req.body.name
    };
  
    // Save Tutorial in the database
    Department.create(department)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи подразделения."
        });
      });
  };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Department.findAll({ where: condition })
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

    Department.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Department with id=" + id
        });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Department.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Department was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Department with id=${id}. Maybe Department was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Department with id=" + id
        });
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Department.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Department was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Department with id=${id}. Maybe Employee was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Department with id=" + id
        });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Department.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Department were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all departments."
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