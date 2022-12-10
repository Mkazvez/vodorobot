const fs = require("fs");
const db = require("../models");
const Documenttarif = db.documenttarif;
const Op = db.Sequelize.Op;

function movedFileInDictory(id, fileName) {
  fs.access("state/houses/"+id+"/tarif/",async function(error) {
    if (error) {
      console.log("Directory does not exist.")
      fs.mkdir("state/houses/"+id+"/tarif/", err => {
        if(err) throw err; // не удалось создать папку
        console.log('Папка успешно создана');
     });
    } else {
      console.log("Directory exists.")
    }
    setTimeout(() => {
      fs.rename("state/houses/"+fileName, "state/houses/"+id+"/tarif/"+fileName, err => {
      if(err) throw err; // не удалось переместить файл
        console.log('Файл успешно перемещён');
       });
    }, 1000)
  })
}

// Create and Save a 
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Название пустое"
      });
      return;
    }
  
    // Create a documenttarif
    const documetntarif = {
      id_house: req.body.id_house,
      name: req.body.name,
      full_path: req.body.full_path,
      idsort: req.body.idsort
    };
  
    // Save documenttarif in the database
    Documenttarif.create(documetntarif)
      .then(data => {
        // const id = data.id
        // const pathFile = data.pathPicture
        // movedFileInDictory(id, pathFile);
        res.send(data);
        console.log(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи documenttarif."
        });
      });

  };

// Retrieve all News from the database.
exports.findAll = (req, res) => {
  const id_house = req.query.id_house;
  var condition = id_house ? { id_house } : null;
  console.log(id_house, condition)
  Documenttarif.findAll({ 
    where: condition ,
    order: [
      ['idsort', 'ASC']
    ]
   })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи id_house."
      });
    });
};



// Find a single News with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Documenttarif.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Documenttarif with id=" + id
        });
      });
};

// загрузка одного файла
exports.downloadOne = (req, res) => {
  const id = req.params.id;
    Documenttarif.findByPk(id)
    .then(data => {
      const pathFile = data.full_path
      const id_house = data.id_house
      console.log(pathFile, id_house)
      fs.access("state/houses/"+id_house+"/tarif/", function(error) {
        if (error) {
          console.log("Directory does not exist.")
          res.status(500).send("Нет директории")
        } else {
            const file = "state/houses/"+id_house+"/tarif/"+pathFile;
            console.log(file)
            res.download(file); // Set disposition and send it.
        }  
        })      
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Documetns with id=" + id
      });
    });
 }

exports.show= (req, res) => {
  //Добавьте обработчик запросов для / showURL, который напрямую жестко кодирует содержимое файла  в браузере.
    const id = req.params.id;
    Documenttarif.findByPk(id)
    .then(data => {
      const pathFile = data.full_path
      const id_house = data.id_house
      // res.send(pathFile)
      fs.access("state/houses/"+id_house+"/tarif/", function(error) {
        if (error) {
          console.log("Directory does not exist.")
          res.status(500).send("Нет директории")
        } else {
            const file = "state/houses/"+id_house+"/tarif/"+pathFile;
            console.log(file)
            // res.download(file); // Set disposition and send it.
            console.log("Request handler 'show' was called.");
            fs.readFile(file, "binary", function(error, file) {
              if(error) {
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.write(error + "\n");
                res.end();
              } else {
                res.writeHead(200, {"Content-Type": "image/png"});
                res.write(file, "binary");
                res.end();
              }
            });
    
        }  
        })      
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Documenttarifs with id=" + id
      });
    });

}
// Update a News by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    // const pathFile = req.body.pathPicture

//    console.log(pathFile)
//    console.log('body',req.body)
    await Documenttarif.update(req.body,{
      where: { id: id }
    })
      .then(async num => {
        if (num == 1) {
          res.send({
            message: "News was updated successfully."
          });
        //   movedFileInDictory(id, pathFile);
        } else {
          res.send({
            message: `Cannot update Documenttarifs with id=${id}. Maybe News was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Documenttarifs with id=" + id
        });
      });
};



// Delete a News with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;
    const pathFile = "";
    const id_house = 0;

    await Documenttarif.findByPk(id)
    .then(data => {
      pathFile = data.full_path
      id_house = data.id_house
      // res.send(pathFile)
    })
    .catch(err => {
      return res.status(500).send({
        message: "Error retrieving Documenttarifs with id=" + id
      });
    });

    Documenttarif.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Documenttarifs was deleted successfully!"
            });
            fs.unlink("state/houses/"+id_house+"/tarif/", (err) => {
              if (err) throw err;
            
              console.log('Каталог удален');
            });
        } else {
            res.send({
            message: `Cannot delete News with id=${id}. Maybe News was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete News with id=" + id
        });
        });
};

// Delete all News from the database.
exports.deleteAll = (req, res) => {
    Documenttarif.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Documenttarif were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all news."
          });
        });
  
};



