import React from 'react';
import logo from "../assets/images/logo.png";
import colorMode from "../assets/images/color_mode.png";
import { Link } from 'react-router-dom';

export default function Navbar(props) {
    return (
        <div className={`flex sticky w-full top-0 left-0 justify-between items-center px-4 flex-wrap ${props.mode==="dark" ? "bg-black" : "bg-gray-700"}`}>
            <div className='flex items-center'>
                <div className="text-black my-3 bg-white p-1 rounded-lg text-sm font-mono">
                    <img width={25} height={25} src={logo} alt="" />
                </div>
                <div className='text-white font-bold ml-4'>
                    {props.title}
                </div>
            </div>
            <div className='flex items-center text-white justify-between'>
                <div className='mx-2'>
                    <img src={colorMode} alt="color-mode" className='invert w-6 h-6 cursor-pointer' onClick={props.toggleMode}/>
                </div>
                <div className='mx-2 block'>
                    Hi, Vishal
                </div>
                <div className='mx-2 hidden'>
                    <Link to={"/login"}>Signup/Login</Link>
                </div>
                <div className='mx-2'>
                    <Link to={"/"}>Logout</Link>
                </div>
            </div>
        </div>
    )
};