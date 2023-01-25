import React from 'react';
import deleteLogo from "../assets/images/delete.svg";
import leftArrow from "../assets/images/left_arrow.svg";
import saveLogo from "../assets/images/save.svg";
import colorMode from "../assets/images/color_mode.png";
import { Link } from 'react-router-dom';

export default function Todo(props) {
  return (
    <div className=''>
      <div className={`flex items-center justify-between p-2 ${props.mode==="light" ? "bg-slate-400" : "bg-black"}`}>
        <div className='flex items-center'>
            <Link to={"/"}><img src={leftArrow} alt="back-button" className={`w-6 ${props.mode==="light" ? "invert-0" : "invert"}`}/></Link>
            <h1 className={`ml-3 text-3xl font-bold outline-none ${props.mode==="light" ? "text-black" : "text-white"}`} contentEditable={true}>Todo Title</h1>
        </div>
        <div className='flex'>
            <img src={colorMode} alt="color-mode" className={`w-7 h-7 mx-2 ${props.mode==="light" ? "invert-0" : "invert"}`} onClick={props.toggleMode}/>
            <img src={saveLogo} alt="save-button" className={`w-7 h-7 mx-1 ${props.mode==="light" ? "invert-0" : "invert"}`}/>
        </div>
      </div>
      <div className='mt-4 mx-8'>
        <div className='flex justify-between items-top mb-2'>
          <div className='flex item-top w-[100%]'>
            <input type="checkbox" className='w-4 h-4 mt-2 mr-3'/>
            <div className={`text-2xl font-semibold outline-none ${props.mode==="light" ? "text-black" : "text-white"}`} contentEditable={true}>Todo item 1</div>
          </div>
          <div>
            <img src={deleteLogo} alt="" className={`w-6 h-6 mx-4 ${props.mode==="light" ? "invert-0" : "invert"}`}/>
          </div>
        </div>
        <div className='flex justify-between items-top mb-2'>
          <div className='flex item-top w-[100%]'>
            <input type="checkbox" className='w-4 h-4 mt-2 mr-3'/>
            <div className={`text-2xl font-semibold outline-none ${props.mode==="light" ? "text-black" : "text-white"}`} contentEditable={true}>Todo item 2</div>
          </div>
          <div>
            <img src={deleteLogo} alt="" className={`w-6 h-6 mx-4 ${props.mode==="light" ? "invert-0" : "invert"}`}/>
          </div>
        </div>
        <button className='bg-green-500 text-white font-serif text-sm font-medium py-1 px-4 rounded ml-7 mt-1'>Add more</button>
      </div>
    </div>
  )
}
