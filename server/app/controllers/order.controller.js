const db = require("../models");
const Order = db.order;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.order) {
      res.status(400).send({
        message: "JSON пустой"
      });
      return;
    }
  
    // Create  
    const order = {
      order: req.body.order,
    };
  
    // Save Tutorial in the database
    Order.create(order)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи order."
        });
      });
  };

// Retrieve all Tutorials from the database.

exports.findAll = (req, res) => {
    const dateload = req.query.dateload;
    var condition = dateload ? { dateload: { [Op.like]: `%${dateload}%` } } : null;

  Order.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи Order."
      });
    });
};

exports.findAllOrder = async (req, res) => {
    const reqQuery = {
      attributes: [
        'order',
        'ww'
      ]
    }
    try {
      // if (req.session.user) {
      //   const { role } = req.session.user
      //   if (role === 'admin') delete reqQuery.where
      // }
      const { value } = req.query
      if (value) reqQuery.limit = +value
      //const vorder = await Order.findAll({ where: req.query })
      const vorder = await Order.findAll({ attributes: ['order']})
      res.json(vorder)
    } catch (err) {
      res.status(500).json({ error: err.message })
      consola.error(err)
    }
  }
  

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Order.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Order with id=" + id
        });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Order.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Reportgeneral was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Order with id=${id}. Maybe Reportgeneral was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Order with id=" + id
        });
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Order.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Reportgeneral was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Order with id=${id}. Maybe Reportgeneral was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Order with id=" + id
        });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Order.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Order were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Order."
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