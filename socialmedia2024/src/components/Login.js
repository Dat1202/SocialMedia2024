import React, { useState } from 'react'
import { Google } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import Apis, { endpoints } from '../configs/Apis';
import cookie from "react-cookies";
import Modal from './Modal';

const Login = () => {
    const nav = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const login = async (e) =>{
        e.preventDefault();
        const process = async () => {
            try{
                let res = await Apis.post(endpoints['login'], {
                    "username": username,
                    "password": password
                })
                cookie.save("token", res.data.accessToken)
                console.log(cookie.load("token"))
                console.log(res)
                nav("/")
            } catch(ex){
                console.log(ex)
            }
        }
        process();
    }

    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-out">
                <h2 className='p-3 text-3xl font-bold text-pink-400'>Wolf</h2>
                <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
                <h3 className='text-xl font-semibold text-blue-400 pt-2'>Sign In!</h3>
                <div className='flex m-4 items-center justify-center'>
                    <div className="socialIcon">
                        <Google />
                    </div>
                </div>
                {/* Inputs */}
                <form onSubmit={login}>
                    <div className='flex flex-col items-center justify-center'>
                        <input type='text' value={username} onChange={e => {setUsername(e.target.value)}} className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' placeholder='Email'></input>
                        <input type="password" value={password} onChange={e => {setPassword(e.target.value)}} className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' placeholder='Password'></input>
                        <input type="submit" value="Đăng nhập" className='btn rounded-2xl m-2 text-white bg-blue-400 w-3/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in' />
                        <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
                        <p className='text-blue-400 mt-4 text-sm'>Don't have an account?</p>
                        <p onClick={openModal} className='text-blue-400 mb-4 text-sm font-medium cursor-pointer'>Create a New Account?</p>
                    </div>
               </form>
                <Modal isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </div>
    )
}

export default Login;