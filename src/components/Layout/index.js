import React from 'react'
import NavBar from '../NavBar'
import spinner from '../../../public/images/svg/spinner.svg'
import Image from "next/image";
import { useApp } from "@/context/app";

function Layout({ children }) {
  const app = useApp()
  const loading = app.loading

  return loading ? (<div className="flex justify-center items-center h-full min-h-screen w-full">
    <div className="flex justify-center items-center h-full w-full">
      <Image className="w-16" src={spinner} alt="spinnerLogo" priority />
    </div>
  </div>) : (
    <div className='bg-background dark:bg-darkBackground w-screen h-full min-h-screen'>
      <NavBar />
      {children}
    </div>
  )
}

export default Layout
