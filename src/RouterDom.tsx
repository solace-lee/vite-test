import App from './page/app/App'
import { HashRouter, Routes, Route } from 'react-router-dom'
import ThreeD from './page/app/threeD/threeD'
import WebglTest from './page/app/webgl/index'

export default function RouterDom() {

  return <HashRouter>
    <Routes>
      <Route path='/' element={<App />} >
        <Route path='ThreeD' element={<ThreeD dom={null} />} />
        <Route path='WebglTest' element={<WebglTest />} />
      </Route>
    </Routes>
  </HashRouter>
}
