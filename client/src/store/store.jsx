import create from 'zustand'
import axios from 'axios';
// import { header } from 'express/lib/response';


const useStore = create(
    set => ({
        // count: 0,
        // increaseCount: () => set(state => ({count: state.count +1})),
        // decreaseCount: () => set(state => ({ count: state.count - 1 })),
        // onSubmit: (input) => set({ count: input }),
        loginStatus: false,
        setLoginStatus: (status) => set({ loginStatus: status }),
        loginfetch: async (dataToSubmit) => {
            const result = await axios.post('api/users/login', dataToSubmit)
                .then(res => res.data);
            return result;
        },
        accessToken: '',
        setAccessToken: (token) => set({ accessToken: token }),
        auth: async (token) => { 
            const result = await axios.get('/api/users/auth', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => res.data);
            return result;
        }
      
    })
);

export default useStore;