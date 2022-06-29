import React, {useState} from "react";
import styles from './cartao.css';

function Cartao(){
    return (
      <>
        <p className="cartao_pagination">Cartão 1/8</p>
        <div className="card_container_2">
            <div ></div>
            <p className="card_name_2">Carro</p>
            <p className="card_name_3">Car</p>
        </div>
      </>
    );
  }

export default Cartao;