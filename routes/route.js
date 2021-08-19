-'use strict'

var express = require('express');
var controller = require('../controllers/notification');
var controllerDB2 = require('../controllers/userContracts');
var router = express.Router();
var multipart = require('connect-multiparty');
//var md_uploadImage = multipart({uploadDir:'./images'});
var md_uploadRule = multipart({uploadDir:'./stamp'});


//metodos get recibir

router.get('/get-forms', controller.getForms);
router.get('/get-unchecked-forms', controller.getUncheckedForms);
router.get('/get-checked-forms', controller.getCheckedForms);

router.get('/get-form/:id', controller.getFormById);
router.get('/get-user/:id', controller.getUserById);

router.get('/get-admin/:id', controller.getAdminById);
router.get('/get-stamp/:id', controller.getStampById);

router.get('/get-payroll/:id', controllerDB2.getPayrollId);
router.get('/get-dependency/:id', controllerDB2.getDependency);

router.get('/get-contractor/:id', controllerDB2.getContractorId);

router.get('/get-contracts/:id', controllerDB2.getContractsByContractorId);
router.get('/auth-user/', controller.auth);
//router.get('/profile', controller.profile);
//router.get('/load-game/:id', controller.loadGamesById);

//metodos post enviar
router.post('/create-user', controller.createUser);
router.post('/create-form', controller.createForm);
router.post('/search-contracts', controllerDB2.searchContracts);
router.post('/create-admin', controller.createAdmin);
//router.post('/upload-image/:id?/:class?/:type?',md_uploadImage,controller.uploadImage);
router.post('/upload-stamp',md_uploadRule,controller.uploadStamp);
router.post('/create-stamp',controller.createStamp);
router.post('/login', controller.login);
router.post('/download-stamp', controller.downloadStamp);
router.post('/mail', controller.formularioCorreo);

router.post('/create-payroll', controllerDB2.createPayroll);

router.post('/create-contractor', controllerDB2.createContractor);

router.post('/create-contract', controllerDB2.createContract);
//router.post('/load-products-id', controller.loadProductById);
//router.post('/formulario', controller.formularioCorreo);
//router.post('/upload-image/:id?/:class?/:type?',md_uploadImage,controller.uploadImage);

//metodos put actualizar
router.put('/update-form', controller.updateForm);

//metodos delete borrar
//router.post('/delete-game', controller.deleteGame);


module.exports = router;