import { React, useState } from 'react'
import useStore from '../store/store'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';


export default function RegisterPage() {
 
    const navigate = useNavigate();
    const { registerfetch } = useStore();

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
      <div>
          <form onSubmit={ onSubmitHandler}>
              <h1>회원가입</h1>
              <span>ID : </span>
              <input onChange={e=> onIDHandler(e)} value={userID} type="text" />
              <span>Email : </span>
              <input onChange={e=> onEmailHandler(e)} value={email} type="email" />
              <span>Name : </span>
              <input onChange={e=> onNameHandler(e)} value={name} type="text" />
              <span>Password : </span>
              <input onChange={e=> onPWHandler(e)} value={PW} type="password" />
              <span>Confirm password : </span>
              <input onChange={e=> onPWCheckHandler(e)} value={PWCheck} type="password" />
              <button type="submit">register</button>
          </form>
          <div>error{error? error :'nono' }</div>
    </div>
  )
}
