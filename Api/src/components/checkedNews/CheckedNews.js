import './CheckedNews.css';
import React, {Component} from 'react';
import Global from '../Global';
import New from '../new/New';
import axios from 'axios';
import {io} from 'socket.io-client';

class CheckedNews extends Component{

    constructor(props){
        super(props);
        this.url = Global.url;
        this.ws = Global.ws;
        this.socket = null;
        this.history = this.props.history;
        this.viewDetails = this.viewDetails.bind(this);
        this.state ={
          forms: {},
          status: null
        };
    }
    setQuantity = (data) =>{
        const aprovedArray = [];
        const deniedArray = [];
        data.map((d)=>{
            if(d.state === 1){
                aprovedArray.push(d)
            }else{
                deniedArray.push(d);
            }
        });
        const dataBadge={
            aproved:aprovedArray,
            denied:deniedArray
        };
        this.props.quantity(dataBadge);
    }
    componentWillMount(){
        this.connectSocket();
        this.getCheckedForms();
    }
    connectSocket = () => {
        this.socket = (io(this.ws));
    }
    setSocket = (res) =>{
        this.socket.emit("set-checked-news",res.data.data);
        this.socket.on("get-checked-news", data => {
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
    getCheckedForms = async () =>{
        await axios.get(this.url+"get-checked-forms")
            .then( res => {
                this.setSocket(res);
            });
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
                        <h1 className="absolute-center"> no hay Formularios</h1>
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
export default CheckedNews;