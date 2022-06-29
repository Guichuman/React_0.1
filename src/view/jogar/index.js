import React, {useState, useEffect} from 'react';
import app from "../../config/firebase";
import { useParams} from 'react-router-dom';

import styles from './jogar.css';
import Menu from "../menu";
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {initializeFirestore, addDoc, collection, query, onSnapshot, deleteDoc, doc, updateDoc} from 'firebase/firestore'


function Jogar(){

  const colecaoId  = useParams()

  useEffect( () => {
    const q = query(collection(dbFirestore,  `cardCollections/${colecaoId.idColecao}/cartoes`));
    
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

  const [collectionList, setCollectionList] = useState([])
  const dbFirestore = initializeFirestore(app, {experimentalForceLongPolling: true})
  console.log(collectionList)

  
  const Cartao = () => {
    if(collectionList.length > 0) {
      return (
        <>
          <p className="cartao_pagination">Cartão 1/8</p>
          <div className="card_container_2">
              <div ></div>
              <p className="card_name_2">Carro</p>
              <p className="card_name_3">Car</p>
          </div>
          <div className="container_btn_virar" >
            <Button className="btn_virar"  variant="success" >Virar</Button>
          </div>
          <div className="container_btn_virar" >
            <Button className="btnProximo ghost" variant="success" >Próximo</Button>
          </div>
        </>
      );
    }
  }

    return (
      <>
        <Menu>
            <Link className="menu_div menu_li" to="/home">Minhas coleções</Link>
            <Link className="menu_div menu_li" to="/dashboard">Sair</Link>
        </Menu>
  
        <div class="corpo_cartao" style={{ marginTop : 80}}>
            <Cartao></Cartao>
        </div>
      </>
    );
  }

export default Jogar;