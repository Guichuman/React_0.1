import React, {useState, useEffect} from 'react';
import { useParams} from 'react-router-dom';
import {initializeFirestore, addDoc, collection, query, onSnapshot, deleteDoc, doc, updateDoc, where, getDocs} from 'firebase/firestore'
import app from "../../config/firebase";
import styles from './novoCartao.css';
import Menu from "../menu";
import {Link} from 'react-router-dom';


function NovoCartao(){

  const colecaoId  = useParams()
  const dbFirestore = initializeFirestore(app, {experimentalForceLongPolling: true})
  const [collectionList, setCollectionList] = useState([])
  const [nomeCartao, setNomeCartao] = useState('');
  const [versoCartao, setVersoCartao] = useState('');
  const [msgTipo, setMsgTipo] = useState('');
  
  const adicionarCartao = async () => {
    let cartao = {
      frente: nomeCartao, 
      verso: versoCartao
    }

    const docRef = await addDoc(collection(dbFirestore, `cardCollections/${colecaoId.idColecao}/cartoes`), cartao);

    if(docRef.id) {
      console.log("Documento adicionado. ID -> " + docRef.id)
      setMsgTipo('ok')
    }else{
      setMsgTipo('erro')
    }
  }
  

    return (
      <>
        <Menu>
            <Link className="menu_div menu_li" to="/home">Minhas coleções</Link>
            <Link className="menu_div menu_li" to="/dashboard">Sair</Link>
        </Menu>
  
        <div className="corpo_cartao" style={{ marginTop : 80}}>
          <p className="cartao_pagination" style={{ marginBottom : 20}}>Preencha os dados da frente e verso do flashcard</p>
          <div className="card_container_2">
            <div className="frenteVerso">Frente</div>
              <input required value={nomeCartao} onChange={evt => {setNomeCartao(evt.target.value)}} className="inputCard"></input>
            <div className="frenteVerso">Verso</div>
              <input required value={versoCartao} onChange={evt => {setVersoCartao(evt.target.value)}} className="inputCard"></input>
          </div>
        </div>
        <div className="container_btn_virar" >
            <button type="button" onClick={() => adicionarCartao()} className="btn_cadastro_cartao" variant="success">Cadastrar</button>
        </div>
        <div className='text-center' style={{ marginTop : 20}}>
            {msgTipo === 'ok' && <span className='span_success'>Cartão cadastrado!</span>}
            {msgTipo === 'erro' && <span className='span_error'>Ocorreu algo de errado</span>}
        </div>
      </>
    );
  }

export default NovoCartao;