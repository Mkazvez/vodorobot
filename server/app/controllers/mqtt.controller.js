const mqtt_out = require('../lib/email/mqtt_out');

exports.create = (req, res) => {
    // Validate request
    console.log('code ',req.code)
    if ((!req.body.code)||(!req.body.message)) {
      res.status(400).send({
        message: "Топик или сообщение пустое"
      });
      return;
    }
  
    console.log('Отправили сообшение на топик '+req.body.code+' сообщение '+req.body.message);
    mqtt_out.mqtt_out(req.body.code+'/cmd', req.body.message)    

    return res.status(200).send('Океющки');
  };

