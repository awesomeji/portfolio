import create from 'zustand'
import {devtools} from 'zustand/middleware'
import axios from '../plugins/axios';
 
const store = (set) =>   ({
        loginStatus: false,
        setLoginStatus: (status) => set({ loginStatus: status }),
        accessToken: '',
        setAccessToken: (token) => set({ accessToken: token }),
        loginfetch: async (dataToSubmit) => {
            const result = await axios.post('api/users/login', dataToSubmit,{ withCredentials: true })
                .then(res => res.data);
            return result;
        },
        auth: async (accessToken) => { 
            const result = await axios.get('/api/users/auth', {
                headers: {
                    'authorization':  accessToken
            }
            })
                .then(res => res.data);
            return result;
        }
      
    })
const useStore = create(
   devtools(store)
);



export default useStore;