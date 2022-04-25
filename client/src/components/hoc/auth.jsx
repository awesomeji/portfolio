
import useStore from '../../store/store';
import {useEffect} from 'react'
import axios from '../../plugins/axios'



export default function (SpecificComponent, option, adminRoute = null) {

    
    // option = null // pages taht anyone can access
    // true // pages that only loginuser can access
    // false // pages that loginuser can not access
    // adiminRoute = null // pages that only admin can access
    function AuthenticationCheck(props){
      const {auth,accessToken}= useStore();


    useEffect(()=>{
        console.log('accessToken : ' + accessToken)
        auth(accessToken).then(res => { console.log(res)});

    },[])
    return(
      <SpecificComponent {...props}/>
     )
  }


  return AuthenticationCheck
}
