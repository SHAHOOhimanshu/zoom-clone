import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
import React,{ReactNode} from 'react'

export const metadata: Metadata = {
  title: "Poom",
  description: "Video calling app",
  icons: {
    icon: '/icons/logo.svg'
  }
};

//now whole application now website connect through video calling fuction route
const Rootlayout = ({children}:{children:ReactNode}) => {
  return (
    <main>
    
    <StreamVideoProvider>
       {children}
    </StreamVideoProvider>

      
    </main>
  )
}

export default Rootlayout
