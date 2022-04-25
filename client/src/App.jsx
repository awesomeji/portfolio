
import {Route,Routes} from 'react-router-dom'
import About from './components/About'
import Login from './components/LoginPage'
import Auth from './components/hoc/auth'

// import useStore from './components/store/store'

function App() {
    const AuthAbout = Auth(About, null);
    const AuthLogin = Auth(Login, null);
    return (
 
    <Routes>
        <Route path='*' element={ <div>hillowhillow</div>} />
        <Route path='/about' element={   <AuthAbout />} />
        <Route path='/login' element={ <AuthLogin />} />
        {/* <Route path='/' element={ <Home />} ></Route> */}
    </Routes>
        
    )
}

export default App
