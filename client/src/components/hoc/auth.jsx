
import useStore from '../../store/store';
import {useEffect} from 'react'
import axios from '../../plugins/axios'
import { useParams, useLocation, useNavigate } from 'react-router-dom';


export default function (SpecificComponent, option, adminRoute = null) {

    const {auth,accessToken}= useStore();
   
    // option = null // pages taht anyone can access
    // true // pages that only loginuser can access
    // false // pages that loginuser can not access
    // adiminRoute = null // pages that only admin can access
    function AuthenticationCheck(props){

        const navigate = useNavigate();
    useEffect(()=>{
        auth(accessToken).then(res => {
            console.log(res)
            if (!res.isAuth) {
                console.log('option : ' + option)
                if (option) {
                    navigate('/login')
                }
            } else { 
                if (adminRoute && !res.isAdmin) {
                   
                    navigate('/login')
                } else { 
                 
                        if(!option){
                            navigate('/')
         
            }
                    
                }
            }
        });

    },[])
    return(
        <SpecificComponent {...props} navigate={navigate}/>
     )
  }


  return AuthenticationCheck
}
