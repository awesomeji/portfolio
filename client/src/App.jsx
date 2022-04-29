
import {Route,Routes} from 'react-router-dom'
import About from './components/About'
import Login from './components/LoginPage'
import Register from './components/RegisterPage'
import ContactMe from './components/ContactMe'
import Auth from './components/hoc/auth'
import Nav from './components/Nav'
import { useParams, useLocation, useNavigate } from 'react-router-dom';


function App() {
 
    const AuthAbout = Auth(About,null);
    const AuthContactMe = Auth(ContactMe, true);
    const AuthLogin = Auth(Login, false);
    const AuthRegister = Auth(Register, false);
    return (
       <>
       <Nav></Nav>
        <Routes>
        <Route path='*' element={ <div>hillowhillow</div>} />
        <Route path='/about' element={   <AuthAbout />} />
        <Route path='/login' element={ <AuthLogin />} />
        <Route path='/contact' element={ <AuthContactMe />} />
        <Route path='/register' element={ <AuthRegister />} />
        {/* <Route path='/' element={ <Home />} ></Route> */}
    </Routes>
       </>
    
        
    )
}

export default App
