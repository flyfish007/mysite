import axios from 'axios'
import { getCookie } from './utils';



// 创建axios实例
const service = axios.create({
  // baseURL: "https://mgw.enmonster.com", // api的base_url
  baseURL: "http://localhost:3000", // api的base_url
})

// respone拦截器
service.interceptors.response.use(
  response => {
    let res = response.data
    // console.log("fetch response:===>"+JSON.stringify(response));
    return response
  },
  (error) => {
    return Promise.reject(error)
  })

service.interceptors.request.use(config => {

  config.headers['X-APP-KEY'] = 'ZUUL_WEB_KEY'  // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改

  // if(!!merchantnfo){
  //   config.headers['X-CSRF-TOKEN'] = ""
  // }
  config.headers['Content-Type'] ='application/json'
  return config
}, error => {

  console.log(error) // for debug
  return Promise.reject(error)
})


export default service

