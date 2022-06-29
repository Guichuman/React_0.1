import React, {useState, useEffect} from 'react'
import styles from './cartoes.css';
import Menu from "../menu";
import {Link} from 'react-router-dom';
import Cartao from "../cartao";
import app from "../../config/firebase";
import {initializeFirestore, addDoc, collection, query, onSnapshot, deleteDoc, where, doc, updateDoc} from 'firebase/firestore'
import { BsFillPencilFill, BsTrash, BsSearch } from "react-icons/bs";
import { useParams} from 'react-router-dom';


function Cartoes(){
  
  const colecaoId  = useParams()
   
  const [cartoesList, setCartoesList] = useState([])
  const [pesquisa, setPesquisa] = useState('')
  const dbFirestore = initializeFirestore(app, {experimentalForceLongPolling: true})

  useEffect( () => {
      const q = query(collection(dbFirestore,  `cardCollections/${colecaoId.idColecao}/cartoes`));
      const unsub = onSnapshot(q, (result) => {
        const cartoes = [];
         result.forEach((doc) => {
            if(doc.data().frente.indexOf(pesquisa) >= 0){
              cartoes.push ({
                ...doc.data(),
                    id: doc.id
                })
            } 
          })
          setCartoesList(cartoes)
      })
  }, [])

  
  const removerCartao = async (id) => {
    console.log('CLICOU')
    let texto = "Deseja remover esse cartão?";
    if(window.confirm(texto) == true){
      await deleteDoc(doc(collection(dbFirestore,  `cardCollections/${colecaoId.idColecao}/cartoes`), id))
      .catch(erro => {
        console.log(erro)
      });
    }
  }


  const Linha = () => {
      if(cartoesList.length > 0) {
        return (
          <div className="tabela row">
            {
              cartoesList.map( (cartao) =>  
                <li  className="tabela_colecao col-md-11">{cartao.frente}<div className='container_editDelete'><BsTrash className="deleteCartao" onClick={() => removerCartao(cartao.id)} /><Link params={{ idCartao : cartao.id}} to={`/editarCartao/${colecaoId.idColecao}/${cartao.id}`}><BsFillPencilFill className='editCartao'/></Link></div></li>
              )
            }
          </div>
        );
      }
  }

    return (
      <>
        <Menu>
            <Link className="menu_div menu_li" to="/home">Minhas coleções</Link>
            <Link className="menu_div menu_li" to="/dashboard">Sair</Link>
        </Menu>
  
        <div className="container container_colecao">
            <p className="p_colecao" >
                Coleção - Nome
            </p>
            <div className="barra_pesquisa ">
                <input className="col-md-11 input_pesquisa" value={pesquisa} onChange={(evt) => setPesquisa(evt.target.value)} style={{ padding : 5 }} type="text" placeholder="Busque por um cartão"></input>
            </div>
            <div className="row">
                <div className="container_btn_cartao">
                    <Link params={{ id: colecaoId.idColecao }} to={`/novoCartao/${colecaoId.idColecao}`}><button className="btn_novoCartao">Novo cartão</button></Link>
                </div>
            </div>
            
            <Linha></Linha>


            <div className="container_btnJogar" >
            <Link to={`/jogar/${colecaoId.idColecao}`}><button  className="btn btn-success btnJogar" variant="success" >Jogar!</button></Link>
            </div>
        </div>
      </>
    );
  }

export default Cartoes;