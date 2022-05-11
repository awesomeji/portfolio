import React from 'react'
import axios from '../plugins/axios'
import useStore from '../store/store'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Link, Routes, Route, Outlet } from "react-router-dom";
import styled from 'styled-components';
import LogoWhite from '../assets/logoWhite.png';
import Logo from '../assets/logo.png';

export default function Nav() {
     const navigate = useNavigate();
    const { setLoginStatus, loginStatus, setAccessToken, isDarkMode, setIsDarkMode } = useStore()
    
    const changeMode = () => { 
        setIsDarkMode(!isDarkMode)
    }
      const logoutHandler =() =>{
    axios.get("/api/users/logout")
     .then(res=>{
       if(res.data.logoutsuccess){
         
        setLoginStatus(false); 
        setAccessToken('');
        navigate('/login')
        
         
     }else{
         alert("Logout failed")
 
     }
   })
 }

  return (
      <>
    {loginStatus ? 
        (<Frame>
      <LogoFrame>
      <img onClick={changeMode}  src={isDarkMode ? Logo : LogoWhite} alt="logo" />  
      <h1>Portfolio</h1>
      </LogoFrame>
        
        <StyledLink to="/about">Activity</StyledLink>     
        <StyledLink to="/board">Contact</StyledLink>    
      Credit
       <StyledButton onClick={logoutHandler}>LogOut</StyledButton> 
      </Frame> )
        : (<Frame>
            <LogoFrame>
            <img src={LogoWhite} alt="logo" />  
            <h1>Portfolio</h1>
            </LogoFrame>
            <StyledLink to="/about">Activity</StyledLink> 
            <StyledLink to="/board">Contact</StyledLink>  
              Credit
                  <div>

            <StyledLink to="/login">Sign In</StyledLink>/  
                 
            <StyledLink to="/register">Sign Up</StyledLink>
            </div>
     </Frame>) }    
      </>
  )
}

const Frame = styled.div`

height : 6rem;

display : flex;
background-color : #1a1a1a;
color :#d1cfcf ;
box-shadow:0px 20px 15px #d6d6d670;

justify-content : space-around;

align-items : center;

font-size : 1.5rem;

font-family: 'Gugi', cursive;

`;

//align-items : center flex상태에서 위로 몰린 텍스트 중앙을 정렬*

const LogoFrame = styled.div`

display:flex;

font-size :1rem;

font-style : italic;
img{
    border-radius : 10%;
    box-shadow:0px 20px 15px rgba(255,255,255, 0.2);
    margin: 0 0.5rem;
}

`;

const StyledLink = styled(Link)`

text-decoration : none;

color :#d1cfcf ;

&:hover{

color :#C4E8CA;

}

`

const StyledButton = styled.button`

font-size : 1.5rem;

font-family: 'Gugi', cursive;

margin : 0 1rem;

min-width : 4rem;

min-height : 2rem;

background: none;

border : none;

cursor : pointer;

color : #d1cfcf ;

background-color : #1a1a1a;

border-radius : 0.5rem;

&:hover{

color :#C4E8CA;

}

`;