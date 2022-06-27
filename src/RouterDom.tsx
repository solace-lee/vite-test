import App from './page/app/App'
import { HashRouter, Routes, Route } from 'react-router-dom'
import ThreeD from './page/app/threeD/threeD'
import Line from './page/app/line/index'
import Text from './page/app/text/index'
import WebglTest from './page/app/webgl/index'

export default function RouterDom() {

  return <HashRouter>
    <Routes>
      <Route path='/' element={<App />} >
        <Route path='ThreeD' element={<ThreeD dom={null} />} />
        <Route path='WebglTest' element={<WebglTest />} />
        <Route path='Line' element={<Line dom={null} />} />
        <Route path='TextTest' element={<Text dom={null} />} />
      </Route>
    </Routes>
  </HashRouter>
}
