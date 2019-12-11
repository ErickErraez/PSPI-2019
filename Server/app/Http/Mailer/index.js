var nodemailer = require('nodemailer');

let sendMail = (req, res) => {
    let {email, asunto, mensaje} = req.body.params;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sispspi.notification@gmail.com',
            pass: 'PSPI123456'
        }
    });

    var mailOptions = {
        from: 'sispspi.notification@gmail.com',
        to: email,
        subject: asunto,
        text: mensaje
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
};

module.exports = {
    sendMail
};
