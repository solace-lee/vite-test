import { useState } from 'react'
import './App.css'
import { Button } from 'antd'
import { useNavigate, Outlet } from 'react-router-dom'


function App() {
  // const [count, setCount] = useState(0)
  const navigate = useNavigate()

  function goto(path: string) {
    navigate(path)
  }
  return (
    <div className='App'>
      <Button.Group>
        <Button type='primary' onClick={() => { goto('ThreeD') }}>ThreeD</Button>
        <Button type='dashed' onClick={() => { goto('WebglTest') }}>Webgl</Button>
      </Button.Group>
      <Outlet />
    </div>
  )
}

export default App
