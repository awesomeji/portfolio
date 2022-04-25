import { defineConfig, HttpProxy } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,  
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
                // configure: (proxy, options) => {
                //   // proxy 변수에는 'http-proxy'의 인스턴스가 전달됩니다
                // }
            }
        },
    
    }
  

})
