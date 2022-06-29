import React from 'react';
import ReactDOM from 'react-dom/client';
import Menu from '../src/view/menu';
import styles from './index.css';
import Login from './login';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes/>
    </BrowserRouter>
);

export default root;

