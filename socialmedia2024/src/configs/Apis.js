import axios from "axios";
import cookie from "react-cookies";

// const SERVER_CONTEXT = ""
const BASE_URL = "https://localhost:44389/api"

export const endpoints = {
    "menu": "/Test/GetAllTest/",
    "login": "/Authentication/login/",
    "register": "/User/register/"
}
export default axios.create({
    baseURL: BASE_URL
})

export const authApi = () =>{
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': cookie.load('token')
        }
    })
}