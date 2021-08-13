import './CreatePDFPayroll.css';
import React, {Component} from 'react';
import axios from 'axios';
import Global from '../Global';
import ContractSearch from '../contract-search/ContractSeach';

//Lista de contratos
//Botón consultar contratos
//Validar si es nomina o Contratista
//Botón previsualizar
//crearPDF
//Cargar Ventana de buscar

class CreatePDFPayroll extends Component{

    observations = React.createRef();
    constructor(props){
        
        super(props);
        this.url = Global.url;
        this.dragStart = this.dragStart.bind(this);
        this.dragging = this.dragging.bind(this);
        this.dragOver = this.dragOver.bind(this);
        this.observData= this.observations;
        this.state ={
            userId: null,
        };
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
    /*addContract = (data,type) =>{
        
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
    }*/
    dragStart(e){
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
    }
    render(){
        return(
            <React.Fragment>
              <div className="content-Payroll">
                    <div className="row h-90 no-gutters align-items-center">
                        <div className="container-text-area col-lg-12 h-90">
                            <textarea className="text-area-input" type="text-area" name="content" ref={this.observations}></textarea>
                        </div>
                    </div>
                    <div className="prev-container h-10">
                        <div className="btn-prev" onClick={()=>{this.props.prev(1,this.observations);

                        }}>
                            <div className="btn-label absolute-center">Previsualizar</div>
                        </div>
                    </div>
              </div>
            </React.Fragment>
        )
    }
}
export default CreatePDFPayroll;