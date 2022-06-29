import React, {useState, useEffect} from 'react';
import Menu from '../menu';
import Colecao from '../colecao';
import styles from './home.css';
import { Switch, Route, Link } from 'react-router-dom';
import {initializeFirestore, addDoc, collection, query, onSnapshot, deleteDoc, doc, updateDoc} from 'firebase/firestore'
import app from "../../config/firebase";
import { BsFillPencilFill, BsTrash } from "react-icons/bs";

function Home(){

  useEffect( () => {
    const q = query(collection(dbFirestore, "cardCollections"));
    
    const unsub = onSnapshot(q, (result) => {
      const colecoes = [];
        result.forEach((doc) => {
          colecoes.push ({
                ...doc.data(),
                id: doc.id
            })
            
        })
        setCollectionList(colecoes)
    })
  }, [])

  const [nomeColecao, setNomeColecao] = useState('');
  const [descricaoColecao, setDescricaoColecao] = useState('');
  const [imagemColecao, setImagemColecao] = useState('');
  const [collectionList, setCollectionList] = useState([])
  const dbFirestore = initializeFirestore(app, {experimentalForceLongPolling: true})

  const removerColecao = async (id) => {
    let texto = "Deseja remover essa coleção?";
    if(window.confirm(texto) == true){
      await deleteDoc(doc(collection(dbFirestore, "cardCollections"), id))
    }
  }



  const Colecao = () => {
    if(collectionList.length > 0) {
      return (
        <div className="container_meus_cards row">
          {
            collectionList.map( (colecao) =>  

            <div className="card_container_2 col-md-2"  style={{ marginTop: 20}}>
              <Link params={{ idColecao: colecao.id }} to={`/editarColecao/${colecao.id}`} ><BsFillPencilFill  className="lapis_table"/></Link>
              <div className="container_img ">  
              <Link params={{ idColecao: colecao.id }} to={`/cartoes/${colecao.id}`} >
                  <img className=""  src={colecao.imgUrl}/>

              </Link>
              </div>
              <div className="nome_cartao">{colecao.nome}</div>
              <BsTrash onClick={() => removerColecao(colecao.id)} className="lixeira_table openModalBtn"/>
            </div>
            
            )
          }
        </div>
        
      );
    }
  }

  return (
    <>
      <Menu>
          <Link className="menu_div menu_li" to="/home">Minhas Coleções</Link>
          <Link className="menu_div menu_li" to="/dashboard">Sair</Link>
          
      </Menu>
      <div style={{ marginTop : 50, marginBottom : 30}}>
        <a className="btn_cadastro_home " href="/novaColecao">Nova coleção</a>
      </div>
        <Colecao></Colecao>
    </>
  );
}


export default Home;


