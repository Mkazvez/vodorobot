const db = require("../models");
const fs = require("fs");
const Email = db.mail;
const Op = db.Sequelize.Op;
const sendEmail = require('../lib/email/send_email.js');

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.Name) {
      res.status(400).send({
        message: "ФИО пустое"
      });
      return;
    }
  
    // Create a Email
    const email = {
      Name: req.body.Name,
      Email: req.body.Email,
      Phone: req.body.Phone,
      Message: req.body.Message,
      Ip: req.body.Ip,
      Adres: req.body.Adres,
      IdAdres: req.body.IdAdres?req.body.IdAdres:0,
      Flat: req.body.Flat,
      FileFull: req.body.FileFull?req.body.FileFull:null,
      RandomFileName: req.body.RandomFileName?req.body.RandomFileName:'',
      TypeMail: req.body.TypeMail?req.body.TypeMail:0,
      Service: req.body.Service?req.body.Service:'',
      TypeApplicant: req.body.TypeApplicant?req.body.TypeApplicant:0,
      TypeTreatment: req.body.TypeTreatment?req.body.TypeTreatment:0,
      Status: req.body.Status?req.body.Status:0,
      UserResponsible: req.body.UserResponsible?req.body.UserResponsible:0,
      UserExecutor: req.body.UserExecutor?req.body.UserExecutor:0,
      DateExecution: req.body.DateExecution?req.body.DateExecution:null,
      FileResponse: req.body.FileResponse?req.body.FileResponse:'',
      DateClose: req.body.DateClose?req.body.DateClose:null,
      IdClose: req.body.IdClose?req.body.IdClose:0,
      IdReturn: req.body.IdReturn?req.body.IdReturn:0,
      DateInput: req.body.DateInput?req.body.DateInput:null,
      NumberInput: req.body.NumberInput?req.body.NumberInput:null,
      IdTopic: req.body.IdTopic?req.body.IdTopic:null
      // FileMail: req.body.FileMail?req.body.FileMail:null,
    };
  
    // Save Tutorial in the database
    console.log(email)
    Email.create(email)
      .then(data => {
        res.send(data);
        // отправили почту
        sendEmail.send(email, 'mkazv@rambler.ru', 'mkazv@rambler.ru');  
        sendEmail.send(email, 'mkazv@rambler.ru', 'info@uklife.ru');
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи Email."
        });
      });

  };

// Retrieve all Emails from the database.
exports.findAll = (req, res) => {
  const Name = req.query.name;
  var condition = Name ? { Name: { [Op.like]: `%${Name}%` } } : null;

  Email.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи Name."
      });
    });
};

// Find a single Email with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Email.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Email with id=" + id
        });
      });
};

// Update a Email by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Email.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Email was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Email with id=${id}. Maybe Email was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Email with id=" + id
        });
      });
};



// Delete a Email with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Email.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Email was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Email with id=${id}. Maybe Email was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Email with id=" + id
        });
        });
};

// Delete all Emails from the database.
exports.deleteAll = (req, res) => {
    Email.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Email were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all emials."
          });
        });
  
};

// Find all published Tutorials
exports.findAllEmail = (req, res) => {
    const Email = req.query.email;
    var condition = Email ? { Email: { [Op.like]: `%${Email}%` } } : null;
  
    Email.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при поиске записи Email from email."
        });
      });
};


exports.upload = (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
    // accessing the file
  const myFile = req.files.file;
  console.log(__basedir, req.files.file.name)
  const filein  = req.files.file
  filein.randomFileName = Math.ceil(Math.random() * 100000000);
    fs.access("state/mails/"+filein.randomFileName+"/",async function(error) {
      if (error) {
        console.log("Directory does not exist.")
        fs.mkdir("state/mails/"+filein.randomFileName+"/", err => {
          if(err) throw err; // не удалось создать папку
          console.log('Папка успешно создана');
       });
      } else {
        console.log("Directory exists.")
      }
      setTimeout(() => {
        // const chunk = JSON.parse(req.body.chunkMetadata)
        // console.log('qqq', chunk)
        // if (chunk.Index===0) {
        //   const e = fs.writeFile("state/mails/"+filein.randomFileName+"/"+chunk.FileName, req.files.file.data, function(err, result) {
        //     if(err) console.log('error', err);
        //   })}else
          {
            const e = fs.appendFile("state/mails/"+filein.randomFileName+"/"+req.files.file.name, req.files.file.data, function(err, result) {
              if(err) console.log('error', err);
            })
          }
      }, 1000)
    })
  
  return res.status(200).send(filein);
};