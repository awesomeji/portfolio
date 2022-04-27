
import {Route,Routes} from 'react-router-dom'
import About from './components/About'
import Login from './components/LoginPage'
import Auth from './components/hoc/auth'
import { useParams, useLocation, useNavigate } from 'react-router-dom';


function App() {
 
    const AuthAbout = Auth(About, true);
    const AuthLogin = Auth(Login, false);
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
