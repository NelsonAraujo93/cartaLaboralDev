import './ToastCarta.css';
import React, {Component} from 'react';
import Global from '../Global';
import { Toast } from 'react-bootstrap';
class ToastCarta extends Component{
    /**
     *  get props from parent
     * 
     */
     constructor(props){
        super(props);
        this.url = Global.url;
        this.state ={
          toast: this.props.toast,
          show: this.props.show
        };
    }
    onClickCard = () =>{
        //this.props.clickCard(this.props.ToastCarta);
    }
    setShow = (bool) =>{
        this.setState({
            show:bool
        })
    }
    render(){
        return(
            <React.Fragment >
                <Toast onClose={() => this.setShow(false)} show={this.state.show} delay={15000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                        <strong className="mr-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
                </Toast>
            </React.Fragment>
        )
    }
}
export default ToastCarta;