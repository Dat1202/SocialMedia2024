import axios from "axios";
import cookie from "react-cookies";

// const SERVER_CONTEXT = ""
const BASE_URL = "https://localhost:44389/api"
// const BASE_CONTEXT = "/api";

export const endpoints = {
    "menu": "/Test/GetAllTest/",
    "login": "/Authentication/login/",
    "getCurrentUser": "/Authentication/current-user/",
    "register": "/User/register/",
    "uploadAvatar": "/User/upload-avatar/",
    "profile": "/User/profile/", 
    "post": "/Post/",
    "action": "/Post/actions/",
    "notification": "/Notification/",
    "friendStatus": "/Friend/status/",
}
const instance = axios.create({
    baseURL: BASE_URL
})

export const authApis = () => {
    const token = cookie.load('token');
    const authInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    authInstance.interceptors.request.use(function (config) {
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    authInstance.interceptors.response.use(function (response) {
        return response && response.data ? response.data : response;
    }, function (error) {
        return Promise.reject(error);
    });

    return authInstance;
};


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