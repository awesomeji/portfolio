import React from 'react';
import { useState, useEffect } from 'react';
import axios from '../../plugins/axios';
import useStore from '../../store/store';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import { ThemeProvider} from 'styled-components'
import { inherits } from 'util';

export default function ContactMe() {
    const { loginStatus,isDarkMode,inDarkMode,inLightMode} = useStore();
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
            console.log(pageNumber)
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
        <div >
            {loginStatus ? (
                <ThemeProvider theme={isDarkMode ? inDarkMode : inLightMode}>
                    <StyledFrame>
                        <div className='p'>Any kind of feedback, suggestions or crirtics are welcome. <br /> Leave your contact in message, I will call you as soon as possible</div>
                    
                  
                <StyledTable>
                        <colgroup>
                            <col width="5%" />
                            <col width="60%"/>
                            <col width="15%"/>
                            <col width="20%"/>
                    </colgroup>
                    <thead>
                        <tr>
                                <th> <StyledSpan onClick={setSortByIdxHandler }>번호</StyledSpan></th>
                                <th> <StyledSpan onClick={()=>setSortHandlaer('title') }>제목</StyledSpan> </th>
                                <th> <StyledSpan onClick={()=>setSortHandlaer('writer') }>작성자</StyledSpan> </th>
                                <th> <StyledSpan onClick={()=>setSortHandlaer('createdAt') }>작성날짜</StyledSpan> </th>
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
                    </StyledTable>
                        <li style={{ listStyleType: 'none' }} >
                        <span key={page!==1? page-1 : 0 } onClick={() => { if (page !== 1) { setPage(page - 1) } }}>◀</span>
                            &nbsp;
                            &nbsp;
                            &nbsp;
                    {pageNumber.map((page) => (
                        <span key={page} onClick={() => setPage(page)}>{page}&nbsp;&nbsp;&nbsp;</span>
                    
                        ))}
                        &nbsp;
                        <span key={page!==totalPage? page+1 : totalPage+1} onClick={() => { if (page !== totalPage) { setPage(page + 1) } } }>▶</span>
                            </li>
                        <br />

                        <StyledScrumbs>
                        <select value={perPage} onChange={onPerPageHandler}>
                            <option value="10">10개씩보기</option>
                            <option value="15">15개씩보기</option>
                            <option value="20">20개씩보기</option>
                            <option value="30">30개씩보기</option>
                        </select>
                 
                      <form onSubmit={e=>onSearchOptionsHandler(e)}>
                        <select value={searchOptionA} onChange={onSearchOptionAHandler}>
                            <option value="">선택</option>
                            <option value="title">제목</option>
                            <option value="writer">아이디</option>
                        </select>
                        <input value={searchOptionB} onChange={(e)=> setSearchOptionB(e.target.value) }  type="text" />
                        <button type="submit">검색</button>
                        </form>
                            <br />
                            
                            
                            <StyledLink to="/write">글쓰기</StyledLink>
                            
                
                        </StyledScrumbs>
                    </StyledFrame>
                </ThemeProvider>
            ) : (<></>)}
     
      </div>
      
  )
}

const StyledFrame = Styled.div`
    /* font-family: 'Orbitron', sans-serif; */
    font-family: 'Gowun Dodum', sans-serif;
    
   background-color: ${props => props.theme.backgroundColor};
    color : ${props => props.theme.color};
        caret-color : ${props => props.theme.color};
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:100%;
    height:90%;
    margin :  auto;
    /* padding : 150px 0 0 0; */

    .p{
         font-family: 'Orbitron', sans-serif;
        font-size:2rem;
        height:200px;
        width : 50%;
        /* padding : 20px 0 0 0; */
        margin : 40px 0 10px 0; 
    }   
`
const StyledTable = Styled.table`
    width : 70%;
    text-align : center;
    border : ${props => props.theme.greenLine};
    borer-radius : 50px;
    
    border-collapse: collapse;
    thead{
        background-color : black;
        tr{
            height : 45px;
        }
        th{
            color : ${props => props.theme.table};
             span:hover{
        color : white;
        }
        }
        /* th:nth-child(1){
            border-radius : 15px 0 0 0;
        }
        th:nth-child(4){
            border-radius : 0 15px 0 0;
        } */
    }
    tbody{
        border : ${props => props.theme.greenLine};
        font-size : 1.2rem;
        font-weight : 800;
    }
    tbody tr{
        height :40px;
    }
    tbody tr:nth-child(odd){
        background-color :  ${props => props.theme.tr};

    }
`

const StyledSpan = Styled.span`
    cursor : pointer;
    font-size : 20px;
   
`
const StyledScrumbs = Styled.div`
    width : 30%;

    display : flex;
    justify-content : space-between;

    select{
        height : 30px;
    }
`

const StyledLink = Styled(Link)`
padding : 20px 0 0 0;
text-align : center;
border : 1px solid red;
height : 50px;
width : 100px;
text-decoration : none;

color :#d1cfcf ;

&:hover{

color :#C4E8CA;

}

`