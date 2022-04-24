import React from 'react'
import styled from 'styled-components';
import { useState,useEffect } from 'react';
import useStore from '../store/store';


export default function LoginPage() {
    //state for login info
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState([]);

    //
    const { loginfetch,loginStatus,setLoginStatus,accessToken,setAccessToken } = useStore();
   
    //prevent default submit
    const onUseridHandler = (e) => { 
        setUserID(e.target.value);
    }
    const onPasswordHandler = (e) => { 
        setPassword(e.target.value);
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log('userID : ' + userID)
        console.log('password : ' + password)

        let loginInfo = {
            userid: userID,
            password: password
    
        }
        loginfetch(loginInfo)
            .then(res => {
                console.log(res)
                if (res.loginsuccess) {
                    console.log(res)
                    setLoginStatus(true);
                    
                     setError([]);
                } else { 
                    setError(res.message);
                    alert(res.message);
                }
            });
    }

    useEffect((error) => { 

    })


  return (
    <div className='loginContainer'>
    <h2>
    LoginPage
    </h2>
    <div className='row'>
        <form onSubmit={e => onSubmitHandler(e)} className='col 12'>
            <div className='row'>
            <label htmlFor="userID">ID :</label>
                      <input type="text" id='userID' name='userID' value={userID} onChange={e=>onUseridHandler(e)} placeholder='ID' />
                      
            <label htmlFor="password">Password :</label>
            <input type="password" id='password' name='password' value={password} onChange={e=>onPasswordHandler(e)} placeholder='Password' />    
        </div>
        <button type='submit'>sign in</button>          
        <button>sign up</button>          
        </form>
          </div>
          <div>loginStatus : {loginStatus ? 'true' : 'false'}</div>
          <div>errormessage : {error ? error : ''}</div>
      </div>
  )
}
