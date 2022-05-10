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
    const NOTION_PAGE_ID = '83fca179f8314fd784e541e3368df6a5';
    fetch(`https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}`)
      .then(res => res.json())
      .then((resJson) => {
        setResponse(resJson);
      });
  }, [])
  return (
      <div >

          <div style={{overflow:'scroll',maxHeight : 1000,margin:'5px 0 0 0 '}}   >

          <NotionRenderer 
          //    blockMap={staticResponse}
                  blockMap={response}
                  fullPage={true}
        
          />
          </div>
      </div>
  )
}
