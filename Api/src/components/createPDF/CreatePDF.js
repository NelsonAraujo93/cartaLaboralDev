import './CreatePDF.css';
import React, {Component} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Global from '../Global';
import ContractSearch from '../contract-search/ContractSeach';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { BiEditAlt, BiTrash } from "react-icons/bi";
//Lista de contratos
//Botón consultar contratos
//Validar si es nomina o Contratista
//Botón previsualizar
//crearPDF
//Cargar Ventana de buscar

class CreatePDF extends Component{
    contractNumberRef = React.createRef();
    contractYearRef = React.createRef();

    constructor(props){
        super(props);
        this.url = Global.url;
        
        this.contratosSuscritos=[];
        this.contratosEjecuta=[];
        this.state ={
            contratos: {
                ejecuta: [],
                suscribio:[]
            },
            selectedContracts:[],
            userId: null,
            addContract: false,
            diffx: 0,
            diffy: 0,
            draggingState: false,
            styles: {
                left: 50,
                top: 50
            },
            stylesWindow: {
            },
            arrivalData : {},
            showDetail: false
        };
    }
    componentWillMount(){
        this.setState({
            arrivalData: this.props.contractData
        });
    }
    setContractNumber = () =>{
        
        //Enviar el form
        //Cargar la lista

    }
    closeAddContract= () =>{
        
        this.setState({
            addContract: false
        })
    }
    addContract = (data,type) =>{
        var contratos = {
            ejecuta:this.contratosEjecuta,
            suscribio:this.contratosSuscritos
        }
        if(type==='Suscribio'){
            
            this.contratosSuscritos.push(data);
            this.setState({
                contratos: contratos
            })
        }else{
            this.contratosEjecuta.push(data);
            this.setState({
                contratos: contratos
            })
        }
        //Validar la relacion del usuario y el usuario del contrato
    }
    removeContract = (data,type) => {
        var newContratos=this.state.contratos;
        if(type===0){
            newContratos.ejecuta.map((response,i)=>{
                if(response.id===data.id){
                    newContratos.ejecuta.splice(i,1);
                    this.setState({
                        contratos:newContratos
                    });
                }
            })
            this.props.remove(data)
        }else{
            newContratos.suscribio.map((response,i)=>{
                if(response.id===data.id){
                    newContratos.suscribio.splice(i,1);
                    this.setState({
                        contratos:newContratos
                    });
                }
            })
            this.props.remove(data)
        }
    }
    addDetail = (data,val, type) => {
        
        var newContratos=this.state.contratos;
        if(type){
            newContratos.suscribio.map((contract,i)=>{
                if(contract.id===data.id){
                    contract.details = val;
                    this.setState({
                        contratos:newContratos
                    });
                }
            })
        }else{
            newContratos.ejecuta.map((contract,i)=>{
                if(contract.id===data.id){
                    contract.details = val;
                    this.setState({
                        contratos:newContratos
                    });
                }
            })
        }
        
    }
    showObject(event, item){ 
        this.setState({
            showDetail: true
        })
    }
    /*dragStart(e){
        this.setState({
            diffx: e.screenX - e.currentTarget.getBoundingClientRect().left,
            diffy: e.screenY - e.currentTarget.getBoundingClientRect().top,
            draggingState: true
        })
    }
    dragOver(){
        this.setState({
            draggingState: false
        })
    }
    dragging(e){
        if(this.state.draggingState){
            var lefty = e.screenX - this.state.diffx;
            var topy = e.screenY - this.state.diffy;
            var style = {
                left: lefty,
                top: topy
            }
            this.setState({
                styles: style
            })
            console.log(style)
        } 
    }
    openDragWindow= (e) =>{

        this.setState({
            addContract:true
        })
    }*/
    render(){
        const tooltip= (text) =>{
            return(
                <Tooltip id="button-tooltip">
                    {text}
                </Tooltip>
              );
        }
        return(
            <React.Fragment>
              <div className="content-createPDF">
                    <div className="row h-90 no-gutters">
                        <div className="col-lg-12 h-100">
                            <div className="row h-50 no-gutters">
                                {
                                    this.state.contratos.ejecuta.length > 0 ? (
                                        <div className="list-container ejecuta-list">
                                            <div className="list-label">Ejecuta</div>
                                            <div className="list">
                                                {
                                                    this.state.contratos.ejecuta.map(( item , i) =>{
                                                        return(
                                                            <div
                                                                className='item-list-added row no-gutters align-items-center justify-content-center'
                                                                key={i}
                                                            >
                                                                <div className="colum-container col-lg-1">
                                                                    <div className="column-data absolute-center">
                                                                        {item.contract_number}
                                                                    </div>
                                                                </div>
                                                                <div className="colum-container col-lg-2">
                                                                    <div className="column-data absolute-center">
                                                                        {item.year}
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="colum-container col-lg-6">
                                                                    <div className="column-data elipsis absolute-center">
                                                                        {item.object}
                                                                    </div>
                                                                </div>
                                                                {
                                                                    <OverlayTrigger transition={false}  placement="bottom" overlay={tooltip('Agregar detalle')}>
                                                                        
                                                                        <div className="colum-container col-lg-1">
                                                                            <div variant="success" className="column-data absolute-center">
                                                                                
                                                                                <Button variant="edit" onClick={()=> {
                                                                                    Swal.fire({
                                                                                        title: '<div class="big-square"></div>'+
                                                                                        '<div class="little-square"></div>'+
                                                                                        '<div class="bg-title-lit"><div class="list-label pop absolute-center">Agregar detalle</div></div>'+
                                                                                        '<textarea id=input-detail></textarea>',
                                                                                        denyButtonColor: '#0A9B91',
                                                                                        confirmButtonText: 'Listo',
                                                                                        allowOutsideClick: false,
                                                                                        showCloseButton: true
                                                                                    }).then((result) => {
                                                                                        if (result.isConfirmed) {
                                                                                            var val = document.getElementById('input-detail').value;
                                                                                            this.addDetail(item, val , 0)
                                                                                        }
                                                                                    });
                                                                                    }
                                                                                }>
                                                                                    <BiEditAlt className="no-events absolute-center"/>
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </OverlayTrigger>
                                                                }
                                                                {
                                                                    <OverlayTrigger transition={false}  placement="bottom" overlay={tooltip('Remover')}>
                                                                        
                                                                        <div className="colum-container col-lg-1">
                                                                            <div variant="success" className="column-data absolute-center">
                                                                                <Button variant="danger" onClick={()=> this.removeContract(item,0)}>
                                                                                
                                                                                    <BiTrash className="no-events absolute-center"/>
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </OverlayTrigger>
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="list-container ejecuta-list">
                                            <div className="list-label">Ejecuta</div>
                                            <div className="list">
                                                <h2 className="list-label absolute-center">No hay resultados</h2>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="row h-50 no-gutters">
                                {
                                    this.state.contratos.suscribio.length > 0 ? (
                                        <div className="list-container suscribio-list">
                                            
                                            <div className="list-label">Suscribió</div>
                                            <div className="list">
                                                {
                                                    this.state.contratos.suscribio.map(( item , i) =>{
                                                        return(
                                                            <div
                                                                className='item-list-added row no-gutters align-items-center justify-content-center'
                                                                key={i}
                                                            >
                                                                <div className="colum-container col-lg-1">
                                                                    <div className="column-data absolute-center">
                                                                        {item.contract_number}
                                                                    </div>
                                                                </div>
                                                                <div className="colum-container col-lg-2">
                                                                    <div className="column-data absolute-center">
                                                                        {item.year}
                                                                    </div>
                                                                </div>
                                                                <div className="colum-container col-lg-5">
                                                                    <div className="column-data elipsis absolute-center">
                                                                        {item.object}
                                                                    </div>
                                                                </div>
                                                                <div className="colum-container col-lg-1">
                                                                    <div className="column-data absolute-center">
                                                                        <Button variant="edit" onClick={()=> {
                                                                                    Swal.fire({
                                                                                        title: '<div class="big-square"></div>'+
                                                                                        '<div class="little-square"></div>'+
                                                                                        '<div class="bg-title-lit"><div class="list-label pop absolute-center">Agregar detalle</div></div>'+
                                                                                        '<textarea id=input-detail></textarea>',
                                                                                        denyButtonColor: '#0A9B91',
                                                                                        confirmButtonText: 'Listo',
                                                                                        allowOutsideClick: false,
                                                                                        showCloseButton: true
                                                                                    }).then((result) => {
                                                                                        if (result.isConfirmed) {
                                                                                            var val = document.getElementById('input-detail').value;
                                                                                            this.addDetail(item, val , 1)
                                                                                        }
                                                                                    });
                                                                                    }
                                                                                }>
                                                                                <BiEditAlt className="no-events absolute-center"/>
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                                <div className="colum-container col-lg-1">
                                                                    <div className="column-data absolute-center">
                                                                        <Button variant="danger" onClick={()=>this.removeContract(item,1)}>
                                                                            <BiTrash  className="absolute-center"/>
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            
                                        </div>
                                    ) : (
                                        <div className="list-container suscribio-list">
                                            <div className="list-label">Suscribió</div>
                                            <div className="list">
                                                <h2 className="list-label absolute-center">No hay resultados</h2>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
              
                    <div className="prev-container h-10">
                        <div className="btn-prev" onClick={()=>{this.props.prev(0)}}>
                            <div className="btn-label absolute-center">Previsualizar</div>
                        </div>
                    </div>
              </div>
               {
                  /* this.state.addContract &&
                        <div className="draggable-window" style={this.state.stylesWindow}>
                            <div className="draggable-modal" style={this.state.styles} onMouseDown={this.dragStart} onMouseMove={this.dragging} onMouseUp={this.dragOver}>
                                <ContractSearch
                                    close = {this.closeAddContract}
                                    add = {this.addContract}
                                />
                            </div>
                        </div>*/
               }
            </React.Fragment>
        )
    }
}
export default CreatePDF;