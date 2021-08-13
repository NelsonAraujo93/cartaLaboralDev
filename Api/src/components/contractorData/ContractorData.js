import './ContractorData.css';
import React, {Component} from 'react';
import axios from 'axios';
import Global from '../Global';
import logo from '../../assets/images/metrolinea-logo.png';
import {io} from 'socket.io-client';
import Swal from 'sweetalert2';
import ContractSearch from '../contract-search/ContractSeach';

class ContractorData extends Component{
    

    constructor(props){
        super(props);
        this.url = Global.url; 
        this.ws = Global.ws;
        this.socket = null;
        this.contractorData= null;
        this.passRemove = React.createRef();
        this.state ={
            user : {
                name: '',
                pass: ''
            },
            status: null,
            contractor: {},
            relatedContracts: [],
            loadedContracts: false
        };
    }
    componentWillMount(){
        //this.veryfyUserSesion();
        this.getContractor();
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
                        title: '<div class="big-square"></div>'+
                        '<div class="little-square"></div>'+
                        '<div class="bg-title-pop"><div class="list-label pop absolute-center"><p>Para acceder a esta funcionalidad debes iniciar sesión</p></div></div>',
                        confirmButtonText: 'Seguir',
                        allowOutsideClick: false,
                        showCloseButton: true
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
                    title: '<div class="big-square"></div>'+
                    '<div class="little-square"></div>'+
                    '<div class="bg-title-pop"><div class="list-label pop absolute-center"><p>Estás ingresando como usuario externo, podrás visualizar más no editar</p></div></div>',
                    confirmButtonText: 'Seguir',
                    allowOutsideClick: false,
                    showCloseButton: true
                })
            }
        )
    }
    getContractor = () =>{
        axios.get(this.url+'get-contractor/'+this.props.contractorId)
        .then(res => {
            this.setState({
                contractor: res.data.data
            },()=>{
                this.contractorData=this.state.contractor;
            });
            axios.get(this.url+'get-contracts/'+this.state.contractor.id)
            .then(res =>{ 
                this.setState({
                    relatedContracts: res.data.data,
                    loadedContracts: true
                });
                
            })
        })
    }
    addContract = (data,type) =>{
        this.props.pdfData(data,type)
        //Validar la relacion del usuario y el usuario del contrato
    }
    removeContract = (data) =>{
        this.passRemove.current.removeContract(data);
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
                            <div className="title-label-form">Información del contratista</div>
                        </div>
                        <div className="row h-25 align-items-center">
                            <div className="item-container col-lg-12">
                                <div className="item-label">Nombre</div>
                                <div className="item-data">
                                    <div className="text-data absolute-center">
                                        {this.state.contractor.name}
                                    </div>
                                </div>
                            </div>
                            <div className="item-container col-lg-12">
                                <div className="item-label">Correo</div>
                                <div className="item-data">
                                    <div className="text-data absolute-center">
                                        {this.state.contractor.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row h-25 align-items-center">
                            <div className="item-container col-lg-12">
                                <div className="item-label">identification</div>
                                <div className="item-data">
                                    <div className="text-data absolute-center">
                                        {this.state.contractor.identification}
                                    </div>
                                </div>
                            </div>
                            <div className="item-container col-lg-12">
                                <div className="item-label">telephone</div>
                                <div className="item-data">
                                    <div className="text-data absolute-center">
                                        {this.state.contractor.telephone}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row contract-list-container no-gutters">
                    {
                        this.state.loadedContracts &&     
                            <ContractSearch
                                ref = {this.passRemove}
                                add = {this.addContract}
                                contractsRelated = {this.state.relatedContracts}
                            />  
                    }
                </div>               
            </React.Fragment>
        )
    }
}
export default ContractorData;