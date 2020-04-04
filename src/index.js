import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { Store } from './redux/store'

import WebFont from 'webfontloader'
import './reset.css'
import './index.css'

WebFont.load({
  google: { families: ['Roboto:400,500,900,italic', 'sans-serif'] }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
