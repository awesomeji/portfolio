
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
        colorCT: '#d1cfcf !important',
        backgroundColor: '#1a1a1a !important',
        backgroundColorNV: '#1a1a1a !important',
        greenLine: ' 2px solid rgb(56, 116, 37);',
        table: ' rgb(58, 160, 27)',
        tr : 'rgb(56, 116, 37);',
        articleBG: 'rgba(255,255,255,0.1);',
        articleHoverCL: 'rgb(56, 116, 37) !important;',
        navShadow:'0px 5px 5px rgb(56, 116, 37)'
    },
    inLightMode: {
        color: '#37352F !important',
        colorCT: '#000000 !important',
        backgroundColor: '#E8E8E8 !important',
        backgroundColorNV: '#057214 !important',
        greenLine: ' 2px solid black',
        table: '#E8E8E8',
        tr : '#f2f2f2;',
        articleBG: '#dcdcdc;',
        articleHoverCL: 'white !important;',
        navShadow : '0px 10px 5px #565050;'
    },
    isEnglishMode: true,
    setIsEnglishMode : (isEnglishMode) => set(state => ({...state, isEnglishMode})),
    inEnglishMOde: {fontFamily: "'Orbitron', sans-serif"},
    inKoreanMode: {fontFamily: "'Noto Sans KR', sans-serif"},
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