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
        from: 'PSPI <sispspi.notification@gmail.com>',
        to: email,
        subject: asunto,
        text: mensaje
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            return res.status(200).json({
                ok: true,
                action: 'Correo Enviado',
            })
        }
    });
};

module.exports = {
    sendMail
};
