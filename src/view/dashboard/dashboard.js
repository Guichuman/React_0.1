import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Menu from '../menu';
import {useState} from "react";
import styles from './dashboard.css';

function traduzirCard(){
    let cardGhost = document.querySelector('.card_ghost');
    let descobrirImg = document.querySelector('.descobrir_img');

        cardGhost.classList.remove('card_ghost');
        descobrirImg.classList.add('card_ghost');
}

const Dashboard = () => ( 
    <>
        <Menu>
            <Link className="menu_div menu_li" to="/cadastro">Cadastre-se</Link>
            <Link className="menu_div menu_li" to="/login">Login</Link>
        </Menu>
        
            
            <div className="corpo">
                <div className="">
                    <p className="mind_booster">
                        Mind Booster
                    </p>
                </div>
                <div>
                    <p className="mind_comentario_dashboard">Treine sua memória com flash cards!</p>
                </div>
            </div>
            <div className="container_comentario">
                <p className="index_comentario">Como se chama carro em inglês?</p>
            </div>
            <div className="footer">
                <div>
                    <img onclick={{ traduzirCard }} src="descobrir.png" className="descobrir_img" />
                </div>
                <div className="card_container">
                    <p className="card_name" style={{ marginBottom: 125 }}>Carro</p>
                </div>
                <div>
                    <img src="imgs/seta.png" class="seta_img card_ghost" />
                </div>
                <div class="card_container card_ghost">
                    <p class="card_name">Carro</p>
                    <hr class="card_slash" />
                    <p class="card_name">Car</p>
                </div>
            </div>
    </>
)

export default Dashboard;