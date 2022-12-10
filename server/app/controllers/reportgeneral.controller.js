const db = require("../models");
const Reportgeneral = db.reportgeneral;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.dateload) {
      res.status(400).send({
        message: "Дата пустая"
      });
      return;
    }
  
    // Create  
    const reportgeneral = {
      dateload: req.body.dateload,
      inqty: req.body.inqty,
      noqty: req.body.noqty,
      resultqty: req.body.resultqty,
      innotqty: req.body.innotqty,
      shareprocent: req.body.shareprocent,
    };
  
    // Save Tutorial in the database
    Reportgeneral.create(reportgeneral)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи reportgeneral."
        });
      });
  };

// Retrieve all Tutorials from the database.

exports.findAll = (req, res) => {
    const dateload = req.query.dateload;
    var condition = dateload ? { dateload: { [Op.like]: `%${dateload}%` } } : null;

  Reportgeneral.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи Reportgeneral."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Reportgeneral.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Reportgeneral with id=" + id
        });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Reportgeneral.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Reportgeneral was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Reportgeneral with id=${id}. Maybe Reportgeneral was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Reportgeneral with id=" + id
        });
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Reprotgeneral.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Reportgeneral was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Reportgeneral with id=${id}. Maybe Reportgeneral was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Reportgeneral with id=" + id
        });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Reportgeneral.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Reportgeneral were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Reportgeneral."
          });
        });
  
};

// Find all published Tutorials

// exports.findAllEmail = (req, res) => {
//     const email = req.query.email;
//     var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;
  
//     User.findAll({ where: condition })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Ошибка при поиске записи Reportgeneral email."
//         });
//       });
// };