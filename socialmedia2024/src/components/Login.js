import React, {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import cookie from "react-cookies";
import Apis, { endpoints } from "../configs/Apis";
// import { MyUserContext } from "../../App";

const Login = () => {

    // const [user, dispatch] = useContext(MyUserContext);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    // const [q] = useSearchParams();

    const login = async (e) => {
        e.preventDefault();
            const process = async () => {
                try {
                    let res = await Apis.post(endpoints['login'], {
                        "username": username,
                        "password": password
                    })
                    cookie.save("token", res.data.accessToken)
                    console.log(cookie.load("token"))
                    // let { data } = await authApis().get(endpoints['current-user']);
                    // cookie.save("user", data)
                    // dispatch({
                    //     "type": "login",
                    //     "payload": data
                    // })
                    navigate('/');

                } catch (ex) {
                    console.error(ex);
                }
            }
            process();
        }
    
    // if (user !== null) {
    //     let url = q.get("next") || "/";
    //     return <Navigate to={url} />
    // }

    return (
        <>
            <section class="container__form">
                <h1>Đăng nhập</h1>
                div.container      

                <form onSubmit={login}>
                    <div class="form-control">
                        <input value={username} onChange={e => setUsername(e.target.value)}
                            type="text" id="email" placeholder="Nhập username" />
                    </div>

                    <div class="form-control">
                        <input value={password} onChange={e => setPassword(e.target.value)}
                            type="password" id="password" placeholder="Nhập mật khẩu" />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>               
                    <div class="signup_link">Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link></div>
                </form >
            </section>
        </>
    )
}

export default Login