const axios = require('axios');
const e = require('cors');


// загрузка одного файла
exports.captchasend = async (req, res) => {
//Destructuring response token from request body
const {token} = req.body;
//sends secret key and response token to google
    await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_APP_SITE_KEY}&response=${token}`
      ).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    

//check response status and send back to the client-side
    if (res.status(200)) {
        res.send("Human 👨 👩");
    }else{
      res.send("Robot 🤖");
    }
 }

exports.captchasen2 = async (req, res) => {
        // Install 'es6-promise' and 'isomorphic-fetch' from NPM or Yarn.
        require("es6-promise").polyfill()
        require("isomorphic-fetch")

        const RECAPTCHA_SERVER_KEY = process.env.REACT_APP_SITE_KEY//REACT_APP_SECRET_KEY

        const humanKey = req.body
        // Validate Human
        const isHuman = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        body: `secret=${RECAPTCHA_SERVER_KEY}&response=${humanKey}`
        })
        .then(res => res.json())
        .then(json => json.success)
        .catch(err => {
             res.send(`Error in Google Siteverify API. ${err.message}`)
        })

        if (humanKey === null || !isHuman) {
            res.send(`YOU ARE NOT A HUMAN.`)
        }

        // The code below will run only after the reCAPTCHA is succesfully validated.
        console.log("SUCCESS!")
 }
    