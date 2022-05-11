import React from 'react'
import { useState,useEffect } from 'react' 
import { NotionRenderer } from 'react-notion'
import 'prismjs/themes/prism-tomorrow.css'; // only needed for code highlighting
import 'react-notion/src/styles.css';
import axios from 'axios'


// const notion = new NotionAPI();
// const recordMap = await notion.getPage('83fca179f8314fd784e541e3368df6a5')

export function Article(props) {
  return (
     <div style={{ backgroundColor: '#b0ffc0', borderRadius: 8, padding: 12, margin: 12, width: 'max-content' }}>
      <a href={props.link} style={{ textDecoration: 'none' }}>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <p>{props.date}</p>
      </a>
    </div>
  )
}

export default function About() {

    
    const [ArticleList, setArticleList] = useState([])
    useEffect(() => { 
         const NOTION_TABLE_ID = 'e0d1a00fc0cd4590afb5704f59bc72df';
        fetch(`https://notion-api.splitbee.io/v1/table/${NOTION_TABLE_ID}`)
      .then(res =>res.json())
            .then((resJson) => {
          console.log(resJson)
        setArticleList(resJson);
      });

     
    }, [])
  return (
     <div>
        {response.map((blog, index) => {
          return (
            <Article
              title={blog.title}
              description={blog.description}
              date={blog.date}
              link={'/blog/' + blog.slug}
              key={index}
            />
          )
        })}
      </div>
  )
}
