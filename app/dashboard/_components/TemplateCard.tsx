import React from 'react'
import { TEMPLATE } from './TemplateListSection'
import Image from 'next/image'
import Link from 'next/link'
// [#1d2a53] gray color
function TemplateCard(item:TEMPLATE) {
  return (
    <Link href={'/dashboard/content/'+item?.slug}>
      <div className='p-5 shadow-md border border-gray-600 rounded-lg bg-[#1e1e1f] text-white
      flex flex-col gap-3  cursor-pointer h-full hover:scale-105 transition-all
      hover:bg-black hover:border hover:border-white hover:shadow-gray-500'>
          <Image src={item.icon} alt='icon' 
          width={50} height={50} />
          <h2 className='font-medium text-lg text-white'>{item.name}</h2>
          <p className='text-white line-clamp-3'>{item.desc}</p>
      </div>
    </Link>
  )
}

export default TemplateCard