import React from 'react';
import {useState,useEffect} from 'react';
import { NotionRenderer } from "react-notion";
import {useParams} from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import useStore from '../../store/store';


import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";




export default function Notion() {
    const {isDarkMode,inDarkMode,inLightMode} = useStore();

    const { slug } = useParams()
    const [blockMap, setBlockMap] = useState({})

     const notionSlugToId = async (slug)=> { 
        const NOTION_TABLE_ID = 'e0d1a00fc0cd4590afb5704f59bc72df';
        const database = await fetch(`https://notion-api.splitbee.io/v1/table/${NOTION_TABLE_ID}`).then(res =>res.json())
                       
           try {
        const notion = database.filter(notion => notion.slug === slug).pop();
         return notion.id
         } catch {
      return null
    }
    }

    useEffect(async () => { 
        const notionId = await notionSlugToId(slug)
        console.log(notionId)

        
        const notionData = await fetch(`https://notion-api.splitbee.io/v1/page/${notionId}`).then(res => res.json())
        setBlockMap(notionData)
        console.log(notionData)

        // fetch(`https://notion-api.splitbee.io/v1/page/${id}`)
        // .then(res => console.log(res))
    },[])
  return (
      <ThemeProvider theme={isDarkMode ? inDarkMode : inLightMode}>
    <MainFrame>
          <NotionRenderer
            fullPage={true}
            blockMap={blockMap}
              />
    </MainFrame>
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