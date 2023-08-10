import React, { useState } from 'react'
import NavBar from '../NavBar'
import Loader from "../shared/loader";

function Layout({ children }) {
  const [loading, setLoading] = useState(false)

  return loading ? (<Loader />) : (
    <div className='bg-background dark:bg-darkBackground w-screen h-full min-h-screen'>
      <NavBar />
      {children}
    </div>
  )
}

export default Layout
