import { UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import React from 'react'
import {dark} from "@clerk/themes";

function Header() {
  return (
    <div className='p-5 shadow-sm bg-black flex justify-between items-center'>
      <div className='flex gap-2 items-center border-[#242424] 
      p-2 rounded-md max-w-lg bg-[#0a0a0a] '>
        {/* <Search color='white '/>
        <input type='text' placeholder='Search...'
        className='outline-none text-white bg-[#0a0a0a] '
        /> */}
      </div>
      <div className='flex gap-5 items-center'>
        <h2 className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-1 rounded-full text-sm text-white px-2'>
        🐰 Need help? Bunny’s got your back! 🌟</h2>  
      <UserButton appearance={{baseTheme:dark}} />
      </div>
    </div>
  )
}

export default Header