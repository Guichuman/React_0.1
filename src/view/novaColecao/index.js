import React, { useEffect } from "react";
import styles from './novaColecao.css';
import Menu from "../menu";
import {Link} from 'react-router-dom';
import {useState} from "react";
import app from "../../config/firebase";
import {initializeFirestore, addDoc, collection, query, onSnapshot, deleteDoc, doc, updateDoc} from 'firebase/firestore'
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { upload } from '@testing-library/user-event/dist/upload';
import { Redirect } from "react-router-dom";

function NovaColecao(){
    
    useEffect( () => {
        const q = query(collection(dbFirestore, "cardCollections"))
    
        const unsub = onSnapshot(q, (result) => {
          const colecoes = [];
          result.forEach((colecao) => {
            colecoes.push({
              ...colecao.data(),
              id: colecao.id
            })
          })
    
          setCollectionList(colecoes)
    
        })
      }, [])
      
      const [nomeColecao, setNomeColecao] = useState('');
      const [descricaoColecao, setDescricaoColecao] = useState('');
      const [imagemColecao, setImagemColecao] = useState('');
      const [collectionList, setCollectionList] = useState('');
  
      const dbFirestore = initializeFirestore(app, {experimentalForceLongPolling: true})
      const storage = getStorage(app)
    

    const adicionar = async () => {

        const file = document.getElementById("inputImgUrl").files[0]
    
        const fileRef = ref(storage, file.name)
    
        uploadBytes(fileRef, file).then( (snapshot) => {
          getDownloadURL(fileRef).then( async (url) => {
            const novaColecao = {
              nome: nomeColecao,
              descricao: descricaoColecao,
              imgUrl: url
            }
    
            const docRef = await addDoc(collection(dbFirestore, "cardCollections"), novaColecao)
    
            if(docRef.id) {
              console.log("Documento adicionado. ID -> " + docRef.id)
              window.location.href = "http://localhost:3000/home"
            }
          })
        })
      }
    

    return (
      <>
        <Menu>
            <Link className="menu_div menu_li" to="/home">Minhas coleções</Link>
            <Link className="menu_div menu_li" to="/dashboard">Sair</Link>
        </Menu>
  
        <p className="mind_comentario" style={{ fontSize : 28, marginTop : 70, marginLeft : 60 }}>
          Nova coleção
        </p>
        <div className="corpo">
            <div className="">
                <p className="mind_comentario" style={{ fontSize : 28, marginTop : 30 }}>
                    Preencha os dados referente à coleção a ser criada
                </p>
            </div>
            <div className="formulario_cadastro">
                <form>

                    <label className="label_formulario">Nova coleção</label>
                    <input required name="nome_colecao" id="nome_colecao" value={nomeColecao} onChange={evt => {setNomeColecao(evt.target.value)}} type="text" placeholder="Insira o nome da coleção"></input>
                    <label className="label_formulario">Descrição</label>
                    <br/>
                    <textarea required className="descricao_card" id="descricao_colecao" value={descricaoColecao}  onChange={evt => {setDescricaoColecao(evt.target.value)}} name="descricao_colecao" placeholder="Descreva os detalhes da coleção"></textarea>
                    <br/>
                    <label className="label_formulario">Imagem URL</label>
                    <input required type="file" name="inputImgUrl" id="inputImgUrl" value={imagemColecao} onChange={evt => {setImagemColecao(evt.target.value)}} ></input>
                    <a>
                        <button type="button" onClick={() => adicionar()} className="btn_cadastro_novaColecao">Cadastrar</button>
                    </a>
                </form>
            </div>
        </div>
      </>
    );
  }

export default NovaColecao;