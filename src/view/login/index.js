import React, {useState} from 'react';
import Menu from '../menu';
import styles from './login.css';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import app from "../../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {initializeFirestore} from 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux';


function Login(){

  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const auth = getAuth();
  const [msgType, setMsgType] = useState();
  const dispatch = useDispatch();

  const dbFirestore = initializeFirestore(app, {experimentalForceLongPolling: true})

  function autenticar(){
    signInWithEmailAndPassword(auth, email, senha).then(resultado => {
      setMsgType('ok')
      dispatch({type: 'LOGIN', usuarioEmail: email})
      window.location.href = "http://localhost:3000/home"
    })
    .catch(erro => {
      setMsgType('erro')
    });
  }
  
  return (
    <>
      {
        useSelector(state => state.usuarioLogado) > 0 ? <Redirect to="/home" /> : null
      }
      <Menu>
          <Link className="menu_div" to="/cadastro">Cadastre-se</Link>
      </Menu>

      <div className="corpo">
          <div className="">
      <p>{useSelector(state => state.usuarioLogado)}</p>
      <p>{useSelector(state => state.usuarioEmail)}</p>
              <p className="mind_booster">
                  Login
              </p>
          </div>
          <div className="formulario_cadastro">
              <form>
                  <label className="label_formulario">E-mail</label>
                  <input required name="email" type="text" onChange={(evt) => setEmail(evt.target.value)} id="email" placeholder="Insira o seu e-mail"></input>
                  <label className="label_formulario">Senha</label>
                  <input required name="senha" onChange={(evt) => setSenha(evt.target.value)} type="password" id="senha" placeholder="Insira sua senha"></input>
                  <button type="button" onClick={autenticar}  className="btn_cadastro" id="btn_login">Entrar</button>
                  <div className='text-center' style={{ marginTop : 20}}>
                    {msgType === 'ok' && <span className='span_success'>Conectado com sucesso!</span>}
                    {msgType === 'erro' && <span className='span_error'>Email ou senha incorretos!</span>}

                  </div>
              </form>
          </div>
      </div>
    </>
  );
}


export default Login;


