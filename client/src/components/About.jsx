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
    const [onClickColor,setOnClickColor] = useState('')

    const setActiveColor = (e) => { 
        
        const color = e.target.href.split('#')[1]
       
        setOnClickColor(color)
    }
    
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
                setArticleList(resJson);
               
            });     
        

      }, [isEnglishMode])
    useEffect( () => { 
        if (document.getElementsByClassName('active')[0]) { 
            console.log(document.getElementsByClassName('active'))
             document.getElementsByClassName('active')[0].classList.remove('active')
            }
            if (onClickColor) {
                
                document.getElementsByClassName(onClickColor)[0].classList.add('active')
            }
        // if (document.getElementsByClassName(onClickColor)!==undefined) { 
        // }
    }, [onClickColor])
    return (
        <ThemeProvider theme={isDarkMode ? inDarkMode : inLightMode}>
            
            <MainFrame>
                <SideBar>
                    <ul>
                    <li>
                            <a href="#section1" className='section1' onClick={e => setActiveColor(e)}>{isEnglishMode ? 'Self-introduction' : '자기소개'}</a>
                    </li>
                        
                    <li>
                    <a href="#section2" className='section2' onClick={e=>setActiveColor(e)}>{isEnglishMode ? 'Projects' : '프로젝트'}</a>
                    </li>
                    <li>
                    <a href="#section3" className='section3' onClick={e=>setActiveColor(e)}>{isEnglishMode ? 'Contact' : '연락처'}</a>
                    </li>
                    </ul>
                </SideBar>
                <section id='section1'>

    <MainArticle>
    <NotionRenderer 
    //    blockMap={staticResponse}
    blockMap={mainArticle}
    fullPage={true}
    
    />
    </MainArticle>
                </section>
                <section id='section2' style={{minHeight:'150px'}}>
                </section>
   

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
                <ContactSection id='section3' style={{ minHeight: '300px', width: '100%' }}>
                    <h1>contact</h1>
                    <SvgDiv> 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" width='50' height='50' fill='white' stroke='black'>
        {/* <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
        </svg>
            <span><a href="https://github.com/awesomeji">https://github.com/awesomeji</a></span>            
        </SvgDiv>
        </ContactSection>
      </MainFrame>
        </ThemeProvider>
       
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

const SideBar = styled.div`
   background:  ${props => props.theme.backgroundColor};
    height: 90%;
    width: 10%;
    position: fixed;
    bottom: 0;
    left: 0;
        .active{
                 color:${props => props.theme.articleHoverCL};
                border-bottom: 2px solid ${props => props.theme.articleHoverCL};
                font-weight: 900;
                 }
             
 
    ul{
        list-style: none;
        margin :100px auto;
        li{
            margin : 20px 0 20px 0;
            padding : 10px 0 10px 0;
            a{
                color:${props => props.theme.color};
                text-decoration: none !important;
                font-weight : 600;
                &:hover{
                    color:${props => props.theme.articleHoverCL};
                    border-bottom: 2px solid ${props => props.theme.articleHoverCL};
                }
            
            }
        }
        }
        
`

const SvgDiv = styled.div`


`
const ContactSection = styled.div`

    display: flex;
    flex-wrap : wrap;
    align-items : right;
    max-width: 60%;
    margin : auto;
    flex-direction: column;
    justify-content: space-around;
    padding : 200px 0 0 60px;
    
        color : ${props => props.theme.color};
    
`