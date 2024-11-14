import { UserProfile } from '@clerk/nextjs'
import React from 'react'

// @ts-ignore
import { dark } from '@clerk/themes'

function Settings() {
  return (
    <div className='flex items-center justify-center h-full'>
        <UserProfile appearance={{baseTheme : dark}}   routing="hash" />
    </div>
  )
}

export default Settings