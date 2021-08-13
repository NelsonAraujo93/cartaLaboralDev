import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import Form from './components/form/Form';
import News from './components/news/News';
import NewDetails from './components/newDetails/NewDetails';
import Home from './components/home/Home';
import Login from './components/login/Login';
//importar componentes
class Router extends Component {

    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/form" component={Form} />
                    
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/news" component={News} />
                    <Route path="/new-details/:id" component={NewDetails} />
                    <Route render = {()=>(
                        <React.Fragment>
                            <h1>Pagina no encontrada</h1>
                            <NavLink to="/">Inicio</NavLink>
                        </React.Fragment>
                    )} />
                </Switch>
            </BrowserRouter>
        )
        
    }
}

export default Router;