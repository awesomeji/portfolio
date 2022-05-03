import React from 'react'
import Styled from 'styled-components';
import { useState } from 'react';
import useStore from '../../store/store';
import axios from  '../../plugins/axios';
export default function WritePage() {
    const {userInfo} = useStore();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const onTitleHandler = (e) => { 
        setTitle(e.target.value);
    }
    const onContentHandler = (e) => { 
        setContent(e.target.value);
    }
    const onSubmitHandler = (e) => { 
        e.preventDefault()

        
        let postInfo = {
            title: title,
            content: content,
            writer: userInfo.id
        }
        axios.post('/api/board/write', postInfo)
            .then(res => {
                console.log(res)
            })
        
    }
  return (
    <>
          <h1>Write Page</h1>
          <form onSubmit={e=>onSubmitHandler(e) }>
              <input value={title} onChange={e=> onTitleHandler(e)} type="text" />
              <textarea value={content} onChange={e =>onContentHandler(e) } placeholder='아 인간적으로 이거하는데 뭔 에디터까지 필요하냐거ㅋㅋ 걍쓰쇼' cols="30" rows="10"></textarea>
            <button type="submit">Submit</button>
          </form>
    </>
  )
}
