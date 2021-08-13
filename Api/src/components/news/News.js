import './News.css';
import React, {Component} from 'react';
import Global from '../Global';
import UncheckedNews from '../uncheckedNews/UncheckedNews';
import CheckedNews from '../checkedNews/CheckedNews';
import {io} from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Badge from '@material-ui/core/Badge';
import Swal from 'sweetalert2';



class News extends Component{
 
    constructor(props){
        super(props);
        this.url = Global.url;
        this.ws = Global.ws;
        this.socket = null;
        this.state ={
            toast: null,
            uncheckedLength: '0',
            checkedAprovedLength: '0',
            checkedDeniedLength: '0',
            user: {}
        };
    }
    componentWillMount(){
        this.veryfyUserSesion();
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
        .then(res => {
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
                '<div class="bg-title-pop"><div class="list-label pop absolute-center"><p>Para acceder a esta funcionalidad debes iniciar sesión</p></div></div>',
                confirmButtonText: 'Seguir',
                allowOutsideClick: false,
                showCloseButton: true
            }).then(()=>{
                this.props.history.push('/login');
            })
        })
    }

    connectSocket = () => {
        this.socket = (io(this.ws));
        this.socket.on("get-news", data => {
            this.setState({
                toast: data
            });
            
            this.notify();
        });
    }

    changeState = (e) =>{
        
        var target = e.currentTarget;
        var activeNav =  document.querySelector('.btn-nav.active');
        var activeContainer = document.querySelector('.active.content-news');
        var unactiveContainer = document.querySelector('.inactive.content-news');
        
        if(target.classList[1]!=='active'){
            if(target.classList[0]==='btn-nav-news'){
                target.className='btn-nav-news active btn-nav';
                activeNav.className='btn-nav-checked btn-nav';
            }else{
                target.className='btn-nav-checked active btn-nav';
                activeNav.className='btn-nav-news btn-nav';
            }
            activeContainer.className='content-news inactive';
            unactiveContainer.className='content-news active';
        }
    }

    notify = () => {
        
        toast.info('🦄 Wow so easy! 2', {
            position: "bottom-right",
            autoClose: 15000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    getUncheckedLength= (data) =>{
        this.setState({
            uncheckedLength: data
        });
    }

    getCheckedLength= (data) =>{
        this.setState({
            checkedDeniedLength: data.denied.length,
            checkedAprovedLength: data.aproved.length,
        });
    }

    logOut = () =>{
        //remove tokenSesion
        localStorage.removeItem('userSesion');
         Swal.fire({
            title: '<div class="big-square"></div>'+
            '<div class="little-square"></div>'+
            '<div class="bg-title-pop"><div class="list-label pop absolute-center">Sesión cerrada</div></div>',
        }).then(()=>{
            this.props.history.push('/');
        })
        //redirectTo Home
    }
    render(){ 
        return(
            <React.Fragment>
                <div className="row align-items-center justify-content-center news-container">
                    <div className="no-gutters content-container-news">
                        <div className="header-menu">
                            <div className="btn-nav-news active btn-nav" onClick={this.changeState}>
                                <div className="btn-label absolute-center">
                                    Novedades
                                </div>
                            </div>
                            <div className="btn-nav-checked inactive btn-nav" onClick={this.changeState}>
                                <div className="btn-label absolute-center">
                                    Historial
                                
                                </div>
                            </div>
                            <div className="btn-nav-close log-out" onClick={this.logOut}>
                                <div className="btn-label absolute-center">
                                    Cerrar sesión
                                </div>
                            </div>
                        </div>
                        <div className="news-content">
                            <div className="badge-container">
                                <div className="badge-content">
                                    <div className="badge-label absolute-center">
                                        Novedades:
                                    </div>
                                    <Badge className="unchecked" color="primary" badgeContent={this.state.uncheckedLength}>
                                    </Badge>
                                </div>
                                <div className="badge-content">
                                    <div className="badge-label absolute-center">
                                        Certificadas:
                                    </div>
                                    <Badge className="aproved" badgeContent={this.state.checkedAprovedLength}>
                                    </Badge>
                                </div>
                                <div className="badge-content">
                                    <div className="badge-label absolute-center">
                                        Rechazadas:
                                    </div>
                                    <Badge className="denied" color="secondary" badgeContent={this.state.checkedDeniedLength}>
                                    </Badge>
                                </div>
                            </div>
                            <div className="unchecked-forms active content-news">
                                <UncheckedNews 
                                    forms={this.state.forms}
                                    status= {this.state.status}
                                    history={this.props.history}
                                    quantity={this.getUncheckedLength}
                                />
                            </div>
                            <div className="checked-forms inactive content-news">
                                <CheckedNews 
                                    forms={this.state.checkedForms}
                                    status= {this.state.statusChecked}
                                    history={this.props.history}
                                    quantity={this.getCheckedLength}
                                />
                            </div>
                        </div>
                        <div className="toast-container">
                            <ToastContainer
                                position="bottom-right"
                                autoClose={15000}
                                hideProgressBar={false}
                                newestOnTop
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />
                        </div>
                    </div>
                   
                    
                </div>
                
            </React.Fragment>
        )
         
    }
}
export default News;