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
            clientId:'225067350835-6c4qgj80289v5ovfj0ag543vru8i2q07.apps.googleusercontent.com',
            clientSecret: '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',
            refreshToken: '1//04YSYmXqscJY7CgYIARAAGAQSNwF-L9Ir20C1cS7cgEx3VtF97XrPokvZt68yuJtlf9hjnHcIUa85mdM_OKzES0eut1TrXcwaWxw',
        }
    });
    if(formulario.mailState===1){
        const certificar = {
            from: 'Metrolinea' + '<estudiovagos@gmail.com>',
            to: formulario.email, // Cambia esta parte por el destinatario
            subject: 'Estado de solicitud de certificado: Aprobado',
            html: 'Gracias por usar la herramienta de solicitudes con nosotros <strong>'+ formulario.name +'</strong>. Le informamos que su petición ha sido certificada, descárguela adjunta a este correo o a través de  <a href="http://172.16.40.5:3900/new-details/'+formulario.id+'">nuestra herramienta</a> <br><br><br><br>'+
            'Atentamente: <strong> Metrolinea</strong>.',
            attachments: [{
                filename: formulario.data,
                path:  './stamp/' + formulario.data,
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
            subject: 'Estado de solicitud de certificado: Rechazado',
            html: 'Gracias por usar la herramienta de solicitudes con nosotros <strong>'+ formulario.name +'</strong>. Le informamos que su petición ha sido rechazada por la siguiente razón: <strong> '+formulario.denied+'</strong>.<br><br><br><br>'+
            'Atentamente: <strong>Metrolinea</strong>.'
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
            html: 'Hola <strong>'+ formulario.name +'</strong>. Le informamos que su petición ha sido enviada a nuestra aplicación, si quiere conocer el estado de su petición dar click a <a href="http://172.16.40.5:3900/new-details/'+formulario.id+'">el siguiente link</a><br><br><br><br>'+
            'Atentamente: <strong>Metrolinea</strong>.'
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