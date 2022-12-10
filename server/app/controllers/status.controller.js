const db = require("../models");
const Status = db.status;
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
  
    // Create a Status
    const status = {
      id_text: req.body.id_text,
      valve: req.body.valve,
      s_date: req.body.s_date,
      d_date: req.body.d_date,
    };
  
    // Save Tutorial in the database
    Status.create(status)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи Status."
        });
      });
  };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Status.findAll({ 
      where: condition,
      limit: 1000,
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
          err.message || "Ошибка при поиске записи Status."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Status.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Status with id=" + id
        });
      });
};

// Update a  by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Status.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Status was updated successfully."
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

// Delete a Status with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Status.destroy({
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

// Delete all Status from the database.
exports.deleteAll = (req, res) => {
  Status.destroy({
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
