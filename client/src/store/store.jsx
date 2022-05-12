import create from 'zustand'
import {devtools} from 'zustand/middleware'
import axios from '../plugins/axios';

const store = (set) => ({
    isDarkMode: true,
    setIsDarkMode: (isDarkMode) => set(state => ({...state, isDarkMode})),
    userInfo: {
        id : '',
        userid : '',
        role : '',
    },
    inDarkMode: {
        color: '#d1cfcf !important',
        backgroundColor: '#1a1a1a !important',
        backgroundColorWithOP: 'rgba(196, 232, 202,0.2) !important',
        greenLine: ' 2px solid rgb(56, 116, 37);'
    },
    inLightMode: {
        color: '#37352F !important',
        backgroundColor: '#E8E8E8 !important',
        greenLine: ' 2px solid black'
    },
    setUserInfo: (id, userid, role) => set({
        userInfo:{
        id: id,
        userid: userid,
        role: role
    }
    }),
    loginStatus: false,
    setLoginStatus: (status) => set({ loginStatus: status }),

    accessToken: '',
    setAccessToken: (token) => set({ accessToken: token }),

    loginfetch: async (dataToSubmit) => {
        const result = await axios.post('api/users/login', dataToSubmit,{ withCredentials: true })
            .then(res => res.data);
        return result;
    },
    
    registerfetch: async (resigterInfo) => { 
    const result = await axios.post('api/users/register', resigterInfo)
        .then(res => res.data);
    return result;
    },

    auth: async (accessToken) => { 
        const result = await axios.get('/api/users/auth', {
        headers: {'authorization' :  accessToken}
        })
        .then(res => res.data);
        return result;
    }
    
    
})
    
const useStore = create(
   devtools(store)
);



export default useStore;