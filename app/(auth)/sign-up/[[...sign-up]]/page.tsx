import React from 'react'
import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div>
        <main className="flex h-screen w-full items-center justify-center">
            <SignUp />
        </main>
    </div>
  )
}

export default SignUpPage
