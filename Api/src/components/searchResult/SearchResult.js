import './SearchResult.css';
import React, {Component} from 'react';
import axios from 'axios';
import Global from '../Global';
import New from '../new/New';
import {Redirect} from 'react-router-dom';

class News extends Component{

    constructor(props){
        super(props);
        this.url = Global.url;
        this.state ={
          forms: [],
          status: null
        };
    }
    componentWillMount(){
        this.getForms();
    }
    viewDetails = (form) => {
        var url= '/new-details/'+ form.id;
        this.props.history.push(url);
    }
    getForms = () =>{
        axios.get(this.url+"get-forms")
            .then( res => {
                this.setState({
                    forms: res.data.data,
                    status: 'success'
                })
            });
        setTimeout(() => {
            console.log(this.state.forms)
           
        }, 100);
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
                <h1> no hay Formularios</h1>
                </React.Fragment>
            )
        }else{
            return(
                <React.Fragment>
                    <h1> Cargando espera mientras carga</h1>
                </React.Fragment>
            )
        }
    }
}
export default News;