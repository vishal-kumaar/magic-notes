import React from 'react'

import editLogo from "../assets/images/edit.svg";
import deleteLogo from "../assets/images/delete.svg";

export default function Todo() {
  return (
    <div className='my-8'>
        <h1 className='font-extrabold font-sans text-black text-3xl'>All Todos</h1>
        <hr />
        <div className='my-5 pl-2 pt-2 bg-gray-100 shadow-md rounded-lg overflow-hidden'>
            <div className='flex justify-between'>
                <div className=''>
                    <input type="checkbox" className='w-4 h-4'/>
                    <div className='inline ml-2 text-xl font-bold'>
                        Todo Title
                    </div>
                </div>
                <div>
                    <img src={editLogo} alt="" className='inline mx-1'/>
                    <img src={deleteLogo} alt="" className='inline mx-1' />
                </div>
            </div>
            <p className='text-lg ml-6 text-gray-500 h-28 pr-1'>
                Todo Task
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aut ex debitis, obcaecati deserunt quibusdam libero soluta incidunt reiciendis aperiam, numquam necessitatibus non! Et tenetur unde delectus quia, pariatur exercitationem.
            </p>
        </div>
    </div>
  )
}