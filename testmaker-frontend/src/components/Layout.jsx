import React from 'react';
import { Outlet } from 'react-router-dom'

import Header from './Header.jsx'

const Layout = () => {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default Layout