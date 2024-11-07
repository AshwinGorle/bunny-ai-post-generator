"use client"
import { FileClock, Home, Settings, WalletCards } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import UsageTrack from './UsageTrack'

function SideNav() {

    const MenuList=[
        {
            name:'Home',
            icon:Home,
            path:'/dashboard'
        },
        {
            name:'History',
            icon:FileClock,
            path:'/dashboard/history'
        },
        {
            name:'Billing',
            icon:WalletCards,
            path:'/dashboard/billing'
        },
        {
            name:'Setting',
            icon:Settings,
            path:'/dashboard/settings'
        },

    ]

    const path=usePathname();
    useEffect(()=>{
        console.log(path)
    },[])

return (
    <div className='h-screen relative p-5 shadow-sm  bg-black text-white '>
        <div className='flex justify-center'>
        <Image src={'/logo.svg'} alt='logo' width={120} height={100} />
        </div>
        <hr className='my-6 border-[#242424] ' />
        <div className='mt-11'>
            {MenuList.map((menu,index)=>(
                <Link href={menu.path} key={index}>

                    <div className={`flex gap-2 mb-2 p-3
                    hover:bg-gradient-to-r from-purple-400 via-pink-500 to-red-500  hover:text-white rounded-lg
                    cursor-pointer items-center
                    ${path==menu.path&&'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white'}
                    `}>
                        <menu.icon className='h-6 w-6'/>
                        <h2 className='text-lg'>{menu.name}</h2>
                    </div>
                </Link>

            ))}
        </div>
        <div className='absolute bottom-10 left-0 w-full'>
            <UsageTrack/>
        </div>
    </div>
)
}

export default SideNav