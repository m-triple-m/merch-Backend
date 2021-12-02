const mailjs = require("emailjs");
const user_email = require("../config").email_id;
const app_password = require("../config").email_app_password;
const express = require("express");
const router = express.Router();
router.post('/sendmail', (req, res) => {
    data = req.body;
    username = "";
    pass = "";
    sendMail(data, username, pass, (err) => {
        if (err) res.json(err)
        else res.json({ message: "OTP Successfully Sent" })
    });
})

sendMail = (data, username, password, callback) => {
    var server = mailjs.server.connect({
        user: user_email,
        password: app_password,
        host: "smtp.gmail.com",
        ssl: true
    });

    //send the message and get a callback with an error or details of the that was sent
    server.send({
        text: data.message,
        from: user_email,
        to: data.to,
        cc: user_email,
        subject: data.subject
    }, callback);
}

module.exports = router