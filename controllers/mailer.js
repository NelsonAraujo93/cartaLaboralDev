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
            clientId:'225067350835-nsvv75hr0tlh3hcsghs5pi5gtj9fr64e.apps.googleusercontent.com',
            clientSecret: 'ubvy3hLq_mN0U62m5eF7TUfJ',
            refreshToken: '1//04mdUGdOSnNQPCgYIARAAGAQSNwF-L9IrBiQ3Z3DwdHNontra8DN5GSFLRT-6WtZAnm_ndlTCk2gGmrFdgAtTDUOVGLI8PnDPqX0',
        }
    });
    if(formulario.mailState===1){
        const certificar = {
            from: 'Metrolinea' + '<estudiovagos@gmail.com>',
            to: formulario.email, // Cambia esta parte por el destinatario
            subject: 'Estado de solicitud de certificado: Aprobado',
            html: 'Gracias por usar la herramienta de solicitudes con nosotros <strong>'+ formulario.name +'</strong>. Le informamos que su petición ha sido certificada, descárguela adjunta a este correo o a través de  <a href="http://104.248.54.46:3900/new-details/'+formulario.id+'">nuestra herramienta</a> <br><br><br><br>'+
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
            html: 'Hola <strong>'+ formulario.name +'</strong>. Le informamos que su petición ha sido enviada a nuestra aplicación, si quiere conocer el estado de su petición dar click a <a href="http://104.248.54.46:3900/new-details/'+formulario.id+'">el siguiente link</a><br><br><br><br>'+
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