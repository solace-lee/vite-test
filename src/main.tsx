import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import 'antd/dist/antd.less';
import './style.less'
import RouterDom from './RouterDom'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <RouterDom />
  </Provider>,
  document.getElementById('root')
)
