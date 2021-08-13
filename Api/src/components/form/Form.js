import './Form.css';
import React, {Component} from 'react';
import axios from 'axios';
import Global from '../Global';
import {Redirect} from 'react-router-dom';
import logo from '../../assets/images/metrolinea-logo.png';
import {io} from 'socket.io-client';
import InputGroup from 'react-bootstrap/InputGroup'
import Swal from 'sweetalert2';

class Form extends Component{
    
    userNameRef = React.createRef();
    userMailRef = React.createRef();
    userIdentificationRef = React.createRef();
    userTelephoneRef = React.createRef();
    userUrlStampRef = React.createRef();
    userContentRef = React.createRef();
    payroll = React.createRef();
    contractor = React.createRef();

    constructor(props){
        super(props);
        this.url = Global.url; 
        this.ws = Global.ws;
        this.socket = null;
        this.mailForm= {};
        this.state ={
            user : {
                name: '',
                email: '',
                identification: '',
                telephone: ''
            },
            stamp: null,
            form:{
                content:'',
                stamp_id:0,
                user_id:0
            },
            status: null,
            payroll: false,
            contract: false
        };
    }
    componentWillMount(){
        this.connectSocket();
    }
    fileChange =(e) =>{
        debugger;
        var stampData = {
            stamp_url: e.target.files[0]
        }
        var object = new FormData();
        object.append('file',stampData.stamp_url)

        this.setState({
            stamp : object
        })
    }
    connectSocket = () =>{
        this.socket = (io(this.ws));
    }
    setSocket = (res) =>{
        //emit toast
        this.socket.emit("set-unchecked-news",res.data.data);
        this.socket.on("get-unchecked-news", data => {
            this.setState({
                forms: data,
                status: 'success'
            })
        });
    }
    getForms = async () =>{
       await axios.get(this.url+"get-unchecked-forms")
            .then( res => {
                this.setSocket(res);
            })
    }
    sendForm = (e) =>{
        e.preventDefault();
        var userData = {
            name : this.userNameRef.current.value,
            email : this.userMailRef.current.value,
            identification : this.userIdentificationRef.current.value,
            telephone : this.userTelephoneRef.current.value
        }
        this.setState({
           user : userData
        })
    }
    saveForm = async (e) =>{
        e.preventDefault();
        var userData = {
            name : this.userNameRef.current.value,
            email : this.userMailRef.current.value,
            identification : this.userIdentificationRef.current.value,
            telephone : this.userTelephoneRef.current.value
        }
        this.setState({
           user : userData
        })
        var formData = {
            content: this.userContentRef.current.value,
            user_id: 0,
            stamp_id: 0,
            request_type: this.payroll.current.checked ? 1 : 0
        }
        await axios.post(this.url+'create-user',this.state.user)
            .then( res =>{
                if(res){
                    formData.user_id = res.data.data.insertId;
                    axios.post(this.url+'upload-stamp',this.state.stamp)
                    .then( async res =>{
                        if(res){
                            var stamp={
                                stamp_url : res.data.data
                            }
                            await axios.post(this.url+'create-stamp',stamp)
                            .then( async res =>{
                                if(res){
                                    formData.stamp_id = res.data.data.insertId;
                                    this.setState({
                                        form : formData
                                    })
                                    await axios.post(this.url+'create-form', this.state.form)
                                    .then( res =>{
                                        if(res){
                                            this.getForms();
                                            this.socket.emit('new-form',this.state.form);
                                            this.setState({
                                                status:'succes'
                                            })
                                            Swal.fire({
                                                title: '<div class="big-square"></div>'+
                                                '<div class="little-square"></div>'+
                                                '<div class="bg-title-pop"><div class="list-label pop absolute-center">Formulario diligenciado correctamente, recibiras un correo con más información sobre tu petición</div></div>',
                                                confirmButtonText: 'Seguir',
                                                allowOutsideClick: false,
                                                showCloseButton: true
                                            }).then(()=>{
                                                debugger
                                                this.mailForm.email=this.state.user.email;
                                                this.mailForm.name=this.state.user.name;
                                                this.mailForm.mailState=2;
                                                this.mailForm.id=res.data.data.insertId;
                                                axios.post(this.url+"mail",this.mailForm)
                                                .then( res => {
                                                    this.props.history.push('/');
                                                });
                                            })
                                        }else{
                                            this.setState({
                                                status:'failed'
                                            })
                                        }
                                    })
                                }else{
                                    this.setState({
                                        status:'failed'
                                    })
                                }
                            })
                        }else{
                            this.setState({
                                status:'failed'
                            })
                        }
                    })
                }else{
                    this.setState({
                        status:'failed'
                    })
                }
            })
        
    }
    selectContractOrPayroll = (data) =>{
        
       
    }
    render(){
       
        /*if(this.state.status==='succes'){
            return (
                <Redirect to="/user-home"/>
            )
        }*/
        return(
            <React.Fragment>
                <div className="form-content-container-main">
                    <form className="form-main" onSubmit={this.saveForm} onChange={this.sendForm}>
                        <div className="form-group">
                            <div className="form-logo">
                                <img className="login-logo" src={logo} alt="imagen de metrolinea"></img>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-label" htmlFor="nombre">
                                <div className="text absolute-center">
                                    Nombre del solicitante
                                </div>
                            </div>
                            <input className="form-input" type="text" name="nombre" ref={this.userNameRef}></input>
                        </div>
                        <div className="form-group">
                            <div className="form-label" htmlFor="mail">
                                <div className="text absolute-center">
                                    Correo
                                </div>
                            </div>
                            <input className="form-input" type="text" name="mail" ref={this.userMailRef}></input>
                        </div>
                        <div className="form-group">
                            <div className="form-label" htmlFor="identification">
                                <div className="text absolute-center">
                                    Identificación
                                </div>
                            </div>
                            <input className="form-input" type="identification" name="identification" ref={this.userIdentificationRef}></input>
                        </div>
                        <div className="form-group">
                            <div className="form-label" htmlFor="telephone">
                                <div className="text absolute-center">
                                    Telefono
                                </div>
                            </div>
                            <input className="form-input" type="telephone" name="telephone" ref={this.userTelephoneRef}></input>
                        </div>
                        <div className="form-group form-text-area">
                            <div className="form-label" htmlFor="content">
                                <div className="text absolute-center">
                                    Descripción de la solicitud
                                </div>
                            </div>
                            <textarea className="text-area-input" type="text-area" name="content" ref={this.userContentRef}></textarea>
                        </div>
                        <div className="form-group">
                            <div className="form-label" htmlFor="fiel0">
                                <div className="text absolute-center">
                                    Adjuntar estampilla
                                </div>
                            </div>
                            <input id="archivo" className="form-input-file" type="file" name="file0" ref={this.userUrlStampRef} onChange={this.fileChange}>
                                
                            </input>
                            <label className="file-input" htmlFor="archivo">
                                    Examinar
                            </label>
                            <div className="form-label">
                                <div className="text link absolute-center">
                                    Recuerda descargar tu estampilla primero <a href="https://estampillas.syc.com.co/"  target="_blank">¡Click Aquí!</a>
                                </div>
                            </div>
                        </div>
                        <div className="form-group-radio">
                            <div className="form-label" htmlFor="requestType">
                                <div className="text-radio-label absolute-center">
                                    Tipo de petición:
                                </div>
                            </div>
                            <div className="row no-gutters select-type align-items-center justify-content-center">
                                <div className="col-lg-12 radio-input">
                                    <label className="container-radio">
                                        Carta laboral nómina
                                        <input type="radio" className="form-input-check"  checked name="requestType" ref={this.payroll} onChange={(event)=>{event.preventDefault();this.payroll.current.checked =  event.currentTarget.value ==='on' ? true: false}}></input>
                                        <span className="checkmark"></span>
                                    </label>     
                                </div>
                                <div className="col-lg-12 radio-input">    
                                    <label className="container-radio">
                                        Carta laboral contratista
                                        <input type="radio" className="form-input-check"  name="requestType" ref={this.contractor} onChange={(event)=>{event.preventDefault(); this.contractor.current.checked= event.currentTarget.value ==='on' ? true: false}}></input>
                                        <span className="checkmark"></span>
                                    </label>
                                </div>   
                            </div>
                            
                            
                        </div>
                        
                        <input type="submit" value="Enviar"></input>
                    </form>
                </div>
               
               
            </React.Fragment>
        )
    }
}
export default Form;