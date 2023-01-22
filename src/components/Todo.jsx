import React from 'react';
import editLogo from "../assets/images/edit.svg";
import deleteLogo from "../assets/images/delete.svg";
import leftArrow from "../assets/images/left_arrow.svg";
import saveLogo from "../assets/images/save.svg";

export default function Tasks() {
  return (
    <div className=''>
      <div className='flex justify-between p-2 bg-slate-400'>
        <div className='flex items-center'>
            <img src={leftArrow} alt="back-button" className='w-5'/>
            <h1 className='ml-3 text-3xl font-bold'>Todo Title</h1>
        </div>
        <div className='flex'>
            <img src={editLogo} alt="edit-button" className='w-6 mx-1'/>
            <img src={deleteLogo} alt="delete-button" className='w-6 mx-1'/>
            <img src={saveLogo} alt="save-button" className='w-6 mx-1'/>
        </div>
      </div>
      <div className='mt-4 mx-8'>
        <div className='flex items-top mb-2'>
            <input type="checkbox" className='w-4 h-4 mt-2'/>
            <div className='ml-3 text-2xl font-semibold'>Todo item 1</div>
        </div>
        <div className='flex items-top mb-2'>
            <input type="checkbox" className='w-4 h-4 mt-2'/>
            <div className='ml-3 text-2xl font-semibold'>Todo item 2</div>
        </div>
        <button className='bg-green-500 text-white font-serif text-sm font-medium py-1 px-2 rounded-md ml-7 mt-1'>Add more</button>
      </div>
    </div>
  )
}
