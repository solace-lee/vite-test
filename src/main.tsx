import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import 'antd/dist/antd.less';
import './style.less'
import RouterDom from './RouterDom'

ReactDOM.render(
  <React.StrictMode>
    <RouterDom />
  </React.StrictMode>,
  document.getElementById('root')
)
