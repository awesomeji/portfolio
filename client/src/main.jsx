import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
window.React = React

ReactDOM.render(

    <BrowserRouter>
        <App />
    </BrowserRouter>,
  document.getElementById('root')
)