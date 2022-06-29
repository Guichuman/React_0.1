import React, {useState} from "react";
import styles from './menu.css';
import {Link} from 'react-router-dom';

function Menu({children}){
    return (
       
        <header className="menu">
        <div >    <img className="logo" src="logo.png" alt="Logo" /></div>
            <nav>
                <ul className="links_menu">
                    <li className="menu_li"><div className="menu_div"> {children} </div></li>

                </ul>
            </nav>
        </header>
    );
}

export default Menu;