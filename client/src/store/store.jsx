import create from 'zustand'
import axios from '../plugins/axios';



const useStore = create(
    set => ({
        loginStatus: false,
        setLoginStatus: (status) => set({ loginStatus: status }),
        loginfetch: async (dataToSubmit) => {
            const result = await axios.post('api/users/login', dataToSubmit)
                .then(res => res.data);
            return result;
        },
        accessToken:'',
        setAccessToken: (token) => set({ accessToken: token }),
        auth: async (token) => { 
            const result = await axios.get('/api/users/auth', {
                headers: {
                    'authorization':  token
            }
            })
                .then(res => res.data);
            return result;
        }
      
    })
);



export default useStore;