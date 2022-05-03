import React from 'react'
import { useState,useEffect } from 'react';
import useStore from '../../store/store';
import {Link} from 'react-router-dom';

export default function ContactMe() {
        const {loginStatus,accessToken} = useStore();
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
                    <Link to="/write">글쓰기</Link>
                </table>
      </div>) :(<></>) }
     
      </>
      
  )
}
