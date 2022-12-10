const db = require("../models");
const Setting = db.setting;
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
  
    // Create a Setting
    const create_body = {
        id_text: req.body.id_text,
        exr1: req.body.exr1,
        exr2: req.body.exr2,
        tONexr1: req.body.tONexr1,
        mONexr1: req.body.mONexr1,
        tONexr2: req.body.tONexr2,
        mONexr2: req.body.mONexr2,
        tOFFexr1: req.body.tOFFexr1,
        tOFFexr2: req.body.tOFFexr2,
        mOFFexr1: req.body.mOFFexr1,
        mOFFexr2: req.body.mOFFexr2,
        se_date: req.body.se_date,
        d_date: req.body.d_date,
    };
  
    // Save Setting in the database
    Setting.create(create_body)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи Setting."
        });
      });
  };

// Retrieve all Setting from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Setting.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи Setting."
      });
    });
};

// Find a single Setting with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Setting.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Setting with id=" + id
        });
      });
};

// Update a  by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Setting.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Setting was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Setting with id=${id}. Maybe Employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Setting with id=" + id
        });
      });
};

// Delete a Setting with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Setting.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Setting was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Setting with id=${id}. Maybe Setting was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Setting with id=" + id
        });
        });
};

// Delete all Setting from the database.
exports.deleteAll = (req, res) => {
  Setting.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Setting were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Setting."
          });
        });
  
};
