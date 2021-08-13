'use strict';

//cargar modulos de node
const express = require('express');
const bodyParser = require('body-parser');
//const cookieparser= require ('cookie-parser');

const app = express();

//ejecutar express

//cargar las rutas
const adminRoutes = require('./routes/route');


//middlewares algo que se ejecuta antes de las rutas o las url
app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))
//app.use(cookieparser());
//CORS para permitir peticiones desde el front

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-acces-token");

    // Add this
    if (req.method === 'OPTIONS') {

        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, OPTIONS');
        res.header('Access-Control-Max-Age', 120);
        return res.status(200).json({});
    }
    next();
});

//prefijos a las rutas

//app.use('/', express.static('VagosApi',{redirect:false}));
app.use('/metrolinea', adminRoutes);

/*app.get('*', function(req,res,next){
    res.sendFile(path.resolve('VagosApi/index.html'));
})*/
//exportar el modulo (fichero actual)

module.exports = app;
