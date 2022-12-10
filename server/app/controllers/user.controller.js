const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');

// Create and Save a new User
exports.create = async (req, res) => {
    // Validate request
    console.log('qqq', req.body.user_login)
    if (!req.body.user_login) {
      res.status(400).send({
        message: "Логин пустой"
      });
      return;
    }
  
    // Create a Employee
    const saltRounds = 10;

    const hash = await bcrypt.hash( req.body.user_password, saltRounds)

    const user = {
      user_login: req.body.user_login,
      user_password: hash,
      user_hash: req.body.user_hash,
      user_ip: req.body.user_ip,
      name: req.body.name,
      date_in: req.body.date_in,
      date_out:  req.body.date_out,
      post:  req.body.post,

      };
    // Save Tutorial in the database
    User.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи User."
        });
      });
  };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const name = req.query.user_login;
  var condition = name ? { user_login: { [Op.like]: `%${name}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи User."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
};

// Find a single Tutorial with an id
exports.findPassword = async (req, res) => {
  const user_login = req.body.user_login;
  const password = req.body.password; 
  const condition = user_login ? { user_login: { [Op.like]: `%${user_login}%` } } : null;
  await User.findAll({ where: condition })
    .then (async data => {
      console.log(data[0].user_password)
      const hash = data[0].user_password
      const result =  await bcrypt.compare(password, hash)
      console.log(result, bcrypt.compare(password, hash))
      res.send(result);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи User email."
      });
    });
};


// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const user = {
      user_login: req.body.user_login,
      user_password: req.body.user_password,
      user_hash: req.body.user_hash,
      user_ip: req.body.user_ip,
      name: req.body.name,
      date_in: req.body.date_in,
      date_out:  req.body.date_out,
      post:  req.body.post,
     };

    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id+"  "+err
        });
      });
};

// Login
exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body)
  User.findAll({ where: {
                  email: username, 
                  p: password
                }
               })
    .then(data => {
      if (data.length > 0){
        res.send({role: data[0].role, 
                  name: data[0].name});
        } else {
          res.send({role: '', 
            name: ''});
        }    
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи User email."
      });
    });

};


// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Employee was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Employee with id=${id}. Maybe User was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} User were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all users."
          });
        });
  
};

// Find all published Tutorials
exports.findAllEmail = (req, res) => {
    const email = req.query.email;
    var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;
  
    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при поиске записи User email."
        });
      });
};