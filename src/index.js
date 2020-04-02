import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import WebFont from 'webfontloader';
import './reset.css'
import './index.css'

WebFont.load({
  google: {
    families: ['Roboto:400,500,900,italic', 'sans-serif']
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
