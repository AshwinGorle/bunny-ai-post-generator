import { UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div className='p-5 shadow-sm bg-black flex justify-between items-center'>
      <div className='flex gap-2 items-center border-[#242424] 
      p-2 rounded-md max-w-lg bg-[#0a0a0a] '>
        <Search color='white '/>
        <input type='text' placeholder='Search...'
        className='outline-none text-white bg-[#0a0a0a] '
        />
      </div>
      <div className='flex gap-5 items-center'>
        <h2 className='bg-primary p-1 rounded-full text-sm text-white px-2'>
        🔥 Join Membership just for Rs.99/Month</h2>
      <UserButton/>
      </div>
    </div>
  )
}

export default Header