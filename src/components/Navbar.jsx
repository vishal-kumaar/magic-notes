import React from 'react';
import logo from "../assets/images/logo.png";

export default function Navbar(props) {
    return (
        <div className={`flex justify-between px-4 flex-wrap ${props.mode==="dark" ? "bg-black" : "bg-gray-700"}`}>
            <div className='flex items-center'>
                <div className="text-black my-3 bg-white p-1 rounded-lg text-sm font-mono">
                    <img width={25} height={25} src={logo} alt="" />
                </div>
                <div className='text-white font-bold ml-4'>
                    {props.title}
                </div>
            </div>
            <label className="inline-flex relative items-center cursor-pointer my-[15px]">
                <input type="checkbox" className="sr-only peer" id="checkbox" onClick={props.toggleMode}/>
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{props.mode==="dark" ? "Disable" : "Enable"} Dark Mode</span>
            </label>
        </div>
    )
};