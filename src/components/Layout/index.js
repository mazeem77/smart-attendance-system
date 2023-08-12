import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar'
import Loader from "../shared/loader";
import { useApp } from "@/context/app";

function Layout({ children }) {
  const app = useApp()
  const loading = app.loading

  return loading ? (<Loader />) : (
    <div className='bg-background dark:bg-darkBackground w-screen h-full min-h-screen'>
      <NavBar />
      {children}
    </div>
  )
}

export default Layout
