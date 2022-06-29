import React, {useState, useEffect} from 'react';
import styles from './editarColecao.css';
import Menu from "../menu";
import {Link, useParams} from 'react-router-dom';
import {initializeFirestore, addDoc, collection, query, onSnapshot, deleteDoc, doc, updateDoc, where} from 'firebase/firestore'
import app from "../../config/firebase";
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'


function EditarColecao(){
    
    const colecaoId  = useParams()
    
    const dbFirestore = initializeFirestore(app, {experimentalForceLongPolling: true})
    const [collectionList, setCollectionList] = useState([])
    const [nomeColecao, setNomeColecao] = useState('');
    const [descricaoColecao, setDescricaoColecao] = useState('');
    const [imagemColecao, setImagemColecao] = useState('');
    const storage = getStorage(app)

    const editarColecao = async (id) => {
        const file = document.getElementById("inputImgUrl").files[0]
    
        const fileRef = ref(storage, file.name)
        const colecaoRef = doc(dbFirestore, "cardCollections", id);
        
        uploadBytes(fileRef, file).then( (snapshot) => {
           getDownloadURL(fileRef).then( async (url) => {
             const docRef = await updateDoc(colecaoRef, {
                nome: nomeColecao,
                descricao: descricaoColecao,
                imgUrl: url
              }).then( () => {
                setNomeColecao('')
                setDescricaoColecao('')
                setImagemColecao('')
               })
     
               window.location.href = "http://localhost:3000/home"
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
                    Atualize os dados necessários da coleção
                </p>
            </div>
            <div className="formulario_cadastro">
                <form>

                    <label className="label_formulario">Nova coleção</label>
                    <input required name="nome_colecao"  value={nomeColecao} onChange={evt => {setNomeColecao(evt.target.value)}} type="text" placeholder="Insira o nome da coleção"></input>
                    <label className="label_formulario">Descrição</label>
                    <br/>
                    <textarea required className="descricao_card"  value={descricaoColecao}  onChange={evt => {setDescricaoColecao(evt.target.value)}} name="descricao_colecao" placeholder="Descreva os detalhes da coleção"></textarea>
                    <br/>
                    <label className="label_formulario">Imagem URL</label>
                    <input required type="file" name="inputImgUrl" id="inputImgUrl" value={imagemColecao} onChange={evt => {setImagemColecao(evt.target.value)}} ></input>
                    <a>
                        <button type="button"  className="btn_cadastro_novaColecao " onClick={() => editarColecao(colecaoId.idColecao)} id="btn_nova_colecao" >Salvar alterações</button>
                    </a>
                </form>
            </div>
        </div>
      </>
    );
  }

export default EditarColecao;