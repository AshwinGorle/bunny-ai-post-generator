"use client"
import { Button } from '@/components/ui/button'
import React from 'react'

function CopyButton({aiResponse}:any) {
  return (
    <div>
          <Button variant='ghost' className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white'
          onClick={()=>navigator.clipboard.writeText(aiResponse)}
                >Copy</Button>
    </div>
  )
}

export default CopyButton