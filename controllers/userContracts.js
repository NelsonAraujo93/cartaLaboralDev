'use strict'

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
        console.log(params);
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
                    console.log(result)
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
module.exports = controllerDB2;