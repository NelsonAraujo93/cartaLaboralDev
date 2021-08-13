import './New.css';
import React, {Component} from 'react';
import Global from '../Global';

class New extends Component{
    /**
     *  get props from parent
     * 
     */
     constructor(props){
        super(props);
        this.url = Global.url;
        this.state ={
          form: this.props.new
        };
    }
    onClickCard = () =>{
        this.props.clickCard(this.props.new);
    }
    
    render(){
        var state = null;
        var checked = true;
        
        if(this.state.form.state === 1){
            state=true;
        }else if( this.state.form.state === 0){
            state = false;
        }else{
           checked = false;
        }
        return(
            <React.Fragment >
                <div className="item-card-container">
                    <div className="item-card" onClick={this.onClickCard}>
                        <div className="state-container">
                            {
                                state && checked && 
                                <div className="label-mark certified"></div>
                            }
                            {
                                !state && checked && 
                                <div className="label-mark denied"></div>
                            }
                            {
                                !checked && 
                                <div className="label-mark unchecked"></div>
                            }
                        </div>
                    
                        <div className="item-container col-lg-auto">
                            <div className="item-data absolute-center item-dark-data">{this.state.form.name}</div>
                        </div>
                        <div className="item-container dark-item col-lg-auto">
                            <div className="item-data absolute-center">{this.state.form.identification}</div>
                        </div>
                        
                        <div className="item-container col-lg-auto">
                            {
                                this.state.form.request_type ? (
                                    <div className="item-data absolute-center">Nomina</div>
                                ):(
                                    <div className="item-data absolute-center">Contratista</div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default New;