import React from 'react';
import { Link } from 'react-router-dom';
import left_arrow from "../assets/images/left_arrow.svg";

export default function Signup(props) {
  return (
    <div>
        <div className='mt-4 ml-2'>
            <Link to="/profile">
                <img src={left_arrow} alt="left-arrow" className={`w-7 h-7 ${props.mode==="light" ? "invert-0" : "invert"}`}/>
            </Link>
        </div>
        <form className='mx-4 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-72 2xl:mx-96 mt-4 mb-10'>
        <div className='font-extrabold text-2xl mb-7 text-center underline'>Sign Up</div>
        <div className='my-6'>
            <input type="text" placeholder='Your Full Name' className={`w-full border-2 py-3 px-6 font-lg outline-none rounded-3xl border-gray-200 text-gray-500 placeholder:text-gray-500`}/>
        </div>
        <div className='my-6'>
            <input type="email" placeholder='Your Email Address' className={`w-full border-2 py-3 px-6 font-lg outline-none rounded-3xl border-gray-200 text-gray-500 placeholder:text-gray-500`}/>
        </div>
        <div className='my-6'>
            <input type="password" placeholder='Password' className={`w-full border-2 py-3 px-6 font-lg outline-none rounded-3xl border-gray-200 text-gray-500 placeholder:text-gray-500`}/>
        </div>
        <div className='my-6'>
            <input type="password" placeholder='Confirm Password' className={`w-full border-2 py-3 px-6 font-lg outline-none rounded-3xl border-gray-200 text-gray-500 placeholder:text-gray-500`}/>
        </div>
        <div className='my-6'>
            <button type="submit" className='border-2 w-full py-3 rounded-3xl font-semibold text-lg bg-blue-500 text-white'>Sign Up</button>
        </div>
        </form>
        <div className='text-center mt-28 font-medium text-gray-400'>
            Already have an account?<Link><span className='text-blue-500'> Log in</span></Link>
        </div>
    </div>
  )
}