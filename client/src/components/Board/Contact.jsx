import React from 'react'
import { useState, useEffect } from 'react';
import axios from '../../plugins/axios';
import useStore from '../../store/store';
import {Link} from 'react-router-dom';

export default function ContactMe() {
    const { loginStatus} = useStore();
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [data, setData] = useState();
    const [total, setTotal] = useState();
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(-1);
    const [sortByIdx, setSortByIdx] = useState(-1);
    const [searchOptionA, setSearchOptionA] = useState('');
    const [searchOptionB, setSearchOptionB] = useState('');
    const [searchOptions, setSearchOptions] = useState([]);




    useEffect(() => { 

        const request = {
            page: page,
            perPage: perPage,
            sortBy: sortBy,
            sortOrder: sortOrder,
            searchOptionA: searchOptions[0],
            searchOptionB: searchOptions[1],
            sortByIdx: sortByIdx
        }
        axios.get('/api/board/list',{params:request})
            .then(res => { 
                console.log(res)
                if (!res.data.success) { 
                    alert(res.data.error)
                } else {
                    
                  
                    setData(res.data.posts);
                    setTotalPage(res.data.totalPage);
                    setTotal(res.data.total);
                }
                
            })
        }, [page,perPage,sortBy,sortOrder,searchOptions,sortByIdx])
        
       
        let pageNumber = [];
        for (let i = 1; i <= totalPage; i++) { 
            pageNumber.push(i);
        }
    const onPerPageHandler = (e) => { 
        e.preventDefault();
        setPerPage(e.target.value);
        setPage(1);
    }

    const onSearchOptionAHandler = (e) => { 
        e.preventDefault();
        setSearchOptionA(e.target.value);
    }
    const onSearchOptionsHandler = (e) => {
        e.preventDefault()
        setSearchOptions([searchOptionA, searchOptionB])
    }
    console.log(searchOptions)

    const setSortHandlaer = (e) => { 
        console.log(e);
        setSortBy(e);
        sortOrder===1 ? setSortOrder(-1) : setSortOrder(1); 
    }

    const setSortByIdxHandler = () => { 
       
        sortByIdx === 1 ? setSortByIdx(-1) : setSortByIdx(1); 
        
    }
    let i = 0;
    // 아 이거 인덱싱(글번호매기기)제대로하려면 몽구스스키마로 잘라서 가져오지말고
    // 다 가져온다음에 앞에서 짤라줘야함 
    //여기선 인덱싱 없이가고 보일러플레이트로 올릴때는 뒤에서 다 끌고와서 앞에서 짜르도록하자
    
    return (
        <>
            {loginStatus ? (
                <div>
                    
                    <form onSubmit={e=>onSearchOptionsHandler(e)}>
                        <select value={searchOptionA} onChange={onSearchOptionAHandler}>
                            <option value="">선택</option>
                            <option value="title">제목</option>
                            <option value="writer">아이디</option>
                        </select>
                        <input value={searchOptionB} onChange={(e)=> setSearchOptionB(e.target.value) }  type="text" />
                        <button type="submit">검색</button>
                    </form>
                <table border="1">
                    <colgroup>
                    </colgroup>
                    <thead>
                        <tr>
                                <th> <span onClick={setSortByIdxHandler }>번호</span></th>
                                <th> <span onClick={()=>setSortHandlaer('title') }>제목</span> </th>
                                <th> <span onClick={()=>setSortHandlaer('writer') }>작성자</span> </th>
                                <th> <span onClick={()=>setSortHandlaer('createdAt') }>작성날짜</span> </th>
                     </tr>
                    </thead>
                    <tbody>
                            {data && data.map((item, idx) => {
                                const realtime = new Date(item.createdAt).toLocaleString();
                                
                               
                                i++;
                                let index = item.index + (page - 1) * perPage;
                                return (
                                    <tr key={i}>
                                        <td>{index}</td>
                                        <td>{item.title}</td>
                                        <td>{item.writer.userid}</td>
                                        <td>{realtime}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                    </table>
                    <li >
                        <span key={page!==1? page-1 : 0 } onClick={() => { if (page !== 1) { setPage(page - 1) } }}>◀</span>
                    {pageNumber.map((page) => (
                        <span key={page} onClick={() => setPage(page)}>{page}&nbsp;</span>
                        ))}
                        <span key={page!==totalPage? page+1 : totalPage+1} onClick={() => { if (page !== totalPage) { setPage(page + 1) } } }>▶</span>
                        
                            </li>
                    
                        <select value={perPage} onChange={onPerPageHandler}>
                            <option value="10">10개씩보기</option>
                            <option value="15">15개씩보기</option>
                            <option value="20">20개씩보기</option>
                            <option value="30">30개씩보기</option>
                        </select>
                   
            
                    <div>

              
                    </div>
                    <Link to="/write">글쓰기</Link>
                
            </div>
            ) : (<></>)}
     
      </>
      
  )
}
