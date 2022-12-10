const db = require("../models");
const Result = db.result;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    console.log(req.body)
    if (!req.body.Fio) {
      res.status(400).send({
        message: "ФИО пустое"
      });
      return;
    }
  
    // Create a Result
    const result = {
      dateResult: req.body.dateResult,
      Fio: req.body.Fio,
      Result: req.body.Result,
      inNumber: req.body.inNumber,
      adrestest: req.body.adrestest,
    };
  
    // Save Tutorial in the database
    Result.create(result)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи Result."
        });
      });
  };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const fio = req.query.Fio;
  var condition = fio ? { fio: { [Op.like]: `%${fio}%` } } : null;

  Result.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи Result."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Result.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Result with id=" + id
        });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Result.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Result was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Result with id=${id}. Maybe Employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Result with id=" + id
        });
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Result.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Result was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Result with id=${id}. Maybe Result was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Result with id=" + id
        });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Result.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Results were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all results."
          });
        });
  
};

// Find all published Tutorials
exports.findAllTabel = (req, res) => {
    const fio = req.query.fio;
    var condition = fio ? { tabel: { [Op.like]: `%${fio}%` } } : null;
  
    Result.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при поиске записи Result."
        });
      });
};

exports.upload = (req, res) => {
    console.log(req.files)
    if (!req.files) {
      return res.status(500).send({ msg: "file is not found" })
    }
      // accessing the file
    const myFile = req.files.file;
    console.log(__basedir, req.files.file.name)
    //console.log(__basedir, req.files.name)
    const Excel = require('exceljs')
    const workbook = new Excel.Workbook(); 
    const buffer = req.files.file.data
    //const buffer = req.files.data
    let iqty = 0
    workbook.xlsx.load(buffer).then(workbook => {
//      console.log(workbook, 'workbook instance')
      workbook.eachSheet((sheet, id) => {
        sheet.eachRow(async (row, rowIndex) => {
          if (id=1 && rowIndex > 1) {
            //console.log(row.values, rowIndex)
            
    // Create a Result
            let vdate = row.values[2];
            let dt = new Date()
            if (typeof vdate === 'string' ) {
              vdate = vdate.replace(' ', ''); 
              const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
              const vyear = vdate.substring(6,10)
              const vmonth = vdate.substring(3,5)
              const vday = vdate.substring(0,2)
              dt = new Date(vyear+'-'+vmonth+'-'+vday)
              console.log(vyear, vmonth, vday)
            } else
            {
              dt = new Date(vdate)
            }

            console.log(row.values[1], rowIndex, 'q'+vdate+'q', dt)
            const result = {
              dateResult: dt,
              Fio: row.values[1],
              Result: row.values[3],
              inNumber: '',
              adrestest: row.values[4],
            };
          
            // Save Tutorial in the database
            await Result.create(result)
              .then(data => {
                console.log(data)
                iqty = iqty+1
                //console.log(iqty)
              })
              .catch(err => {
                  console.log(err.message)
                });
          }
        })
      })
   });
   console.log('all',iqty)
   return res.status(200).send("Загруженно : " + iqty + " записей.");
};




