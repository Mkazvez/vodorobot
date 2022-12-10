const db = require("../../models");
const Status = db.status;
const Op = db.Sequelize.Op;

function mqtt_out(topic_out, message_out) {
        const mqtt = require('mqtt')

        const host = 'm5.wqtt.ru'
        const port = '5272'
        const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

        const connectUrl = `mqtt://${host}:${port}`
        const client = mqtt.connect(connectUrl, {
        clientId,
        clean: true,
        connectTimeout: 4000,
        username: 'test',
        password: 'test',
        reconnectPeriod: 1000,
        })

        const topic = topic_out
        client.on('connect', () => {
        console.log('Connected')
        console.log(topic_out, message_out)
        client.subscribe([topic], () => {
            console.log(`Subscribe to topic '${topic}'`)
        })
            client.publish(topic_out, message_out, { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
            })
            client.end();
        })
//         client.on('message', (topic, payload) => {
//             let date = new Date().toLocaleString()
//             let d_date = new Date()
//             console.log('Received Message:', topic, payload.toString(), date)
//             const req =
//             {body:{id_text : topic_in.substring(0,4), 
//                 valve : payload.toString(), 
//                 s_date : date,
//                 d_date : d_date
//             }} 
//             console.log(req)   
//             // console.log(req.body.valve)   

//             const status = {
//                 id_text: req.body.id_text,
//                 valve: req.body.valve.replace(/[^a-zA-Z0-9., ]/g, ""),
//                 s_date: req.body.s_date,
//                 d_date: req.body.d_date
//               };
            
//               // Save record in the database
// // потом включить

//                 // Status.create(status)
//                 //     .then(data => {
//                 //     console.log('Ок', data.dataValues)
//                 //     })
//                 //     .catch(err => {
//                 //     console.log({
//                 //         message:
//                 //         err.message || "Ошибка при создании записи Status."
//                 //     });
//                 // });
// // обработка входящего сообщение          
//         })

}

module.exports = {
    mqtt_out: mqtt_out
   };
 