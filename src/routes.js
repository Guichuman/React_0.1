import React from "react";
import { Switch, Route } from "react-router-dom";
import Menu from "./view/menu/index";
import Login from "./view/login/index";
import Dashboard from "./view/dashboard/dashboard";
import Cadastro from "./view/cadastro";
import Home from "./view/_home"
import NovaColecao from "./view/novaColecao";
import EditarColecao from "./view/editarColecao";
import Jogar from "./view/jogar";
import NovoCartao from "./view/novoCartao"
import EditarCartao from "./view/editarCartao";
import Cartoes from "./view/cartoes";
import { Provider } from "react-redux";
import { store, persistor } from "../src/store";
import { PersistGate } from "redux-persist/integration/react";

const Routes = () => (
    <Provider store={ store }>
            <Switch>
                <Route path="/dashboard" exact component={Dashboard}/> 
                <Route path="/login"  component={Login}/>
                <Route path="/cadastro" component={Cadastro}/>
                <Route path="/home" component={Home}/>
                <Route path="/novaColecao"  component={NovaColecao}/>
                <Route path="/editarColecao/:idColecao"  component={EditarColecao}/>
                <Route path="/jogar/:idColecao" component={Jogar}/>
                <Route path="/novoCartao/:idColecao"  component={NovoCartao}/>
                <Route path="/editarCartao/:idColecao/:idCartao"  component={EditarCartao}/>
                <Route path="/cartoes/:idColecao"  component={Cartoes}/>
            </Switch>
    </Provider>
)


export default Routes;