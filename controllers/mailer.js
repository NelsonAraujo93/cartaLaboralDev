'use strict'

const nodemailer = require('nodemailer');
//var smtpTransport = require('nodemailer-smtp-transport');
module.exports = (formulario) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port:465,
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: 'estudiovagos@gmail.com', // Cambialo por tu email
            pass: 'vagosstudios2021', // Cambialo por tu password
            clientId:'225067350835-aoj3jqm885u7q1bsl7fuv33qnjaur25d.apps.googleusercontent.com',
            clientSecret: '9nFwFKRE4GS1h5r0CgtVbTa-',
            refreshToken: '1//04ZEwr7vpQ-5oCgYIARAAGAQSNwF-L9IrputExzRJ-ZLIoQCCsUfRW6wXdSrpvxoMdv9TIK0efhC1Oc6sOwZNg-ulbaw5ooH-qYY',
        }
    });
    if(formulario.mailState===1){
        const certificar = {
            from: 'Metrolinea' + '<estudiovagos@gmail.com>',
            to: formulario.email, // Cambia esta parte por el destinatario
            subject: 'Estado de solicitud de certificado :Aprovado',
            html: 'Gracias por usar la herramienta con nosotros <strong>'+ formulario.name +'</strong> Te informamos que tu petición ha sido certificada descargala adjunta a este correo <br><br><br><br>'+
            'Atentamente: <strong> Metrolinea </strong>',
            attachments: [{
                filename: 'mail.pdf',
                content: formulario.data,
                contentType: 'application/pdf',
              }],
        };
            

        transporter.sendMail(certificar, function (err, info) {
            if (err){
                console.log(err);
            }else{
                console.log(info);
            }
        });
    }else if(formulario.mailState===0){
        const denied = {
            from: 'Metrolinea' + '<estudiovagos@gmail.com>',
            to: formulario.email, // Cambia esta parte por el destinatario
            subject: 'Estado de solicitud de certificado :Rechazado',
            html: 'Gracias por usar la herramienta con nosotros <strong>'+ formulario.name +'</strong>Te informamos que tu petición ha sido rechazada por la siguiente razón <strong>'+formulario.denied+'</strong><br><br><br><br>'+
            'Atentamente: <strong>Metrolinea </strong>'
        }
        transporter.sendMail(denied, function (err, info) {
            if (err){
                console.log(err);
            }else{
                console.log(info);
            }
        });
    }else if(formulario.mailState===2){
        const petition = {
            from: 'Metrolinea' + '<estudiovagos@gmail.com>',
            to: formulario.email, // Cambia esta parte por el destinatario
            subject: 'Gracias por usar la herramienta de certificados de metrolinea',
            html: 'Hola <strong>'+ formulario.name +'</strong>Te informamos que tu petición ha sido enviada a nuestra aplicación si quieres conocer el estado de tu petición dale click a <a href="http://104.248.54.46/:3900/new-details/'+formulario.id+'">este link</a><br><br><br><br>'+
            'Atentamente: <strong>Metrolinea </strong>'
        }
        transporter.sendMail(petition, function (err, info) {
            if (err){
                console.log(err);
            }else{
                console.log(info);
            }
        });
    }
};