async function send(data, emailFrom, emailTo) {
  const nodemailer = require("nodemailer");
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      //let testAccount = await nodemailer.createTestAccount();
    
      // create reusable transporter object using the default SMTP transport
      let transporter = await nodemailer.createTransport({
        host: 'smtp.rambler.ru',
        port: 465,
        secure: true,
        auth: {
          user: emailFrom,
          pass: 'privet3345'
        },
        tls: { maxVersion: 'TLSv1.2' }
    });
    console.log(data.Email, data.Name, emailFrom)  
      let message = await {
          from: 'Заявка с сайта УК Life-Group <'+emailFrom+'>', // sender address
          to: emailTo, // list of receivers
          subject: "ФИО "+data.Name, // Subject line
          text: "Сообщение "+data.Name, // plain text body
          html: '<p><b>ФИО - </b>'+data.Name+'</p>'+
                '<p><b>Email - </b>'+data.Email+'</p>'+
                '<p><b>Телефон - </b>'+data.Phone+'</p>'+
                '<b>Сообщение - </b>'+data.Message
          , // html body
          // attachments: data.fileName?[
          //   {   // utf-8 string as an attachment
          //       filename: data.fileName,
          //       path: data.fileName
          //   }
          // ]:null,    
      };
      let info = await transporter.sendMail(message);
      
      console.log(info.response);
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    
    main().catch(console.error);
  }
  
  module.exports = {
   send: send
  };
  //let fileNamePdf = 'outresult/849064.pdf';
  
  // let message_data = {
  //   Name: 'Можаев Кирилл',
  //   Email: 'mozhaevka2@gmail.com',
  //   Phone: '9501925345',
  //   Message: 'Помогите мне'
  // }
  // send(message_data);
  
  //send(fileNamePdf,'mkazv@rambler.ru');
  