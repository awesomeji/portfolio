import React from 'react';
import { useState, useEffect } from 'react';
import { NotionRenderer } from 'react-notion'
import 'prismjs/themes/prism-tomorrow.css'; // only needed for code highlighting
import 'react-notion/src/styles.css';
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import useStore from '../store/store';


// const notion = new NotionAPI();
// const recordMap = await notion.getPage('83fca179f8314fd784e541e3368df6a5')
export function Article(props) {
    
    return (
      <>
            <ArticleFrame >
            <Link to={props.link} >
                    <div style={{height :'70px', overflow:'hidden'}}>

        <h1>{props.title}</h1>
                    </div>
        <div style={{height: '120px'}}></div>
        <p>{props.description}</p>
        <p>{props.date}</p>
        </Link>
        </ArticleFrame>
        
    </>
  )
}

export default function About() {

    const {isDarkMode,inDarkMode,inLightMode,isEnglishMode,isLoading,setIsLoading} = useStore();
    const [mainArticle, setMainArticle] = useState({})
    const [ArticleList, setArticleList] = useState([])

      useEffect(() => {
    // 두번째 방법
    const NOTION_PAGE_ID = '83fca179f8314fd784e541e3368df6a5';
    const NOTION_PAGE_ID_KR ='658634c7564b47a285670ec94982331a'
    fetch(`https://notion-api.splitbee.io/v1/page/${isEnglishMode ? NOTION_PAGE_ID : NOTION_PAGE_ID_KR}`)
      .then(res => res.json())
      .then((resJson) => {
        setMainArticle(resJson);
      });
          
        const NOTION_TABLE_ID = 'e0d1a00fc0cd4590afb5704f59bc72df';
        const NOTION_TABLE_ID_KR = 'a8442bd75a054f288b13d9cf6414bfd9'
        fetch(`https://notion-api.splitbee.io/v1/table/${isEnglishMode ? NOTION_TABLE_ID : NOTION_TABLE_ID_KR}`)
      .then(res =>res.json())
            .then((resJson) => {
          console.log(resJson)
                setArticleList(resJson);
                setIsLoading(false)
      });     
  }, [isEnglishMode])
    return (
        <>
        {isLoading ? (<div>Loading...</div>) :( <ThemeProvider theme={isDarkMode? inDarkMode : inLightMode }>
    <MainFrame>
    <MainArticle>
    <NotionRenderer 
    //    blockMap={staticResponse}
    blockMap={mainArticle}
            fullPage={true}
            
            />
    </MainArticle>
    <Articleboard>
    {ArticleList.map((blog, index) => {
        return (
            <Article
            title={blog.Name}
            description={blog.description}
            date={blog.date}
            link={'/notion/' + blog.slug}
            key={index}
            ></Article>
            
            
            )
        } 
        )}
                </Articleboard>
      </MainFrame>
        </ThemeProvider>)}
        </>
       
  )
}


const Articleboard = styled.div`
    display: flex;
    flex-wrap : wrap;
    align-items : center;
    width: 60%;
    margin : 0 0 0 12%;
    justify-content: flex-start;
    


`
const ArticleFrame = styled.div`
background: ${props => props.theme.articleBG};
/* border : ${props => props.theme.greenLine}; */
/* border-radius : 10px; */
text-align : center;
a{
    text-decoration : none !important;
    color :${props => props.theme.color};
   
    &:hover{
        color :${props => props.theme.articleHoverCL};
    }
}
padding: 12px;
margin: 20px 25px;
width: 200px;
height:300px; 
`
const MainArticle = styled.div`
    width :100%;

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

const MainFrame = styled.div`
    font-family: 'Orbitron', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* margin :0.5px 0 0 0 ; */
   
    background-color: ${props => props.theme.backgroundColor};
   
`