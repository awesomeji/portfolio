import { useState } from 'react'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import About from './components/About'
import Login from './components/LoginPage'
import create from 'zustand'
import useStore from './store/store'

function App() {
    // const [count, setCount] = useState(0)
    const {count, increaseCount, decreaseCount, onSubmit} = useStore()
    return (
 
    <Routes>
        <Route path='*' element={ <div>hillowhillow</div>} />
        <Route path='/about' element={ <About />} />
        <Route path='/login' element={ <Login />} />
        {/* <Route path='/' element={ <Home />} ></Route> */}
    </Routes>
        
    )
}

export default App
