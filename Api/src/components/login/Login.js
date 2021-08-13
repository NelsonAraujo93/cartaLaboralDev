import './Login.css';
import React, {Component} from 'react';
import axios from 'axios';
import Global from '../Global';
import logo from '../../assets/images/metrolinea-logo.png';
import {io} from 'socket.io-client';
import Swal from 'sweetalert2';

class Login extends Component{
    
    userNameRef = React.createRef();
    userPassRef = React.createRef();

    constructor(props){
        super(props);
        this.url = Global.url; 
        this.ws = Global.ws;
        this.socket = null;
        this.state ={
            user : {
                name: '',
                pass: ''
            },
            status: null
        };
    }
    componentWillMount(){
        this.connectSocket();
    }
    connectSocket = () =>{
        this.socket = (io(this.ws));
    }
    setSocket = (res) =>{
        this.socket.emit("set-unchecked-news",res.data.data);
        this.socket.on("get-unchecked-news", data => {
            this.setState({
                forms: data,
                status: 'success'
            })
        });
    }
    isLogged = () =>{

    }
    login =  () =>{
        axios.get(this.url+"get-unchecked-forms")
            .then( res => {
                this.setSocket(res);
            })
    }
    saveForm =  async (e) =>{
        e.preventDefault();
        var userData = {
            name : this.userNameRef.current.value,
            pass : this.userPassRef.current.value
        }
        this.setState({
           user : userData
        })
        await axios.post(this.url+'login', userData)
            .then( res =>{
                if(res){
                    
                    //Crear Sesion User
                    Swal.fire({
                        title: '<div class="big-square"></div>'+
                        '<div class="little-square"></div>'+
                        '<div class="bg-title-pop"><div class="list-label pop absolute-center"><p>Bienvenido</p></div></div>',
                        confirmButtonText: 'Seguir',
                        allowOutsideClick: false,
                        showCloseButton: true}
                    ).then(()=>{
                        localStorage.setItem('userSesion', res.data.token);
                        this.props.history.push('/news');
                    })
                }else{
                    this.setState({
                        status:'failed'
                    })
                }
            }, error =>{
                 Swal.fire({
                    title:'Usuario o contraseña incorrectos',
                    icon: 'error',
                })
            })
        
    }

    render(){
       
        /*if(this.state.status==='succes'){
            return (
                <Redirect to="/user-home"/>
            )
        }*/
        return(
            <React.Fragment>
                <div className="row h-100 content-login no-gutters justify-content-center align-items-center">
                    <div className="form-content-container row justify-content-center align-items-center">
                        <form className="form" onSubmit={this.saveForm}>
                            <div className="form-group row h-30 justify-content-center align-items-center">
                                <div className="form-logo">
                                    <img className="login-logo" src={logo} alt="imagen de metrolinea"></img>
                                </div>
                            </div>
                            <div className="form-group  row h-20 justify-content-center align-items-center">
                                <div className="form-label col-lg-12" htmlFor="nombre">
                                    <div className="text absolute-center">
                                        Nombre de usuario
                                    </div>
                                </div>
                                <input className="form-input col-lg-12" type="text" name="nombre" ref={this.userNameRef}></input>
                            </div>
                            <div className="form-group  row h-20 justify-content-center align-items-center">
                                <div className="form-label col-lg-12" htmlFor="pass">
                                    <div className="text absolute-center">
                                        Contraseña
                                    </div>
                                </div>
                                <input className="form-input col-lg-12" type="password" name="pass" ref={this.userPassRef}></input>
                            </div>
                            <div className="row h-30 justify-content-center align-items-center">
                                <input type="submit" value="Entrar"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Login;