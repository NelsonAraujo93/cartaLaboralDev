import './PayrollData.css';
import React, {Component} from 'react';
import axios from 'axios';
import Global from '../Global';
import logo from '../../assets/images/metrolinea-logo.png';
import {io} from 'socket.io-client';
import Swal from 'sweetalert2';

class PayrollData extends Component{
    

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
            status: null,
            payroll: {},
            dependencia:''
        };
    }
    componentWillMount(){
        //this.veryfyUserSesion();
        
        this.getPayroll();
    }
    connectSocket = () =>{
        this.socket = (io(this.ws));
    }
    getUser = (id) => {
        axios.get(this.url+'get-admin/'+id)
        .then(res => {
            this.setState({
                user: res.data.data
            });
        })
    }

    veryfyUserSesion = () =>{
        const sesionToken = localStorage.getItem('userSesion');
        axios.get(this.url+'auth-user', {
            headers:{
                'x-acces-token':sesionToken
            }
        })
        .then(
            res => {
                if(res.data.status !== 'Ok'){
                    Swal.fire({
                        title:'Para acceder a esta funcionalidad debes iniciar sesión',
                        icon: 'info',
                    }).then(()=>{
                        this.props.history.push('/login');
                    })
                }else{
                    this.getUser(res.data.data.id);
                    this.connectSocket();
                }
            },
            error =>{
                Swal.fire({
                        title:'Estás ingresando como usuario externo, podrás visualizar más no editar',
                        icon: 'info',
                })
            }
        )
    }
    getPayroll = () =>{
        axios.get(this.url+'get-payroll/'+this.props.payrollId)
        .then(res => {
            this.setState({
                payroll: res.data.data
            });
            axios.get(this.url+'get-dependency/'+this.state.payroll.dependency)
            .then(res =>{ 
                this.setState({
                    dependencia: res.data.data.name
                });
                
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
                <div className="row content-user-data no-gutters">
                    <div className="col-lg-12 h-100">
                        
                        <div className="row h-10 align-items-center justify-content-center">
                            <div className="title-label-form">Información nomina</div>
                        </div>
                        <div className="row h-60 align-items-center">
                            <div className="item-container col-lg-12">
                                <div className="item-label">Nombre</div>
                                <div className="item-data">
                                    <div className="text-data absolute-center">
                                        {this.state.payroll.name}
                                    </div>
                                </div>
                            </div>
                            <div className="item-container col-lg-12">
                                <div className="item-label">Apellido</div>
                                <div className="item-data">
                                    <div className="text-data absolute-center">
                                        {this.state.payroll.first_surname}{' '}{this.state.payroll.second_surname}
                                    </div>
                                </div>
                            </div>
                            <div className="item-container col-lg-12">
                                <div className="item-label">identification</div>
                                <div className="item-data">
                                    <div className="text-data absolute-center">
                                        {this.state.payroll.identification}
                                    </div>
                                </div>
                            </div>
                            <div className="item-container col-lg-12">
                                <div className="item-label">Expedicion</div>
                                <div className="item-data">
                                    <div className="text-data absolute-center">
                                        {this.state.payroll.expedition_place}
                                    </div>
                                </div>
                            </div>
                            <div className="item-container col-lg-12">
                                <div className="item-label">Salario</div>
                                <div className="item-data">
                                    <div className="text-data absolute-center">
                                        {this.state.payroll.salary}
                                    </div>
                                </div>
                            </div>
                            <div className="item-container col-lg-12">
                                <div className="item-label">Dependencia</div>
                                <div className="item-data">
                                    <div className="text-data absolute-center">
                                        {this.state.dependencia}
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
export default PayrollData;