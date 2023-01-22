import React from 'react'
import { Link } from 'react-router-dom';
import deleteLogo from "../assets/images/delete.svg";

export default function Todo() {
  return (
    <div className='my-8'>
        <h1 className='font-extrabold font-sans text-black text-3xl'>All Todos</h1>
        <hr />
        <Link className='my-5 pl-2 pt-2 bg-gray-100 shadow-md rounded-lg overflow-hidden' to={"/todo"}>
            <div className='flex justify-between'>
                <div className=''>
                    <input type="checkbox" className='w-4 h-4'/>
                    <div className='inline ml-2 text-xl font-bold'>
                        Todo Title
                    </div>
                </div>
                <div>
                    <img src={deleteLogo} alt="" className='inline mx-1' />
                </div>
            </div>
            <p className='h-28 pr-1 ml-6'>
                <div className='text-lg text-gray-500 '>Task 1</div>
                <div className='text-lg text-gray-500 '>Task 2</div>
                <div className='text-lg text-gray-500 '>Task 3</div>
            </p>
        </Link>
    </div>
  )
}