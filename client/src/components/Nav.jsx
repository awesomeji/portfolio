import React from 'react'
import axios from '../plugins/axios'
import useStore from '../store/store'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Link, Routes, Route, Outlet } from "react-router-dom";
export default function Nav() {
     const navigate = useNavigate();
    const {setLoginStatus,loginStatus,setAccessToken} = useStore()
      const logoutHandler =() =>{
    axios.get("/api/users/logout")
     .then(res=>{
       if(res.data.logoutsuccess){
         
        setLoginStatus(false); 
        setAccessToken('');
        navigate('/login')
        
         
     }else{
         alert("Logout failed")
 
     }
   })
 }

  return (
      <>
          {loginStatus ? 
              (<div>
                  <h1>대충로고랑앱이름</h1>
                
                  <div><Link to="/about">포폴</Link>  </div>
                  <div><Link to="/contact">컨택미</Link>  </div>
                  <div> 크레딧 </div>
                  <div> <button onClick={logoutHandler}>logout</button> </div>
            </div> )
              : (<div>
                  <h1>대충로고랑앱이름</h1>
                  <div> 포폴 </div>
                  <div> 컨택미 </div>
                  <div> 크레딧 </div>
                  <div> 로긴/레지스터버튼 </div>
           </div>) }    
      </>
  )
}
