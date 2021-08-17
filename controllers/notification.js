-'use strict'

var validator = require('validator');
const fs = require('fs');
const dbConnection = require('./dbConecction');
var bcrypt = require('bcryptjs');
const { promisify } = require ('util');
const path = require ('path');

const jwt = require ('jsonwebtoken');
//const configMensaje = require('../controllers/configMensajes');

//const tournamentMensaje = require('./tournamentMensaje');



require('dotenv').config();

/*var adminModel = require('../models/admin');
const configMensaje = require('../controllers/configMensajes');*/

var controller = { 
    /**
     * Funcion name:  createAdmin
     * Funcionalidad: Guarda un usuario en la base de datos
     * 
     */
    createAdmin: async (req, res) => {
        var params = req.body;
        try {
            var validate_name= !validator.isEmpty(params.name);
            var validate_pass = !validator.isEmpty(params.pass);
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'datos imcompletos'
            });
        }

        if (validate_name && validate_pass) {
            //crear objeto
            //encrypt pass

            var user ={
                pass:params.pass,
                name: params.name,
            };
            user.pass = await bcrypt.hashSync(user.pass, 8);
            dbConnection.query("INSERT INTO login SET  ?", user ,async (err, result) => {
                if (err){
                    return res.status(404).send({
                        status: 'error',
                        message: 'on create user' + err
                    });
                }else{
                    return res.status(200).send({
                        status: 'Ok',
                        message: 'Usuario Creado',
                        data: result
                    });
                }
            });
        } else {
            return res.status(404).send({
                status: 'error',
                message: 'datos imcompletos'
            });
        }
    },
    /**
     * Funcion name:  saveUser
     * Funcionalidad: Guarda un usuario en la base de datos
     * 
     */
    createUser: async (req, res) => {
        var params = req.body;
        try {
            var validate_name= !validator.isEmpty(params.name);
            var validate_email = !validator.isEmpty(params.email);
            var validate_identification = !validator.isEmpty(params.identification);
            var validate_telephone= !validator.isEmpty(params.telephone);
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'datos imcompletos'
            });
        }

        if (validate_name && validate_email && validate_identification && validate_telephone) {
            //crear objeto
            
            //var sql = "INSERT INTO users (full_name, country_code, user_type, email, created_at) VALUES ('" + params.full_name + "', '" + params.country_code + "','" + params.user_type + "','" + params.email + "','" + created_at + "')";
            var user ={
                email:params.email,
                identification: params.identification,
                telephone: params.telephone,
                name: params.name,
            };
            dbConnection.query("INSERT INTO users SET  ?", user ,async (err, result) => {
                if (err){
                    return res.status(404).send({
                        status: 'error',
                        message: 'on create user' + err
                    });
                }else{
                    return res.status(200).send({
                        status: 'Ok',
                        message: 'Usuario Creado',
                        data: result
                    });
                }
            });
        } else {
            return res.status(404).send({
                status: 'error',
                message: 'datos imcompletos'
            });
        }
    },
    /**
     * Funcion name:  getAdminById
     * Funcionalidad: devuelve la información de un usuario
     * 
     */
    getAdminById:  async (req, res) => {
        var params = req.params;
        try {
            var validate_id = !validator.isEmpty(toString(params.id));
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'datos imcompletos' + err
            });
        }
        if (validate_id) {
            dbConnection.query("SELECT * FROM login WHERE id = ?", params.id,  async (err, result) => {
                if (err) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El usuario no ha sido encontrado' + err
                    });
                } else {
                    return res.status(200).send({
                        status: 'Ok',
                        data: result[0]
                    });
                }
            });
        }else {
            return res.status(404).send({
                status: 'error',
                mesage: 'Datos incompletos'
            });
        };
    },
    /**
     * Funcion name:  geUserById
     * Funcionalidad: devuelve la información de un usuario
     * 
     */
    getUserById:  async (req, res) => {
        var params = req.params;
        try {
            var validate_id = !validator.isEmpty(toString(params.id));
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'datos imcompletos' + err
            });
        }
        if (validate_id) {
            dbConnection.query("SELECT * FROM users WHERE id = ?", params.id,  async (err, result) => {
                if (err) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El usuario no ha sido encontrado o la contraseña es incorrecta' + err
                    });
                } else {
                    return res.status(200).send({
                        status: 'Ok',
                        message: 'Bienvenido' + result[0].name,
                        data: result[0]
                    });
                }
            });
        }else {
            return res.status(404).send({
                status: 'error',
                mesage: 'Formulario mal digilenciado'
            });
        };
    },
    /**
     * Funcion name:  createForm
     * Funcionalidad: Crea un juego en base de datos
     * 
     */
    createForm:  (req, res ) => {
        var params = req.body;
        try {
            var validate_stampId = !validator.isEmpty(toString(params.stamp_id));
            var validate_userId = !validator.isEmpty(toString(params.user_id));
            var validate_content = !validator.isEmpty(params.content);
            var validate_request = !validator.isEmpty(toString(params.request_type));
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'datos imcompletos'
            });
        }

        if (validate_stampId && validate_userId && validate_content && validate_request) {

            //crear objeto
            var form ={
                stamp_id: params.stamp_id,
                user_id:params.user_id,
                content:params.content,
                request_type:params.request_type
            };
            dbConnection.query("INSERT INTO forms SET ?", form ,(err, result) => {
                if (err){
                    return res.status(404).send({
                        status: 'error',
                        message: 'on create form' + err
                    });
                }else{
                    return res.status(200).send({
                        status: 'Ok',
                        message: 'Formulario creado',
                        data: result
                    });
                }
            });
        } else {
            return res.status(404).send({
                status: 'error',
                message: 'datos imcompletos'
            });
        }
    },

    /**
     * Funcion name:  login
     * Funcionalidad: permite iniciar sesion y crea un token
     * 
     */
     login:  async (req, res) => {
        var params = req.body;
        try {
            var validate_name = !validator.isEmpty(params.name);
            var validate_pass = !validator.isEmpty(params.pass);

        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'datos imcompletos'
            });
        }
        if (validate_name && validate_pass) {
            dbConnection.query("SELECT * FROM login WHERE name = ?", params.name,  async (err, result) => {
                if(!result){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El usuario no esta registrado'
                    });
                } else {
                    if(await bcrypt.compareSync(params.pass, result[0].pass)){
                    //if(params.pass === result[0].pass){
                        var id = result[0].id;
                    
                        this.userComplete=result[0];
                        let token = jwt.sign({id}, process.env.JWT_SECRET,{
                            expiresIn:  process.env.JWT_EXPIRES_IN
                        });
                        console.log(token.expiresIn)
                        var cookieOptions = {
                            expires: new Date(
                                Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                            ),
                            httpOnly:true
                        };
        
                        return res.status(200).send({
                            status: 'Ok',
                            message: 'Bienvenido' + result[0].name,
                            data: this.userComplete,
                            token: token,
                            expire: cookieOptions.expires 
                        });
                    }else{
                        return res.status(404).send({
                            status: 'error',
                            message: 'El usuario no ha sido encontrado o la contraseña es incorrecta'
                        });
                    }
                }
            });
        } else {
            return res.status(404).send({
                status: 'error',
                mesage: 'Formulario mal digilenciado'
            });
        };
    },
