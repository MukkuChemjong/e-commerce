import React from 'react'
import { Outlet } from 'react-router-dom'

const Authlayout = () => {
  return (
    <div className='flex min-h-screen w-full'>
      <div className='w-1/2 bg-black flex items-center justify-center'>
        <div className='text-white text-[30px] font-extrabold'>
          <h1>Welcome to the Ecommerce Website</h1>
        </div>
      </div>
      <div className='flex items-center justify-center w-1/2'>
        <Outlet />
      </div>
    </div>
  )
}

export default Authlayout;