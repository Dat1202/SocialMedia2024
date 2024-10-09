import axios from "axios";
import cookie from "react-cookies";

// const SERVER_CONTEXT = ""
const BASE_URL = "https://localhost:44389/api"
// const BASE_CONTEXT = "/api";

export const endpoints = {
    "menu": "/Test/GetAllTest/",
    "login": "/Authentication/login/",
    "getCurrentUser": "/Authentication/get-current-user/",
    "register": "/User/register/",
    "uploadImage": "/Cloudinary/UploadImage/upload/"
}
const instance = axios.create({
    baseURL: BASE_URL
})

export const authApis = () =>{
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${cookie.load('token')}`
        }
    })
}

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response && response.data ? response.data : response ;
}, function (error) {
    return Promise.reject(error);
});

export default instance;