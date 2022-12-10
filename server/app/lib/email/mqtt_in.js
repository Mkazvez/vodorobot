const db = require("../../models");
const Status = db.status;
const Sales = db.sales;
const Temperature = db.temperature;
const Traffic = db.traffic;
const Tips = db.tips;
const Buyer = db.buyer;
const Ikey = db.ikey;
const Setting = db.setting;
const Setup = db.setup;

const Op = db.Sequelize.Op;
const mqtt_out = require('./mqtt_out.js');

function table_base(tabledata, reqdata) {

    tabledata.create(reqdata)
    .then(data => {
        console.log('Ок insert', data.dataValues)
        })
        .catch(err => {
        console.log({
            message:
            err.message || "Ошибка при создании записи."
        });
    });

}

function switchCurrency(typeCurrency) {
    switch (typeCurrency) {
        case 'coins':
            return 'Наличные';
            break;
        case 'bills':
            return 'Наличные';
            break;
        case 'mixed':
            return 'Наличные';
            break;
        case 'mix':
                return 'Наличные';
                break;
            case 'qr':
            return 'Безналичный расчет';
            break;
        case 'ibutton':
            return 'Безналичный расчет';
            break;
        case 'free':
            return 'Нет';
    }
}

function mqtt_in(topic_in) {
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

        const topic = topic_in
        client.on('connect', () => {
        console.log('Connected')
        client.subscribe([topic], () => {
            console.log(`Subscribe to topic '${topic}'`)
        })
        // client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
        //   if (error) {
        //     console.error(error)
        //   }
        // })
        })
        client.on('message', (topic, payload) => {
            let date = new Date().toLocaleString()
            let d_date = new Date()
            /// console.log('Received Message:', topic, payload.toString(), date)
            const req =
            {body:{id_text : topic_in.substring(0,4), 
                valve : payload.toString(), 
                s_date : date,
                d_date : d_date
            }} 
            /// console.log(req)   
            /// console.log(req.body.valve)   
            
            if ((req.body.valve.indexOf('ping')>-1)||(req.body.valve.indexOf('пинг')>-1)) {
                /// console.log('pong');
                /// mqtt_out.mqtt_out(req.body.id_text+'/cmd', 'pong')    
            }
            if ((req.body.valve.indexOf('sale')>-1)) {
                console.log('sale');
                arr_sales = req.body.valve.split(',')
                const sales = {
                    id_text: req.body.id_text,
                    pay: arr_sales[2],
                    purchase: arr_sales[1],
                    balance: arr_sales[3]===undefined?0:arr_sales[3],
                    litr: arr_sales[4]===undefined?0:arr_sales[4],
                    s_date: req.body.s_date,
                    d_date: req.body.d_date,
                    type_data_transfer: arr_sales[5]===undefined?0:arr_sales[5],
                    type_currency: arr_sales[2]===undefined?0:arr_sales[2],
                    type_calculation: arr_sales[2]===undefined?'':switchCurrency(arr_sales[2])
                };
                
                table_base(Sales, sales);  
            }

            if ((req.body.valve.indexOf('sale')>-1)&&(req.body.valve.indexOf('offline')>-1)) {
                console.log('sale');
                arr_sales = req.body.valve.split(',')
                const Tips = db.tips;
                const Tips_req = {
                    tips_balance: arr_sales[4]===undefined?0:arr_sales[4],
                    id_text: req.body.id_text,
                    s_date: req.body.s_date,
                    d_date: req.body.d_date
                };
                // 2510 table_base(Tips, Tips_req);

            }

            if ((req.body.valve.indexOf('temperature')>-1)) {
                console.log('temperature');
                let arr_temperature = req.body.valve.split(',')
                const temperature = {
                    id_station: req.body.id_text,
                    temparature: arr_temperature[1].replace(/[^0-9.]/g, ""),
                  };
                console.log('in', temperature)  
                table_base(Temperature, temperature);  
            }
                if ((req.body.valve.indexOf('tips')>-1)) {
                    console.log('tips');
                    const arr_tips = req.body.valve.split(',')
                    const Tips = db.tips;
                    const Tips_req = {
                        tips_balance: ((req.body.valve.indexOf('online')>-1)||(req.body.valve.indexOf('offline')>-1))?arr_tips[2]:arr_tips[1].replace(/[^0-9.]/g, ""),
                        comment: ((req.body.valve.indexOf('online')>-1)||(req.body.valve.indexOf('offline')>-1))?arr_tips[1]:"",
                        id_text: req.body.id_text,
                        s_date: req.body.s_date,
                        d_date: req.body.d_date
                    };
                    console.log(Tips_req)
                    table_base(Tips, Tips_req);
                }

                if ((req.body.valve.indexOf('buyer')>-1)) {
                    console.log('buyer');
                    const arr_buyer = req.body.valve.split(',')
                    const Buyer = db.buyer;
                    const Buyer_req = {
                        qty: arr_buyer[2].replace(/[^0-9.]/g, ""),
                        comment: arr_buyer[1],
                        id_station: req.body.id_text,
                    };
                    table_base(Buyer, Buyer_req);
                }


            if ((req.body.valve.indexOf('traffic')>-1)) {
                console.log('traffic');
                let arr_traffic = req.body.valve.split(',')
                const traffic = {
                    traffic: arr_traffic[1].replace(/[^0-9.]/g, ""),
                    id_text: req.body.id_text,
                    s_date: req.body.s_date,
                    d_date: req.body.d_date
                  };
                console.log('in', traffic)  
                table_base(Traffic, traffic);
            }
            if ((req.body.valve.indexOf('regikey')>-1)) {
                console.log('regikey');
                let arr_ikey = req.body.valve.split(',')
                const number_r = Math.random() * (999999 - 100000) + 100000;
                console.log('regikey', number_r);
                const ikeyfrom = arr_ikey[1].replace(/[^a-zA-Z0-9., а-яА-Я]/g, "")
                const ikey = {
                    ikey: ikeyfrom,
                    id_text: req.body.id_text,
                    s_date: req.body.s_date,
                    d_date: req.body.d_date,
                    number_u: number_r,
                  };
                console.log('in', ikey)  

                if (ikeyfrom.length>=10){
                    table_base(Ikey, ikey);
                    mqtt_out.mqtt_out(req.body.id_text+'/cmd', 'regibok')    
                } else
                {
                    mqtt_out.mqtt_out(req.body.id_text+'/cmd', 'regibbad')    
                }

            }          

            if ((req.body.valve.indexOf('setting')>-1)&&(req.body.valve.indexOf('sent') === -1)&&(req.body.valve.indexOf('received') === -1)) {
                console.log('setting', req.body.valve);
                let arr_setting = req.body.valve.split(',')
                const setting = {
                  id_text: req.body.id_text,
                  exr1: arr_setting[1]===undefined?0:arr_setting[1],
                  exr2: arr_setting[2]===undefined?0:arr_setting[2],
                  tONexr1: arr_setting[3]===undefined?0:arr_setting[3],
                  mONexr1: arr_setting[4]===undefined?0:arr_setting[4],
                  tONexr2: arr_setting[5]===undefined?0:arr_setting[5],
                  mONexr2: arr_setting[6]===undefined?0:arr_setting[6],
                  tOFFexr1: arr_setting[7]===undefined?0:arr_setting[7],
                  tOFFexr2: arr_setting[8]===undefined?0:arr_setting[8],
                  mOFFexr1: arr_setting[9]===undefined?0:arr_setting[9],
                  mOFFexr2: arr_setting[10]===undefined?0:arr_setting[10],
                  player: arr_setting[11]===undefined?0:arr_setting[11],
                  se_date: req.body.s_date,
                  d_date: req.body.d_date
            };
              
                console.log('in', setting)  
                table_base(Setting, setting);
            }
             
            if ((req.body.valve.indexOf('setup')>-1)&&(req.body.valve.indexOf('sent') === -1)&&(req.body.valve.indexOf('received') === -1)) {
                console.log('setup');
                let arr_setup = req.body.valve.split(',')
                const setup = {
                  id_text: req.body.id_text,
                  price: arr_setup[1]===undefined?0:arr_setup[1],
                  discount: arr_setup[2]===undefined?0:arr_setup[2],
                  twater: arr_setup[3]===undefined?0:arr_setup[3],
                  tifw: arr_setup[4]===undefined?0:arr_setup[4],
                  Free: arr_setup[5]===undefined?0:arr_setup[5],
                  discountONclock: arr_setup[6]===undefined?0:arr_setup[6],
                  discountONminute: arr_setup[7]===undefined?0:arr_setup[7],
                  discountOFFclock: arr_setup[8]===undefined?0:arr_setup[8],
                  discountOFFminute: arr_setup[9]===undefined?0:arr_setup[9],
                  MoDe: arr_setup[10]===undefined?0:arr_setup[10],
                  s_date: req.body.s_date,
                  d_date: req.body.d_date
            };
              
                console.log('in', setup)  
                table_base(Setup, setup);
            }


            if ((req.body.valve.indexOf('delikey')>-1)) {
                console.log('delikey');
                let arr_ikey = req.body.valve.split(',')
                let ikey_filter = arr_ikey[1].replace(/[^a-zA-Z0-9., а-яА-Я]/g, "")
                const condition = ikey_filter ? { ikey: { [Op.like]: `%${ikey_filter}%` } } : null;
              
                Ikey.findAll({ where: condition })
                  .then(data => {
                    // console.log('find ikeys2',data[0].ikey,data[0].id,data[0].dataValues);
                    console.log('data', data[0].id);
                    const id = data[0].id;

                    Ikey.destroy({
                        where: { id: id }
                    })
                        .then(num => {
                        if (num == 1) {
                            console.log({
                            message: "Ikey was deleted successfully!"
                            });
                            mqtt_out.mqtt_out(req.body.id_text+'/cmd', 'delibok')    
                        } else {
                            console.log({
                            message: `Cannot delete Ikey with id=${id}. Maybe Ikey was not found!`
                            });
                        }
                        })
                        .catch(err => {
                        console.log({
                            message: "Could not delete Ikey with id=" + id + err
                        });
                        });
                })
                  .catch(err => {
                    console.log({
                      message:
                        err.message || "Ошибка при поиске записи ikey ikey. "+err
                    });
                  });

            }          

            const status = {
                id_text: req.body.id_text,
                valve: req.body.valve.replace(/[^a-zA-Z0-9., а-яА-Я]/g, ""),
                s_date: req.body.s_date,
                d_date: req.body.d_date
              };
              if ((req.body.valve.indexOf('ping') === -1)) {
                table_base(Status, status);
              }  
            //   client.end();
        })

}

module.exports = {
    mqtt_in: mqtt_in
   };
 