/**
     * Funcion name:  auth
     * Funcionalidad: permite iniciar sesion y crea un token
     * 
     */
     auth:  async (req, res) => {
        var token = req.headers["x-acces-token"];
        if (!token) {
            return res.status(404).send({
                status: 'error',
                message: 'PorFavor inicia sesion'
            });
        } else {
           jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
               if(err){
                    return res.status(404).send({
                        status: 'error',
                        message: err
                    });
               }else{
                    return res.status(200).send({
                        status: 'Ok',
                        message: 'usuario autenticado',
                        data: decoded
                    });
               }
           })
        }
    },
      /**
     * Funcion name:  updateForm
     * Funcionalidad: Guarda un admin en la base de datos
     * 
     */
    updateForm: (req, res) => {
        var params = req.body;
        try {
            var validate_stampId = !validator.isEmpty(toString(params.stamp_id));
            var validate_state = !validator.isEmpty(toString(params.state));
            var validate_checked = !validator.isEmpty(toString(params.checked));
            var validate_admin_id = !validator.isEmpty(toString(params.admin_id));
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'datos imcompletos'
            });
        }

        if (validate_stampId && validate_state && validate_checked && validate_admin_id) {

            //crear objeto
            var form ={
                state: params.state,
                checked: params.checked,
                admin_id: params.admin_id,
            };
            var update=[
                form,
                params.id
            ]
            dbConnection.query("UPDATE forms SET  ? where id = ?", update ,(err, result) => {
                if (err){
                    return res.status(404).send({
                        status: 'error',
                        message: 'on edit Form' + err
                    });
                }else{
                    return res.status(200).send({
                        status: 'Ok',
                        message: 'Form editado'
                    });
                }
            });
        } else {
            return res.status(404).send({
                status: 'error',
                mesage: 'datos imcompletos' + 'sec'
            });
        }

    },
      /**
     * Funcion name:  getForms
     * Funcionalidad:  Carga los formularios en base de datos
     * 
     */
    getForms:  (req, res ) => {
        dbConnection.query('SELECT forms.request_type, forms.state, forms.checked, forms.id, forms.content,users.id as user_id,users.name,users.identification,users.telephone,users.name,stamps.id as stamp_id, stamps.stamp_url FROM `forms` INNER JOIN `users` ON forms.user_id=users.id INNER JOIN `stamps` ON forms.stamp_id=stamps.id' ,(err, result) => {
            if (err){
                return res.status(404).send({
                    status: 'error',
                    message: 'on load forms' + err
                });
            }else{
                return res.status(200).send({
                    status: 'Ok',
                    message: 'Formilarios cargados',
                    data: result
                });
            }
        });
    },
     /**
     * Funcion name:  getUnchekedForms
     * Funcionalidad:  Carga los Formularios no revisados en base de datos
     * 
     */
    getUncheckedForms:  (req, res ) => {
        dbConnection.query('SELECT forms.request_type, forms.state, forms.checked, forms.id, forms.content,users.id as user_id,users.name,users.identification,users.telephone,users.name,stamps.id as stamp_id, stamps.stamp_url FROM `forms` INNER JOIN `users` ON forms.user_id=users.id INNER JOIN `stamps` ON forms.stamp_id=stamps.id WHERE forms.checked = 0' ,(err, result) => {
            if (err){
                return res.status(404).send({
                    status: 'error',
                    message: 'on load forms' + err
                });
            }else{
                return res.status(200).send({
                    status: 'Ok',
                    message: 'Formilarios cargados',
                    data: result
                });
            }
        });
    },
     /**
     * Funcion name:  getChekedForms
     * Funcionalidad:  Carga los Formularios no revisados en base de datos
     * 
     */
    getCheckedForms:  (req, res ) => {
        dbConnection.query('SELECT forms.request_type, forms.state, forms.checked, forms.id, forms.content,users.id as user_id,users.name,users.identification,users.telephone,users.email,stamps.id as stamp_id, stamps.stamp_url FROM `forms` INNER JOIN `users` ON forms.user_id=users.id INNER JOIN `stamps` ON forms.stamp_id=stamps.id WHERE forms.checked = 1' ,(err, result) => {
            if (err){
                return res.status(404).send({
                    status: 'error',
                    message: 'on load forms' + err
                });
            }else{
                return res.status(200).send({
                    status: 'Ok',
                    message: 'Formilarios cargados',
                    data: result
                });
            }
        });
    },
     /**
     * Funcion name:  loadFormById
     * Funcionalidad:  Carga los juegos en base de datos
     * 
     */
    getFormById:  (req, res ) => {
        var params= req.params;
        dbConnection.query('SELECT forms.request_type,forms.admin_id, forms.state, forms.checked, forms.id, forms.content,users.id as user_id,users.name,users.identification,users.telephone,users.email,stamps.id as stamp_id, stamps.stamp_url FROM `forms` INNER JOIN `users` ON forms.user_id=users.id INNER JOIN `stamps` ON forms.stamp_id=stamps.id where forms.id = ?', params.id ,(err, result) => {
            if (err){
                return res.status(404).send({
                    status: 'error',
                    message: 'on load form by id' + err
                });
            }else{
                return res.status(200).send({
                    status: 'Ok',
                    message: 'Formulario cargado',
                    data: result
                });
            }
        });
    },
    /**
     * Funcion name:  createStamp
     * Funcionalidad: Guarda un usuario en la base de datos
     * 
     */
     createStamp: async (req, res) => {
        var params = req.body;
        try {
            var validate_stampUrl= !validator.isEmpty(params.stamp_url);
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'datos imcompletos'
            });
        }

        if (validate_stampUrl) {
            //crear objeto
            
            //var sql = "INSERT INTO users (full_name, country_code, user_type, email, created_at) VALUES ('" + params.full_name + "', '" + params.country_code + "','" + params.user_type + "','" + params.email + "','" + created_at + "')";
            var stamp ={
                stamp_url:params.stamp_url
            };
            dbConnection.query("INSERT INTO stamps SET  ?", stamp ,async (err, result) => {
                if (err){
                    return res.status(404).send({
                        status: 'error',
                        message: 'on create stamp' + err
                    });
                }else{
                    return res.status(200).send({
                        status: 'Ok',
                        message: 'Estampilla guardada',
                        data: result
                    });
                }
            });
        } else {
            return res.status(404).send({
                status: 'error',
                message: 'datos imcompletos'
            });
        }
    },
     /**
     * Funcion name:  getStampById
     * Funcionalidad: devuelve la información de un estampilla
     * 
     */
      getStampById:  async (req, res) => {
        var params = req.params;
        try {
            var validate_id = !validator.isEmpty(toString(params.id));
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'datos imcompletos' + err
            });
        }
        if (validate_id) {
            dbConnection.query("SELECT * FROM stamps WHERE id = ?", params.id,  async (err, result) => {
                if (err) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No se ha encontrado la estampilla' + err
                    });
                } else {
                    return res.status(200).send({
                        status: 'Ok',
                        data: result[0]
                    });
                }
            });
        }else {
            return res.status(404).send({
                status: 'error',
                mesage: 'Formulario mal digilenciado'
            });
        };
    },
    /**
     * Funcion name:  uploadStamp
     * Funcionalidad: sube una reglaPDF a la carpeta
     * 
     */
    uploadStamp: (req, res) => {
        var file_name='pdf no cargada';
        var params= req.params;
       if(!req.files){
        return res.status(404).send({
            status: 'error',
            mesage: file_name,
        });
       }
       var file_path = req.files.file.path;
       console.log(req.files)
       //en servidor
       var file_name = file_path.split('/')[1];
       var file_ext = file_name.split('.')[1];
       //var file_name = file_path.split('\\')[1];
       //var file_ext = file_name.split('\.')[1];
       if(file_ext !='pdf'){
        fs.unlink(file_path,(err)=>{
            return res.status(200).send({
                status: 'error',
                mesage: 'la extension de la pdf no es valida',
            });
        });
       }else{
            return res.status(200).send({
                status: 'Ok',
                message: 'Regla subida',
                data: file_name
            });
        }
    },
    /**
     * Funcion name:  downloadStamp
     * Funcionalidad: descarga un PDF desde la carpeta
     * 
     */
    downloadStamp : (req , res) =>{
        var params = req.body;
        var url = params.stamp_url;
        var path_file = './stamp/' + url;
        fs.exists(path_file, (exists)=>{
            if(exists){
                return new Promise(function(resolve, reject) {
                    try {
                        var filestream = fs.createReadStream(path_file);
                        res.contentType("application/pdf");

                        // When the stream is done being read, end the response
                        filestream.on('close', () => {
                            res.end()
                        })

                        // Stream chunks to response
                        filestream.pipe(res);
                        //return request('http://localhost:4200').pipe(stream);
                    } catch (e) {
                        return reject(e);
                    }
                });
            }else{
                return res.status(404).send({
                    status: 'error',
                    message: "there's no pdf related" + exists
                });
            }
        })
    },
  /**
     * Funcion name:  getContractorId
     * Funcionalidad: devuelve la información de un contratista
     * 
     */
    getContractorId:  async (req, res) => {
        var params = req.params;
        try {
            var validate_id = !validator.isEmpty(toString(params.id));
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'datos imcompletos' + err
            });
        }
        if (validate_id) {
            dbConnection2.query("SELECT * FROM contractor WHERE identification = ?", params.id,  async (err, result) => {
                if (err) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El contratista no ha sido encontrado' + err
                    });
                } else {
                    return res.status(200).send({
                        status: 'Ok',
                        data: result[0]
                    });
                }
            });
        }else {
            return res.status(404).send({
                status: 'error',
                mesage: 'Datos incompletos'
            });
        };
    },
    /**
     * Funcion name:  getPayrollId
     * Funcionalidad: devuelve la información de un trabajador de nomina
     * 
     */
    getPayrollId:  async (req, res) => {
        var params = req.params;
        try {
            var validate_id = !validator.isEmpty(toString(params.id));
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'datos imcompletos' + err
            });
        }
        if (validate_id) {
            dbConnection2.query("SELECT * FROM payroll WHERE identification = ?", params.id,  async (err, result) => {
                if (err) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El trabajador de nomina no ha sido encontrado' + err
                    });
                } else {
                    return res.status(200).send({
                        status: 'Ok',
                        data: result[0]
                    });
                }
            });
        }else {
            return res.status(404).send({
                status: 'error',
                mesage: 'Datos incompletos'
            });
        };
    },
    /**
     * Funcion name:  getContractsByContractorId
     * Funcionalidad: devuelve la información de los contratos relacionados a un contratista
     * 
     */
    getContractsByContractorId:  async (req, res) => {
        var params = req.params;
        try {
            var validate_id = !validator.isEmpty(toString(params.id));
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'datos imcompletos' + err
            });
        }
        if (validate_id) {
            dbConnection2.query("SELECT * FROM contracts WHERE contractor = ?", params.id,  async (err, result) => {
                if (err) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El contratista no tiene contratos encontrados' + err
                    });
                } else {
                    return res.status(200).send({
                        status: 'Ok',
                        data: result
                    });
                }
            });
        }else {
            return res.status(404).send({
                status: 'error',
                mesage: 'Datos incompletos'
            });
        };
    },
    /**
     * Funcion name:  searchContracts
     * Funcionalidad: Busca contratos segun su año o numero de contrato
     * 
     */
     searchContracts:  async (req, res) => {
        var params = req.body;
        try {
            var validate_contractNumber = !validator.isEmpty(toString(params.contract_number));
            var validate_year = !validator.isEmpty(toString(params.year));

        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'datos imcompletos'
            });
        }
        if (validate_contractNumber && validate_year) {
            dbConnection2.query("SELECT * FROM contracts WHERE year = ? AND contract_numer = ?", [params.year, params.contract_number],  async (err, result) => {
                if(!result){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existen contratos en ese año y numero de contrato'
                    });
                } else {
                    return res.status(200).send({
                        status: 'Ok',
                        data: result
                    });
                    
                }
            });
        }else if(validate_contractNumber && !validate_year){
            dbConnection2.query("SELECT * FROM contracts WHERE contract_numer = ?", params.contract_number,  async (err, result) => {
                if(!result){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existen contratos con este numero'
                    });
                } else {
                    return res.status(200).send({
                        status: 'Ok',
                        data: result
                    });
                    
                }
            });
        }else if (!validate_contractNumber && validate_year){
            dbConnection2.query("SELECT * FROM contracts WHERE year = ?", params.year,  async (err, result) => {
                if(!result){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existen contratos en ese año'
                    });
                } else {
                    return res.status(200).send({
                        status: 'Ok',
                        data: result
                    });
                    
                }
            });
        }else {
            return res.status(404).send({
                status: 'error',
                mesage: 'Formulario mal digilenciado'
            });
        };
    },
};
module.exports = controller;