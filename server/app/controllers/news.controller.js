const fs = require("fs");
const db = require("../models");
const News = db.news;
const Op = db.Sequelize.Op;

function movedFileInDictory(id, fileName) {
  fs.access("public/static/news/"+id+"/",async function(error) {
    if (error) {
      console.log("Directory does not exist.")
      fs.mkdir("public/static/news/"+id+"/", err => {
        if(err) console.log(err); // не удалось создать папку
        console.log('Папка успешно создана');
     });
    } else {
      console.log("Directory exists.")
    }
    setTimeout(() => {
      fs.rename("public/static/news/"+fileName, "public/static/news/"+id+"/"+fileName, err => {
      if(err) console.log(err); // не удалось переместить файл
        console.log('Файл успешно перемещён');
       });
    }, 1000)
  })
}

// Create and Save a 
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Заголовок пустой"
      });
      return;
    }
  
    // Create a News
    const news = {
      date: req.body.date,
      title: req.body.title,
      news_text: req.body.news_text,
      pathPicture: req.body.pathPicture,
      pathDoc: req.body.pathDoc
      // picture: req.body.picture?req.body.pucture:null,
    };
  
    // Save news in the database
    console.log(news)
    News.create(news)
      .then(data => {
        const id = data.id
        const pathFile = data.pathPicture
        const pathDoc = data.pathDoc
        if (pathFile!='') {movedFileInDictory(id, pathFile)};
        if (pathDoc!='') {movedFileInDictory(id, pathDoc)};
      res.send(data);
        console.log(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ошибка при создании записи News."
        });
      });

  };

// Retrieve all News from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  News.findAll({ 
    where: condition ,
    order: [
      ['createdAt', 'DESC']
    ]
   })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи Title."
      });
    });
};


// Retrieve top 4 last News from the database.
exports.findTop4 = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  News.findAll(
    {
      where: condition ,
      limit: 4,
      order: [
        ['createdAt', 'DESC'] 
      ]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка при поиске записи Title."
      });
    });
};

// Find a single News with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    News.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving News with id=" + id
        });
      });
};

// загрузка одного файла
exports.downloadOne = (req, res) => {
  const id = req.params.id;
    News.findByPk(id)
    .then(data => {
      const pathFile = data.pathPicture
      // res.send(pathFile)
      fs.access("public/static/news/"+id+"/", function(error) {
        if (error) {
          console.log("Directory does not exist.")
          res.status(500).send("Нет директории")
        } else {
            const file = "public/static/news/"+id+"/"+pathFile;
            console.log(file)
            res.download(file); // Set disposition and send it.
        }  
        })      
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving News with id=" + id
      });
    });
 }

 exports.downloadOneDoc = (req, res) => {
  const id = req.params.id;
    News.findByPk(id)
    .then(data => {
      const pathFile = data.pathDoc
      // res.send(pathFile)
      fs.access("public/static/news/"+id+"/", function(error) {
        if (error) {
          console.log("Directory does not exist.")
          res.status(500).send("Нет директории")
        } else {
            const file = "public/static/news/"+id+"/"+pathFile;
            console.log(file)
            res.download(file); // Set disposition and send it.
        }  
        })      
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving News with id=" + id
      });
    });
 }

exports.show= (req, res) => {
  //Добавьте обработчик запросов для / showURL, который напрямую жестко кодирует содержимое файла  в браузере.
    const id = req.params.id;
    News.findByPk(id)
    .then(data => {
      const pathFile = data.pathPicture
      // res.send(pathFile)
      fs.access("public/static/news/"+id+"/", function(error) {
        if (error) {
          console.log("Directory does not exist.")
          res.status(500).send("Нет директории")
        } else {
            const file = "public/static/news/"+id+"/"+pathFile;
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
        message: "Error retrieving News with id=" + id
      });
    });

}
exports.showDoc= (req, res) => {
  //Добавьте обработчик запросов для / showURL, который напрямую жестко кодирует содержимое файла  в браузере.
    const id = req.params.id;
    News.findByPk(id)
    .then(data => {
      const pathFile = data.pathDoc
      // res.send(pathFile)
      fs.access("public/static/news/"+id+"/", function(error) {
        if (error) {
          console.log("Directory does not exist.")
          res.status(500).send("Нет директории")
        } else {
            const file = "public/static/news/"+id+"/"+pathFile;
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
        message: "Error retrieving News with id=" + id
      });
    });

}

// Update a News by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    const pathFile = req.body.pathPicture
    const pathDoc = req.body.pathDoc

    console.log(pathFile, pathDoc)
    console.log('body',req.body)
    await News.update(req.body,{
      where: { id: id }
    })
      .then(async num => {
        if (num == 1) {
          res.send({
            message: "News was updated successfully."
          });
          if (pathFile!='') {movedFileInDictory(id, pathFile)};
          if (pathDoc!='') {movedFileInDictory(id, pathDoc)};
        } else {
          res.send({
            message: `Cannot update News with id=${id}. Maybe News was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating News with id=" + id
        });
      });
};



// Delete a News with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    News.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "News was deleted successfully!"
            });
            fs.unlink("public/static/news/"+id+"/", (err) => {
              if (err) console.log(err);
            
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
    News.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} News were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all news."
          });
        });
  
};



exports.upload = (req, res) => {
  const file2 = JSON.parse(req.body.chunkMetadata)
  //console.log(file2.FileName)
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
    // accessing the file
  const myFile = req.files.file;
  //console.log(__basedir, req.files.file.name)
  const chunk = JSON.parse(req.body.chunkMetadata)
  console.log('qqq', chunk)
  if (chunk.Index===0) {
    const e = fs.writeFile("public/static/news/"+chunk.FileName, req.files.file.data, function(err, result) {
      if(err) console.log('error', err);
    })}else
    {
      const e = fs.appendFile("public/static/news/"+chunk.FileName, req.files.file.data, function(err, result) {
        if(err) console.log('error', err);
      })
    }

  console.log(__basedir, req.files.name)
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

exports.uploadDoc = (req, res) => {
  const file2 = JSON.parse(req.body.chunkMetadata)
  //console.log(file2.FileName)
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
    // accessing the file
  const myFile = req.files.file;
  //console.log(__basedir, req.files.file.name)
  const chunk = JSON.parse(req.body.chunkMetadata)
  console.log('qqq', chunk)
  if (chunk.Index===0) {
    const e = fs.writeFile("public/static/news/"+chunk.FileName, req.files.file.data, function(err, result) {
      if(err) console.log('error', err);
    })}else
    {
      const e = fs.appendFile("public/static/news/"+chunk.FileName, req.files.file.data, function(err, result) {
        if(err) console.log('error', err);
      })
    }

  console.log(__basedir, req.files.name)
   let iqty = 0

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