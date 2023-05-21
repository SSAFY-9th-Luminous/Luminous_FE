import axios from "axios";

axios.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('access-token')
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }
)