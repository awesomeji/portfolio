import React from 'react'
import {Route,Routes} from 'react-router-dom'
import About from './components/About'
import Login from './components/Login/LoginPage'
import Register from './components/Login/RegisterPage'
import Contact from './components/Board/Contact'
import Auth from './components/hoc/auth'
import Write from './components/Board/WritePage'
import Nav from './components/Nav'
import Notion from './components/Notion/Notion'
import styled, { ThemeProvider } from 'styled-components';
import useStore from './store/store'




function App() {
    const {isDarkMode,inDarkMode,inLightMode} = useStore();

 
    const AuthAbout = Auth(About, null);
    const AuthNotion = Auth(Notion, null);
    const AuthContact = Auth(Contact, true);
    const AuthLogin = Auth(Login, false);
    const AuthRegister = Auth(Register, false);
    const AuthWrite = Auth(Write, true);
    return (
        <ThemeProvider theme={isDarkMode ? inDarkMode : inLightMode}>
        <Theme style={{height :'inherit'}}>
           
        <Nav></Nav>
        <Routes >
        <Route path='*' element={  <AuthAbout />} />
        <Route path='/about' element={   <AuthAbout />} />
        <Route path='/login' element={ <AuthLogin />} />
        <Route path='/board' element={ <AuthContact />} />
        <Route path='/register' element={ <AuthRegister />} />
        <Route path='/write' element={<AuthWrite />} />
        <Route path='/notion/:slug' element={<AuthNotion />} />
        </Routes>
      
        </Theme>
        </ThemeProvider>
    )
}



export default App

const Theme = styled.div`
background-color: ${props => props.theme.backgroundColor};

`