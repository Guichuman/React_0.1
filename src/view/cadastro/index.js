import React, {useState, useEffect} from 'react';
import Menu from '../menu';
import styles from './cadastro.css';
import { Switch, Route, Link } from 'react-router-dom';
import app from "../../config/firebase";
import {initializeFirestore, addDoc, collection, doc, updateDoc} from 'firebase/firestore'


function Cadastro(){
    

    return (
        <>
            <Menu>
                <Link className="menu_div" to="/login">Entrar</Link>
            </Menu>
            
            <div className="corpo">
                <div>
                    <p className="mind_booster" >
                        Cadastre-se
                    </p>
                </div>
                <div>
                    <p className="mind_comentario" >Com a sua conta, você poderá gerenciar suas soluções de flash cards.</p>
                </div>
                <div className="formulario_cadastro">
                    <form>
                        <label className="label_formulario">Nome</label>
                        <input type="text" required  name="nome" id="input_nome" placeholder="Insira o seu nome completo"></input>
                        <label className="label_formulario">E-mail</label>
                        <input type="email" required  name="email" id="input_email" placeholder="Insira o seu e-mail"></input>
                        <label className="label_formulario">Senha</label>
                        <input type="password" name="senha" required  id="input_senha" placeholder="Insira sua senha"></input>
                        <label className="label_formulario">Repetir a senha</label>
                        <input type="password" name="repetir_senha" placeholder="Repita sua senha"  required id="input_repetir_senha"></input>
                        <div className="span_senha card_ghost" id="span_senha">Senha não confere</div>
                        <div className="span_dados card_ghost" id="span_dados">Dados inválidos</div>
                        <Link to="/login"><button type="button"   className="btn_cadastro">Cadastrar</button></Link>
                        
                    </form>
                </div>
            </div>

        </>
    );
}


export default Cadastro;