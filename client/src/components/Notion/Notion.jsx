import React from 'react';
import {useState,useEffect} from 'react';
import { NotionRenderer } from "react-notion";
import { useParams } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import useStore from '../../store/store';
import {Link} from 'react-router-dom';


import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";




export default function Notion() {
    const {isDarkMode,inDarkMode,inLightMode,isEnglishMode} = useStore();

    const { slug } = useParams()
    const [blockMap, setBlockMap] = useState({})

     const notionSlugToId = async (slug)=> { 
         const NOTION_TABLE_ID = 'e0d1a00fc0cd4590afb5704f59bc72df';
         const NOTION_TABLE_ID_KR = 'a8442bd75a054f288b13d9cf6414bfd9'
         
        const database = await fetch(`https://notion-api.splitbee.io/v1/table/${isEnglishMode ? NOTION_TABLE_ID : NOTION_TABLE_ID_KR}`).then(res =>res.json())
                       
           try {
        const notion = database.filter(notion => notion.slug === slug).pop();
         return notion.id
         } catch {
      return null
    }
    }

    useEffect(async () => { 
        const notionId = await notionSlugToId(slug)
      

        
        const notionData = await fetch(`https://notion-api.splitbee.io/v1/page/${notionId}`).then(res => res.json())
        setBlockMap(notionData)
        

        // fetch(`https://notion-api.splitbee.io/v1/page/${id}`)
        // .then(res => console.log(res))
    },[isEnglishMode])
  return (
      <ThemeProvider theme={isDarkMode ? inDarkMode : inLightMode}>
          <BackToMain>
                <StyledLink to="/about">←Back To Main</StyledLink>
          </BackToMain>
    <MainFrame>
          <NotionRenderer
            fullPage={true}
            blockMap={blockMap}
              />
          </MainFrame>
           <GoToSuggestion>
                <StyledLink to="/board">go To suggestion</StyledLink>
          </GoToSuggestion>
    </ThemeProvider>
  )
}

const MainFrame = styled.div`
min-height: 100vh;
    background-color: ${props => props.theme.backgroundColor};
 .notion{
        //darkmodechange
        color : ${props => props.theme.color};
        caret-color : ${props => props.theme.color};
    }
    .notion-page-header{
        //darkmodechange
        font-weight : 750;
        background-color : rgba(196, 232, 202,0.2) !important;
        /* box-shadow: 0px 5px 10px #C4E8CA; */
    }
    .notion-nav-title{
       color : ${props => props.theme.color};
    }
`
const BackToMain = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 20%;
    margin :18% auto;
    height: 100vh;
  `
const GoToSuggestion = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 20%;
    margin :18% auto;
    height: 100vh;
  
`

const StyledLink = styled(Link)`
    font-family: 'Orbitron', sans-serif;
    /* font-size: 1.5rem; */
     font-weight : 600;
    text-decoration: none;
    padding: 50% 0 0 10%;
    color: ${props => props.theme.color};
    &:hover{
    color:${props => props.theme.articleHoverCL};
    text-decoration: underline;
    }
`