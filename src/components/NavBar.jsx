import React from 'react'
import {Link} from "react-router-dom"


const NavBar = () => {
  return (
     <nav className="w-full px-6 py-4 border-b flex items-center justify-between">
      <Link to="/" className="text-xl font-semibold">
        Blog App
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="hover:underline">
          Home
        </Link>

        <Link
          to="/admin/login"
          className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-gray-800"
        >
          Admin Login
        </Link>
      </div>
    </nav>
  )
}

export default NavBar