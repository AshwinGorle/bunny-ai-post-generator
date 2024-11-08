import { Search } from 'lucide-react'
import React from 'react'

function SearchSection({onSearchInput}:any) {
  return (
    <div className='p-10 bg-black flex flex-col justify-center items-center text-white'>

        <h2 className='text-6xl font-bold'>
             🐇 <span className='text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 
            text-transparent bg-clip-text animate-gradient-slow shadow-lg relative overflow-hidden sparkle'> Hop Around Bunny's Templates</span> 
        </h2>
        <p className='text-2xl text-gray-300 mt-4 animate-fade-in'>
            What would you like to create today? 📝✨
        </p>

        <div className='w-full  flex justify-center'>
            <div className='flex gap-2 items-center
            p-2 border border-[#242424] rounded-md bg-[#0a0a0a] my-5 w-[50%]'>
                <Search className='text-[#d3d3d3]' />
                <input type="text" placeholder='Search for your next big idea... 🐰'  
                onChange={(event)=>onSearchInput(event.target.value)}
                className='bg-transparent w-full outline-none text-white'
                />
            </div>
        </div>
    </div>
  )
}

export default SearchSection
