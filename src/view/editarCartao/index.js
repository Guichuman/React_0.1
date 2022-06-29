import React, {useState, useEffect} from 'react';
import app from "../../config/firebase";
import styles from './editarCartao.css';
import Menu from "../menu";
import {Link, useParams} from 'react-router-dom';
import Cartao from "../cartao";
import {initializeFirestore, addDoc, collection, query, onSnapshot, deleteDoc, doc, updateDoc, where} from 'firebase/firestore'


function EditarCartao(){
    const colecaoId  = useParams()

    
    const dbFirestore = initializeFirestore(app, {experimentalForceLongPolling: true})
    const [collectionList, setCollectionList] = useState([])
    const [nomeCartao, setNomeCartao] = useState('');
    const [versoCartao, setVersoCartao] = useState('');
    const [msgTipo, setMsgTipo] = useState('');
    
    const editarCartao = async (id) => {
      
      const colecaoRef = doc(dbFirestore, `cardCollections/${colecaoId.idColecao}/cartoes`, id);
      
          const docRef = await updateDoc(colecaoRef, {
            frente: nomeCartao,
            verso: versoCartao,
          }).then( () => {
            setNomeCartao('')
            setVersoCartao('')
            })

            window.location.href = "http://localhost:3000/cartoes/" + colecaoId.idColecao
    }

    return (
      <>
        <Menu>
            <Link className="menu_div menu_li" to="/home">Minhas coleções</Link>
            <Link className="menu_div menu_li" to="/dashboard">Sair</Link>
        </Menu>
  
        <div class="corpo_cartao" style={{ marginTop : 80}}>
          <p className="cartao_pagination" style={{ marginBottom : 20}}>Atualize os dados do flashcard</p>
          <div className="card_container_2">
            <div className="frenteVerso">Frente</div>
              <input required value={nomeCartao} onChange={evt => {setNomeCartao(evt.target.value)}} className="inputCard"></input>
            <div className="frenteVerso">Verso</div>
              <input required value={versoCartao} onChange={evt => {setVersoCartao(evt.target.value)}} className="inputCard"></input>
          </div>
        </div>
        <div className="container_btn_virar" >
            <button type="button" className="btn_cadastro_cartao" onClick={() => editarCartao(colecaoId.idCartao)}>Salvar alterações</button>
        </div>
        <div className='text-center' style={{ marginTop : 20}}>
            {msgTipo === 'ok' && <span className='span_success'>Cartão alterado!</span>}
            {msgTipo === 'erro' && <span className='span_error'>Ocorreu algo de errado</span>}
        </div>
      </>
    );
  }

export default EditarCartao;