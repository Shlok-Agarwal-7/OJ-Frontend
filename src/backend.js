import axios from "axios"


const apiClient=axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
})

export const setClientToken=(token)=>{
  apiClient.interceptors.request.use(async function(config){
    config.headers.Authorization="Bearer "+ token;
    return config;
  })
}

export default apiClient