exports.upload = async (req, res) => {
  const file2 = JSON.parse(req.body.chunkMetadata)
//   console.log(req.query);
  //const id = req.params.id;
  const id = req.query.house;
  const pathFile = req.query.filename;
  const id_house = req.query.house;
//   console.log(id, id_house);
  
  if ((id === 0)||(id === 'undefined')||(id === null))
    {
      return res.status(500).send({
        message: "Не верный id=" + id
      });
    }
  if ((pathFile === '')||(pathFile === 'undefined')||(pathFile === null))
    {
        return res.status(500).send({
          message: "Не верный pathName=" + pathFile
        });
      }
  if ((id_house === 0)||(id_house === 'undefined')||(id_house === null))
      {
        return res.status(500).send({
          message: "Не верный id=" + id
        });
      }
    
  // await Documenttarif.findByPk(id)
  // .then(data => {
  //   const pathFile = data.full_path
  //   const id_house = data.id_house
  //   console.log(data)
    // res.send(pathFile)
    fs.access("state/houses/"+id_house+"/",async function(error) {
        if (error) {
          console.log("Directory does not exist.")
          fs.mkdir("state/houses/"+id_house+"/", err => {
              if (err) {
                  console.log(err);
                  res.status(500).send(err);
              }; // не удалось создать папку
                console.log('Папка для дома успешно создана');
             });
        } else {
          console.log("Directory exists.")
        }
    })    
    fs.access("state/houses/"+id_house+"/tarif/",async function(error) {
      if (error) {
        console.log("Directory does not exist.")
        fs.mkdir("state/houses/"+id_house+"/tarif/", err => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }; // не удалось создать папку
          console.log('Папка для тарифов успешно создана');
       });
      } else {
        console.log("Directory exists.")
      }
  
      setTimeout(() => {
      //console.log(file2.FileName)
        if (!req.files) {
          return res.status(500).send({ msg: "file is not found" })
        }
          // accessing the file
        const myFile = req.files.file;
        //console.log(__basedir, req.files.file.name)
        const chunk = JSON.parse(req.body.chunkMetadata)
        console.log('qqq2', chunk.FileName)
        if (chunk.Index===0) {
          const e = fs.writeFile("state/houses/"+id_house+'/tarif/'+pathFile, req.files.file.data, function(err, result) {
            if(err) console.log('error', err);
          })}else
          {
            const e = fs.appendFile("state/houses/"+id_house+'/tarif/'+pathFile, req.files.file.data, function(err, result) {
              if(err) console.log('error', err);
            })
          }}, 1000)
  
    })
  
  // })
  // .catch(err => {
  //   res.status(500).send({
  //     message: "Error retrieving Documenttarifs with id=" + id
  //   });
  // });


  // console.log(__basedir, req.files.name)
//   const Excel = require('exceljs')
//   const workbook = new Excel.Workbook(); 
//   const buffer = req.files.file.data
//   //const buffer = req.files.data
   let iqty = 0
//   workbook.xlsx.load(buffer).then(workbook => {
// //      console.log(workbook, 'workbook instance')
//     workbook.eachSheet((sheet, id) => {
//       sheet.eachRow(async (row, rowIndex) => {
//         if (id=1 && rowIndex > 1) {
//           //console.log(row.values, rowIndex)
          
//   // Create a Result
//           let vdate = row.values[2];
//           let dt = new Date()
//           if (typeof vdate === 'string' ) {
//             vdate = vdate.replace(' ', ''); 
//             const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
//             const vyear = vdate.substring(6,10)
//             const vmonth = vdate.substring(3,5)
//             const vday = vdate.substring(0,2)
//             dt = new Date(vyear+'-'+vmonth+'-'+vday)
//             console.log(vyear, vmonth, vday)
//           } else
//           {
//             dt = new Date(vdate)
//           }

//           console.log(row.values[1], rowIndex, 'q'+vdate+'q', dt)
//           const result = {
//             dateResult: dt,
//             Fio: row.values[1],
//             Result: row.values[3],
//             inNumber: '',
//             adrestest: row.values[4],
//           };
        
//           // Save Tutorial in the database
//           await Result.create(result)
//             .then(data => {
//               console.log(data)
//               iqty = iqty+1
//               //console.log(iqty)
//             })
//             .catch(err => {
//                 console.log(err.message)
//               });
//         }
//       })
//     })
//  });
//  console.log('all',iqty)


  return res.status(200).send(req.files);
};

exports.saveupload = (req, res) => {
  console.log('save', req.body.fileName)
  /*

  const file2 = JSON.parse(req.body.chunkMetadata)
  console.log(file2.FileName)
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
    // accessing the file
  const myFile = req.files.file;
  console.log(__basedir, req.files.file.name)
  console.log('qqq',req.files.file.data)
  const e = fs.writeFile("hello.txt", req.files.file.data, function(err, result) {
    if(err) console.log('error', err);
  })
*/
  //console.log(__basedir, req.files.name)
//   const Excel = require('exceljs')
//   const workbook = new Excel.Workbook(); 
//   const buffer = req.files.file.data
//   //const buffer = req.files.data
   let iqty = 0
//   workbook.xlsx.load(buffer).then(workbook => {
// //      console.log(workbook, 'workbook instance')
//     workbook.eachSheet((sheet, id) => {
//       sheet.eachRow(async (row, rowIndex) => {
//         if (id=1 && rowIndex > 1) {
//           //console.log(row.values, rowIndex)
          
//   // Create a Result
//           let vdate = row.values[2];
//           let dt = new Date()
//           if (typeof vdate === 'string' ) {
//             vdate = vdate.replace(' ', ''); 
//             const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
//             const vyear = vdate.substring(6,10)
//             const vmonth = vdate.substring(3,5)
//             const vday = vdate.substring(0,2)
//             dt = new Date(vyear+'-'+vmonth+'-'+vday)
//             console.log(vyear, vmonth, vday)
//           } else
//           {
//             dt = new Date(vdate)
//           }

//           console.log(row.values[1], rowIndex, 'q'+vdate+'q', dt)
//           const result = {
//             dateResult: dt,
//             Fio: row.values[1],
//             Result: row.values[3],
//             inNumber: '',
//             adrestest: row.values[4],
//           };
        
//           // Save Tutorial in the database
//           await Result.create(result)
//             .then(data => {
//               console.log(data)
//               iqty = iqty+1
//               //console.log(iqty)
//             })
//             .catch(err => {
//                 console.log(err.message)
//               });
//         }
//       })
//     })
//  });
//  console.log('all',iqty)


  return res.status(200).send('Океющки');
};