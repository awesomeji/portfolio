import React from 'react';
import { useState } from 'react';
import useStore from '../../store/store';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function RegisterPage() {
 
    const navigate = useNavigate();
    const { registerfetch,isEnglishMode } = useStore();

    const [userID , setUserID] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [ PW, setPW ] = useState('');
    const [PWCheck, setPWCheck] = useState('');
    const [error, setError] = useState([]);

    const onIDHandler = (e) => { 
        setUserID(e.target.value)
    }
    const onEmailHandler = (e) => { 
        setEmail(e.target.value)
    }
    const onNameHandler = (e) => { 
        setName(e.target.value)
    }
    const onPWHandler = (e) => { 
        setPW(e.target.value)
    }
    const onPWCheckHandler = (e) => { 
        setPWCheck(e.target.value)
    }

    const onSubmitHandler = (e) => { 
        e.preventDefault()

        if(PW!==PWCheck){
            alert("비밀번호가 일치하지 않습니다.")
            return
        }
        let registerInfo = {
            userid: userID,
            email: email,
            name: name,
            password: PW
        }
        registerfetch(registerInfo)
            .then( res =>  {
                if (res.error) { 
                     console.log(res.error.message)
                    // setError([res.error.message]);
                    let errorSplit = res.error.message.split('/')
                    for (var i in errorSplit) { 
                            // console.log(errorSplit)
                        if (errorSplit[i] !== '') { 
                            if (errorSplit[i].slice(0, 1) == ',') { 
                            errorSplit[i] = errorSplit[i].substring(1)
                            }
                            const err = errorSplit[i].trim()
                            
                            if (err !=='') {
                            setError(oldarray => [...oldarray, err])
                            }
                            
                            //mysweetalert2로 교체하자거
                            
                            alert(error[i])
                        }
                    }
                } else if(res.success){ 
                    alert("환영합니다^오^")
                    navigate('/login')
                }
              
            })
    }
  return (
   
          <StyledRegister onSubmit={onSubmitHandler}>
            <StyledForm>
            <h1>{isEnglishMode ? 'Sign Up' : '회원가입' }</h1>
            <span>{isEnglishMode ? 'ID' : '아이디' }  </span>
            <StyledInput  onChange={e=> onIDHandler(e)} value={userID} type="text" />
            <span>{isEnglishMode ? 'Email' : '이메일' }   </span>
            <StyledInput  onChange={e=> onEmailHandler(e)} value={email} type="email" />
            <span>{isEnglishMode ? 'Name' : '이름' }   </span>
            <StyledInput  onChange={e=> onNameHandler(e)} value={name} type="text" />
            <span>{isEnglishMode ? 'Password' : '비밀번호' }   </span>
            <StyledInput  onChange={e=> onPWHandler(e)} value={PW} type="password" />
            <span>{isEnglishMode ? 'Confirm Password' : '비밀번호 확인' }  </span>
            <StyledInput  onChange={e=> onPWCheckHandler(e)} value={PWCheck} type="password" />
            <StyledButton type="submit">{isEnglishMode ? 'Sign up' : '회원가입' }</StyledButton>
            </StyledForm>
          </StyledRegister>

  )
}
const StyledRegister = styled.div`

/* border : 3px solid #F5F5F5; */
width : 40%;
min-height : 30rem;
/* min-height : 30rem; */
margin : 0 auto;
position:relative;
top:200px;
border-radius : 1.5rem;
font-family: 'Orbitron', sans-serif;
`;

const StyledForm = styled.form`
margin : 1rem auto;
height : 37rem;
align-items : center;
display : flex;
flex-direction : column;
justify-content : space-around;
background-color : #000000;
width : 70%;
color : white;
border-radius : 1rem;

.contents_wrap{
width:400px;
display : flex;
justify-content: space-around;
align-items : center;
flex-direction: column;
}

span{
display : flex;
justify-content: flex-start;
align-items : center;
width:250px;
margin-bottom:6px;
}
`;

const StyledInput = styled.input`
height : 2rem;
width : 15rem;
border-radius : 0.5rem;
border : 1px solid white;
`;

const StyledButton = styled.button`
font-family: 'Orbitron', sans-serif;
margin : 0 1rem;
min-width : 4rem;
min-height : 2rem;
background: none;
border : 1px solid white;
cursor : pointer;
color : black;
background-color : white;
border-radius : 0.5rem;
&hover{
color :#0C6D10;
}`;