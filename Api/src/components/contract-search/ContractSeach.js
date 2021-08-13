import './ContractSearch.css';
import React, {Component} from 'react';
import axios from 'axios';
import Global from '../Global';
import Swal from 'sweetalert2';
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import Button from 'react-bootstrap/Button'

class ContractSearch extends Component{
    contractNumberRef = React.createRef();
    contractYearRef = React.createRef();
    

    constructor(props){
        super(props);
        this.overLayRef = React.createRef();
        this.url = Global.url;
        this.relatedContracts= this.props.contractsRelated;
        this.state ={
            contratos:[],
            selectedContracts:null,
            userId: null,
            active:'item-list row no-gutters align-items-center justify-content-center',
            showDetail: false
        };
    }
    componentWillMount(){
        this.setState({
            contratos: this.relatedContracts
        });
    }
    setContractNumber = () =>{
        
        //Enviar el form
        //Cargar la lista

    }
    setInactive=()=>{
        var items = document.querySelectorAll('.item-list');
        if(items.length>=1){
            var itemsArray = Array.from(items)
            itemsArray.map((item,i)=>{
                item.className=this.state.active
            })
        }
        
    }
    selectContract= (e,data) =>{
        this.setInactive();
        var classTarget = e.currentTarget;
        classTarget.className = classTarget.className + ' active'
        this.setState({ 
            selectedContracts : data 
        });
        

    }
    validateRelation = () =>{
        
        //Validar la relacion del usuario y el usuario del contrato
    }
    addContract = () =>{
        //enviar el contrato al padre
    }
    removeContract =(data) =>{
        //add item to array
        var newContratos=this.state.contratos;
        newContratos.push(data);
        this.setState({
            contratos:newContratos
        });
    }
    showObject(event, item){ 
        this.setState({
            showDetail: true
        })
    }
    render(){
        const popover= (item) =>{
            return(
                <Popover transition={false} id="popover-basic">
                  <Popover.Title as="h3">Objeto del contrato</Popover.Title>
                  <Popover.Content>
                      {
                          item.object
                      }
                  </Popover.Content>
                </Popover>
              );
        }
        return(
            <React.Fragment>
              <div className="container-search-contract">
                    <div className="search-row row h-100 no-gutters">
                        <div className="col-lg-12 h-100">
                            {/*<div className="row h-20 no-gutters">
                                <form className="form-search" onSubmit={this.sendContractNumber}>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <div className="form-label" htmlFor="number">
                                                <div className="text absolute-center">
                                                    Numero de contrato
                                                </div>
                                            </div>
                                            <input className="form-input" type="text" name="number" ref={this.contractNumberRef}></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <div className="form-label" htmlFor="year">
                                                <div className="text absolute-center">
                                                    Año del contrato
                                                </div>
                                            </div>
                                            <input className="form-input" type="text" name="year" ref={this.contractYearRef}></input>
                                        </div>
                                    </div> 
                                </form>
        </div>*/}
                            <div className="row h-80 no-gutters">
                                {
                                    this.state.contratos.length > 0 ? (
                                        <div className="list-container-search"> 
                                            <div className="list-label">Resultado de búsqueda</div>
                                            <div className="item-list-header row no-gutters align-items-center justify-content-center">
                                                    <div className="column-container col-lg-1">
                                                        <div className="column-data absolute-center">
                                                            N°
                                                        </div>
                                                    </div>
                                                    <div className="column-container col-lg-3">
                                                        <div className="column-data absolute-center">
                                                            Año
                                                        </div>
                                                    </div>
                                                    <div className="column-container col-lg-7">
                                                        <div className="column-data  absolute-center">
                                                            Objeto
                                                        </div>
                                                    </div>
                                                </div>
                                            <div className="list">
                                                {
                                                    this.state.contratos.map(( item , i) =>{
                                                        return(
                                                            <div
                                                                className={this.state.active}
                                                                key={i}
                                                                onClick={(e)=>{this.selectContract(e,item)}}
                                                            >
                                                                <div className="column-container col-lg-1">
                                                                    <div className="column-data absolute-center">
                                                                        {item.contract_number}
                                                                    </div>
                                                                </div>
                                                                <div className="column-container col-lg-3">
                                                                    <div className="column-data absolute-center">
                                                                        {item.year}
                                                                    </div>
                                                                </div>
                                                                <div className="column-container col-lg-7">
                                                                    <div onMouseOver={(e)=>{this.showObject(e,item.object)}}>
                                                                        {
                                                                            <OverlayTrigger transition={false} ref={this.overLayRef} placement="right" overlay={popover(item)}>
                                                                                <div variant="success" className="column-data elipsis absolute-center">
                                                                                    {item.object}
                                                                                </div>
                                                                            </OverlayTrigger>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        
                                        </div>
                                    ) : (
                                        <div className="list-container-search">
                                            <div className="list-label">Resultado de búsqueda</div>
                                            <div className="list">
                                                <h2 className="absolute-center">No hay resultados</h2>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="row h-10 align-items-center justify-content-center no-gutters">
                                <div className="item-container col-lg-auto">
                                    <div  className={this.state.selectedContracts===null  ? "btn-add-contract inactive": "btn-add-contract"} onClick={()=>{
                                        let contractType='';
                                        Swal.fire({
                                            title: '<div class="big-square"></div>'+
                                            '<div class="little-square"></div>'+
                                            '<div class="bg-title-pop"><div class="list-label pop absolute-center">Elige el tipo de contrato</div></div>',
                                            denyButtonColor: '#0A9B91',
                                            confirmButtonText: 'Ejecuta',
                                            denyButtonText: 'Suscribió',
                                            allowOutsideClick: false,
                                            showDenyButton: true,

                                            showCloseButton: true
                                        })
                                        .then((result) => {
                                            if (result.isConfirmed) {
                                                contractType='Ejecuta';
                                                var newContratos=this.state.contratos;
                                                newContratos.map((response,i)=>{
                                                    if(response.id===this.state.selectedContracts.id){
                                                        newContratos.splice(i,1);
                                                        this.setState({
                                                            contratos:newContratos
                                                        });
                                                    }
                                                })
                                                this.props.add(this.state.selectedContracts,contractType);
                                                this.setState({
                                                    selectedContracts : null
                                                },this.setInactive());
                                            }else if(result.isDenied){
                                                
                                                contractType='Suscribio';
                                                var newContratos=this.state.contratos;
                                                newContratos.map((response,i)=>{
                                                    if(response.id===this.state.selectedContracts.id){
                                                        newContratos.splice(i,1);
                                                        this.setState({
                                                            contratos:newContratos
                                                        });
                                                    }
                                                })
                                                this.props.add(this.state.selectedContracts,contractType);
                                                this.setState({
                                                    selectedContracts : null
                                                },this.setInactive());
                                            }

                                        });
                                    }}>
                                        <div className="btn-label absolute-center">Agregar contrato</div>
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
export default ContractSearch;