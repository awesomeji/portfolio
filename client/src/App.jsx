
import {Route,Routes} from 'react-router-dom'
import About from './components/About'
import Login from './components/LoginPage'
import ContactMe from './components/ContactMe'
import Auth from './components/hoc/auth'
import Nav from './components/Nav'
import { useParams, useLocation, useNavigate } from 'react-router-dom';


function App() {
 
    const AuthAbout = Auth(About, true);
    const AuthContactMe = Auth(ContactMe, true);
    const AuthLogin = Auth(Login, false);
    return (
       <>
       <Nav></Nav>
        <Routes>
        <Route path='*' element={ <div>hillowhillow</div>} />
        <Route path='/about' element={   <AuthAbout />} />
        <Route path='/login' element={ <AuthLogin />} />
        <Route path='/contact' element={ <AuthContactMe />} />
        {/* <Route path='/' element={ <Home />} ></Route> */}
    </Routes>
       </>
    
        
    )
}

export default App
