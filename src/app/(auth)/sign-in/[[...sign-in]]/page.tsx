import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <div className='glassmorphism-auth'>
      <SignIn />
    </div>
  )
}

export default SignInPage