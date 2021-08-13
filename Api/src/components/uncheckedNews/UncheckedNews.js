import './UncheckedNews.css';
import React, {Component} from 'react';
import Global from '../Global';
import New from '../new/New';
import axios from 'axios';
import {io} from 'socket.io-client';

class UncheckedNews extends Component{

    constructor(props){
        super(props);
        this.url = Global.url;
        this.history = this.props.history;
        this.ws = Global.ws;
        this.socket = null;
        this.state ={
          forms: {},
          status: null
        };
    }
    setQuantity = (data) =>{
        this.props.quantity(data.length);
    }
    connectSocket = () => {
        this.socket = (io(this.ws));
    }
    componentWillMount(){
        this.connectSocket();
        this.getForms();
    }
    setSocket = (res) =>{
        this.socket.emit("set-unchecked-news",res.data.data);
        this.socket.on("get-unchecked-news", data => {
            this.setState({
                forms: data,
                status: 'success'
            })
            this.setQuantity(data)
        });
        
    }
    viewDetails = (form) => {
        var url= '/new-details/'+ form.id;
        this.history.push(url);
    }
    getForms = () =>{
        axios.get(this.url+"get-unchecked-forms")
            .then( res => {
                this.setSocket(res);
            })
    }
    render(){
        if(this.state.forms.length >= 1){
            var listForms = this.state.forms.map((form, i)=>{
                return(
                    <New 
                    key={i} 
                    new={form}
                    clickCard={this.viewDetails}
                />
                )
            })
            return (
                <React.Fragment>
                    <div className="formulario absolute-center">
                        {listForms}
                    </div>
                </React.Fragment>
            )
        }else if (this.state.forms.length === 0 && this.state.status=== 'success'){
            return(
                <React.Fragment>
                    <div className="formulario absolute-center">
                        <h1 className="absolute-center"> no hay formularios pendientes</h1>
                    </div>
                </React.Fragment>
            )
        }else{
            return(
                <React.Fragment>
                    <div className="formulario absolute-center">
                        <h1 className="absolute-center"> no hay Formularios</h1>
                    </div>
                </React.Fragment>
            )
        }
    }
}
export default UncheckedNews;