import React from 'react';
import { logo } from '../assets'
import {accessUrl} from '../redux/services/apiDataServices'
const Login = () => {

    console.log(window.origin.toString());
    return (
        <>
            <div className='flex flex-col justify-around 
            items-center h-screen w-full p-6 bg-black text-white'>
                <img src={logo} alt='' />
                <a className='bg-slate-600 px-6 py-3 rounded-md cursor-pointer'
                    href={accessUrl}>LogIn</a>
            </div>
        </>
    )
};
export default Login;