import React from 'react'

export default function TodoForm() {
  return (
      <form className='flex justify-center my-6'>
        <div className='flex items-center border-2 p-2 rounded-xl border-gray-400 bg-white'>
          <div>
              <input type="text" placeholder='Add new...' className='outline-none w-60 p-1 text-lg sm:w-96 lg:w-[40rem] xl:w-[60rem] 2xl:w-[70rem] font-mono placeholder:text-gray-500'/>
          </div>
          <div>
              <button type="submit" className='px-3 py-1 text-lg bg-blue-600 text-white rounded font-mono'>Add</button>
          </div>
        </div>
      </form>
  )
}