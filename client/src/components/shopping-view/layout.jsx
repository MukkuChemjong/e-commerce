import React from 'react'
import ShopHeader from './header'
import { Outlet } from 'react-router-dom'

const Shoppinglayout = () => {
  return (
    <div className='flex flex-col'>
      <ShopHeader />
      <main  className='flex flex-col w-full'>
        <Outlet />
      </main>
    </div>
  )
}

export default Shoppinglayout