import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const Protectedroute = () => {
    const islogin=sessionStorage.getItem("islogin");
    console.log(islogin)
  return (
    <div>
      {islogin?<Outlet/>:<Navigate to="/login"/>}
    </div>
  )
}

export default Protectedroute
