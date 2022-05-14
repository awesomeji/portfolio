import React from 'react';
import axios from '../plugins/axios';
import useStore from '../store/store';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Link, Routes, Route, Outlet } from "react-router-dom";
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import LogoWhite from '../assets/LogoWhite.png';
import Logo from '../assets/Logo.png';

export default function Nav() {
     const navigate = useNavigate();
const { setLoginStatus,
        loginStatus,
        setAccessToken,
        isDarkMode,
        inDarkMode,
        inLightMode,
        setIsDarkMode,
        isEnglishMode,
        setIsEnglishMode
        } = useStore()
    
    const changeMode = () => { 
        setIsDarkMode(!isDarkMode)
       
    }
    const changeLan = () => {
        setIsEnglishMode(!isEnglishMode)
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
      <div style={{ position: 'relative', zIndex: '1' }}>
          <ThemeProvider theme={isDarkMode ? inDarkMode : inLightMode } >

    {loginStatus ? 
        (<Frame>
      <LogoFrame>
      <img onClick={changeMode}  src={isDarkMode ? Logo : LogoWhite} alt="logo" />  
      <h1>{isEnglishMode ? 'Portfolio' : '포트폴리오' }</h1>
      </LogoFrame>
        
        <StyledLink to="/about">{isEnglishMode? 'Projects' : '프로젝트' }</StyledLink>     
        <StyledLink to="/board">{isEnglishMode? 'Contact' : '게시판' }</StyledLink>    
                 {isEnglishMode? 'Credit' : '크레딧' }
                  <span onClick={changeLan}>
                  {isEnglishMode? '한/영' : 'En/KOR' }
                  </span>
       <StyledButton onClick={logoutHandler}>  {isEnglishMode? 'LogOut' : '로그아웃' }</StyledButton> 
      </Frame> )
        : (<Frame>
            <LogoFrame>
            <img onClick={changeMode}  src={isDarkMode ? Logo : LogoWhite} alt="logo" />  
            <h1>{isEnglishMode ? 'Portfolio' : '포트폴리오' }</h1>
            </LogoFrame>
            <StyledLink to="/about">{isEnglishMode? 'Projects' : '프로젝트' }</StyledLink> 
            <StyledLink  to="/board">{isEnglishMode? 'Contact' : '게시판' }</StyledLink>  
                 {isEnglishMode? 'Credit' : '크레딧' }
                  <span onClick={changeLan}>
                 {isEnglishMode? '한/영' : 'En/KOR' }
                  </span>
                  <div>
                
            <StyledLink to="/login">{isEnglishMode? 'Sign In' : '로그인' }</StyledLink>/  
                 
            <StyledLink to="/register">{isEnglishMode? 'Sign Up' : '회원가입' }</StyledLink>
            </div>
     </Frame>) }    
            </ThemeProvider>
      </div>
  )
}

const Frame = styled.div`
height : 6rem;
display : flex;
background-color : ${props => props.theme.backgroundColorNV};
color : ${props => props.theme.colorCT};
box-shadow:${props => props.theme.navShadow};
justify-content : space-around;
align-items : center;
font-size : 1.5rem;
font-family: 'Gugi', cursive;
width : 100%;
position : fixed;
top : 0;
`;

//align-items : center flex상태에서 위로 몰린 텍스트 중앙을 정렬*

const LogoFrame = styled.div`
display:flex;
font-size :1rem;
font-style : italic;
img{
    border-radius : 10%;
    /* box-shadow:0px 5px 5px #cbc4c433; */
    margin: 0 0.5rem;
}
`;

const StyledLink = styled(Link)`
text-decoration : none;
color :${props => props.theme.colorCT};
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
color : ${props => props.theme.colorCT};
background-color :  ${props => props.theme.backgroundColorNV};
border-radius : 0.5rem;
&:hover{
color :#C4E8CA;
}
`;

