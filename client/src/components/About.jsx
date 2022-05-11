import React from 'react'
import { useState,useEffect } from 'react' 
import { NotionRenderer } from 'react-notion'
import 'prismjs/themes/prism-tomorrow.css'; // only needed for code highlighting
import 'react-notion/src/styles.css';
import styled from 'styled-components'


// const notion = new NotionAPI();
// const recordMap = await notion.getPage('83fca179f8314fd784e541e3368df6a5')
export function Article(props) {
    return (
      <>
            <ArticleFrame>
      <a href={props.link} >
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <p>{props.date}</p>
        </a>
        </ArticleFrame>
        
      </>
  )
}

export default function About() {

    
    const [mainArticle, setMainArticle] = useState({})
    const [ArticleList, setArticleList] = useState([])

      useEffect(() => {
    // 두번째 방법
    const NOTION_PAGE_ID = '83fca179f8314fd784e541e3368df6a5';
    fetch(`https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}`)
      .then(res => res.json())
      .then((resJson) => {
        setMainArticle(resJson);
      });
          
       const NOTION_TABLE_ID = 'e0d1a00fc0cd4590afb5704f59bc72df';
        fetch(`https://notion-api.splitbee.io/v1/table/${NOTION_TABLE_ID}`)
      .then(res =>res.json())
            .then((resJson) => {
          console.log(resJson)
        setArticleList(resJson);
      });     
  }, [])
  return (
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
                   />
                   
                 
                   )
           } 
           )}
                </Articleboard>
      </MainFrame>
  )
}


const Articleboard = styled.div`
    display: flex;
    flex-wrap : wrap;
    align-items : center;
    width: 80%;
    margin : 0 0 0 5%;
    justify-content: flex-start;
    


`
const ArticleFrame = styled.div`
background: rgba(255,255,255,0.1);
border : 2px solid rgb(56, 116, 37);
/* border-radius : 10px; */
text-align : center;
a{
    text-decoration : none !important;
    color :#d1cfcf;
    &:hover{
        color :rgb(56, 116, 37);
    }
}

padding: 12px;
margin: 20px 25px;
min-width: 150px;
height:200px; 
`
const MainArticle = styled.div`
    width :100%;

    .notion{
        //darkmodechange
        color : #d1cfcf !important;
        caret-color : #d1cfcf !important;
    }
    .notion-page-header{
        //darkmodechange
        font-weight : 750;
        background-color : rgba(196, 232, 202,0.2) !important;
        /* box-shadow: 0px 5px 10px #C4E8CA; */
    }
    .notion-nav-title{
       color : #d1cfcf !important;
    }
`

const MainFrame = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* margin :0.5px 0 0 0 ; */
    background-color: #1a1a1a !important;
   
`