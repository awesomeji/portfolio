import React from 'react'
import { useState, useEffect } from 'react';
import axios from '../../plugins/axios';
import useStore from '../../store/store';
import {Link} from 'react-router-dom';

export default function ContactMe() {
    const { loginStatus, accessToken } = useStore();
    
   

    useEffect(() => { 
        axios.get('/api/board/list')
            .then(res => { 
                console.log(res.data)
                if (!res.data.success) { 
                    alert(res.data.error)
                } else {
                    console.log(res.data.posts)
                }

            })
    }, [])
    return (
        <>
            {loginStatus ? ( <div>
                <table border="1">
                    <colgroup>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>list</th>
                            <th>아</th>
                            <th>거대충</th>
                     </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>list</td>
                            <td>list테이블로있다치자고</td>
                            <td>write랑 view 먼저만들고 해보자고</td>
                        </tr>
                    </tbody>
                </table>
                    <Link to="/write">글쓰기</Link>
                <button >
                    페찌
                    </button>
            </div>
            ) : (<></>)}
     
      </>
      
  )
}
