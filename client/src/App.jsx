import { useState } from 'react'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import About from './components/About/About'
function App() {
    const [count, setCount] = useState(0)
    return (
        
        <Routes>
            <Route path='*' element={ <div>hillowhillow</div>} />
            <Route path='/about' element={ <About />} />
            {/* <Route path='/' element={ <Home />} ></Route> */}
            </Routes>
        // <About />
        // <BrowserRouter>
        //     <Switch>
        //     <Route path='/' component={Home} />               
        //     <Route path='/about' component={About} />               
        //     </Switch>
        // </BrowserRouter>
        
    )
}

export default App
