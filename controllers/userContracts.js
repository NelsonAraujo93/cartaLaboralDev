-'use strict'

var validator = require('validator');
const fs = require('fs');
const dbConnection2 = require('./dbConecctions');
var bcrypt = require('bcryptjs');

const jwt = require ('jsonwebtoken');
//const configMensaje = require('../controllers/configMensajes');

//const tournamentMensaje = require('./tournamentMensaje');



require('dotenv').config();

/*var adminModel = require('../models/admin');
const configMensaje = require('../controllers/configMensajes');*/

var controllerDB2 = { 
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
                if (result.length === 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El contratista no ha sido encontrado' + err
                    });
                } else {
                    return res.status(200).send({
                        status: 'Ok',
                        data: result[0],
                        message:result
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
                if (result.length === 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El Trabajador de nomina no ha sido encontrado' + err
                    });
                } else {
                    return res.status(200).send({
                        status: 'Ok',
                        data: result[0],
                        message:result
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
     * Funcion name:  getDependency
     * Funcionalidad: devuelve la información de un trabajador de nomina
     * 
     */
     getDependency:  async (req, res) => {
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
            dbConnection2.query("SELECT * FROM dependency WHERE id = ?", params.id,  async (err, result) => {
                if (result.length === 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'La dependencia no ha sido encontrada' + err
                    });
                } else {
                    return res.status(200).send({
                        status: 'Ok',
                        data: result[0],
                        message:result
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
    /**
     * Funcion name:  createContractor
     * Funcionalidad: Crea un Contratista en base de datos
     * 
     */
     createContractor:  (req, res ) => {
        var params = req.body;
        try {
            var validate_identification = !validator.isEmpty(toString(params.identification));
            var validate_name = !validator.isEmpty(params.name);
            var validate_document = !validator.isEmpty(toString(params.document_type));
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: err
            });
        }

        if (validate_identification && validate_name && validate_document) {

            //crear objeto
            var contractor ={
                identification:params.identification,
                name:params.name,
                document_type:params.document_type
            };
            dbConnection.query("INSERT INTO contractor SET ?", contractor ,(err, result) => {
                if (err){
                    return res.status(404).send({
                        status: 'error',
                        message: 'on create contractor' + err
                    });
                }else{
                    return res.status(200).send({
                        status: 'Ok',
                        message: 'contractor creado',
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
     * Funcion name:  createContract
     * Funcionalidad: Crea un Contratista en base de datos
     * 
     */
     createContract:  (req, res ) => {
        var params = req.body;
        try {
            var validate_year = !validator.isEmpty(toString(params.year));
            var validate_contractNumber = !validator.isEmpty(toString(params.contract_number));
            var validate_date = !validator.isEmpty(params.date);
            var validate_object = !validator.isEmpty(params.object);
            var validate_execution_time = !validator.isEmpty(params.execution_time);
            var validate_value = !validator.isEmpty(params.value);
            var validate_value_string = !validator.isEmpty(params.value_string);
            var validate_initial_date = !validator.isEmpty(params.initial_date);
            var validate_finish_date = !validator.isEmpty(params.finish_date);
            var validate_state = !validator.isEmpty(params.state);
            var validate_contractor = !validator.isEmpty(toString(params.contractor));
            var validate_contractor_type = !validator.isEmpty(toString(params.contractor_type));
            var validate_supervisor = !validator.isEmpty(toString(params.supervisor));
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'datos imcompletos'
            });
        }

        if (validate_year && validate_contractNumber  && validate_contractor) {

            //crear objeto
            var contract ={
                year:params.year,
                contract_number:params.contract_number,
                date:params.date,
                execution_time:params.execution_time,
                object:params.object,
                value:params.value ,
                value_string:params.value_string,
                initial_date:params.initial_date,
                finish_date:params.finish_date,
                state:params.state,
                contractor:params.contractor,
                contractor_type:params.contractor_type,
                supervisor: params.supervisor
            };
            dbConnection.query("INSERT INTO contracts SET ?", contract ,(err, result) => {
                if (err){
                    return res.status(404).send({
                        status: 'error',
                        message: 'on create contract' + err
                    });
                }else{
                    return res.status(200).send({
                        status: 'Ok',
                        message: 'contractor creado',
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
     * Funcion name:  createPayroll
     * Funcionalidad: Crea un Trabajador de Nomina en base de datos
     * 
     */
      createPayroll:  (req, res ) => {
        var params = req.body;
        try {
            var validate_identification = !validator.isEmpty(toString(params.identification));
            var validate_document_type = !validator.isEmpty(toString(params.document_type));
            var validate_name = !validator.isEmpty(params.name);
            var validate_first_surname = !validator.isEmpty(params.first_surname);
            var validate_second_surname = !validator.isEmpty(params.second_surname);
            var validate_expedition_place = !validator.isEmpty(params.expedition_place);
            var validate_state = !validator.isEmpty(params.state);
            var validate_admission_date = !validator.isEmpty(params.admission_date);
            var validate_retirement_date = !validator.isEmpty(params.retirement_date);
            var validate_contract_type = !validator.isEmpty(params.contract_type);
            var validate_job_title = !validator.isEmpty(toString(params.job_title));
            var validate_salary = !validator.isEmpty(toString(params.salary));
            var validate_dependency = !validator.isEmpty(toString(params.dependency));
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'datos imcompletos'
            });
        }

        if (validate_year && validate_contractNumber  && validate_contractor) {

            //crear objeto
            var payroll ={
                identification:params.identification,
                document_type:params.document_type,
                name:params.name,
                first_surname:params.first_surname,
                second_surname:params.second_surname,
                expedition_place:params.expedition_place ,
                state:params.state,
                admission_date:params.admission_date,
                retirement_date:params.retirement_date,
                contract_type:params.contract_type,
                job_title:params.job_title,
                salary:params.salary,
                dependency: params.dependency
            };
            dbConnection.query("INSERT INTO payroll SET ?", payroll ,(err, result) => {
                if (err){
                    return res.status(404).send({
                        status: 'error',
                        message: 'on create contract' + err
                    });
                }else{
                    return res.status(200).send({
                        status: 'Ok',
                        message: 'contractor creado',
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

};
module.exports = controllerDB2;