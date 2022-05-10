import React from 'react'
import { useState,useEffect } from 'react' 
import { NotionRenderer } from 'react-notion'
import 'prismjs/themes/prism-tomorrow.css'; // only needed for code highlighting
import 'react-notion/src/styles.css';
import axios from 'axios'

// const notion = new NotionAPI();
// const recordMap = await notion.getPage('83fca179f8314fd784e541e3368df6a5')


export default function About() {

    
    const [response, setResponse] = useState({})
      useEffect(() => {
    // 두번째 방법
    const NOTION_PAGE_ID = 'c2d5f38d25c640a9a57e41ebfd2fcb7f?v=670f59c16fd2471fa0065e0f5f2e9437';
    fetch(`https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}`)
      .then(res => res.json())
      .then((resJson) => {
        setResponse(resJson);
      });
  }, [])
  return (
      <div >

          <div   >

          <NotionRenderer 
          //    blockMap={staticResponse}
          blockMap={response}
        
          />
          </div>
      </div>
  )
}
