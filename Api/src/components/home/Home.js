import './Home.css';
import React, {Component} from 'react';
import axios from 'axios';
import Global from '../Global';

import logo from '../../assets/images/metrolinea-logo.png';
import {io} from 'socket.io-client';

class Home extends Component{

    constructor(props){
        super(props);
        this.url = Global.url; 
        this.ws = Global.ws;
        this.socket = null;
        this.state ={
            user : {
                name: '',
                email: '',
                identification: '',
                telephone: ''
            },
            stamp: null,
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
        /*this.socket.emit("set-unchecked-news",res.data.data);
        this.socket.on("get-unchecked-news", data => {
            this.setState({
                forms: data,
                status: 'success'
            })
        });*/
    }
    /*getForms = async () =>{
       await axios.get(this.url+"get-unchecked-forms")
            .then( res => {
                this.setSocket(res);
            })
    }*/
    
    redirect = (data) => {
        if( data=== 1){
            this.props.history.push('/login');
        }else{
            this.props.history.push('/form');
        }
    }
    render(){
       
        /*if(this.state.status==='succes'){
            return (
                <Redirect to="/user-home"/>
            )
        }*/
        return(
            <React.Fragment>
               <div className="container-home row h-100 align-items-center justify-content-center">
                   <div className="content-container-home">
                        <div className="row h-25 no-gutters align-items-center justify-content-center">
                            <div className="form-logo">
                                    <img className="login-logo" src={logo} alt="imagen de metrolinea"></img>
                            </div>
                        </div>
                        <div className="row h-15 no-gutters align-items-center justify-content-center">
                            <div className="col-lg-12 align-items-center justify-content-center">
                                <div className="home-title-color absolute-center">
                                    Bienvenido al Asistente
                                </div>
                            </div>
                        </div>
                        <div className="row h-15 no-gutters align-items-center justify-content-center">
                            <div className="col-lg-12 align-items-center justify-content-center">
                                <div className="home-description absolute-center">
                                    Accede para solicitar carta laboral o inicia sesión para comenzar la administracion de cartas laborales
                                </div>
                            </div>
                        </div>
                        <div className="row h-20 no-gutters align-items-center justify-content-center">
                            <div className="content admin">
                                <div className="btn-login" onClick={(()=> {this.redirect(1)})}>
                                        <div className="btn-label absolute-center">
                                            Inicia Sesión
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="row h-20 no-gutters align-items-center justify-content-center">
                            <div className="content external">  
                                <div className="btn-carta" onClick={(()=> {this.redirect(0)})}>
                                        <div className="btn-label absolute-center">
                                            Solicitar una carta laboral
                                        </div>
                                </div>
                            </div>
                        </div>
                   </div>
                  
                   
               </div>
               
            </React.Fragment>
        )
    }
}
export default Home;