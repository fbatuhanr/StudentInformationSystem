import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import ellipseSmall from "../assets/ellipse-small.png"

const DashboardLayout = () => {
  return (
    <div className="py-8 flex flex-col gap-y-6 justify-center items-center bg-blur-ellipse-small bg-[center_top_-1rem] bg-[length:200px] bg-no-repeat">
      <div className="relative">
        <h1 className="text-5xl font-bold relative z-10">Dashboard</h1>
        <img src={ellipseSmall} className="w-72 absolute -top-20 left-0 right-0 mx-auto" />
      </div>
      <div className="relative w-full max-w-4xl min-h-[400px] rounded-xl bg-gradient-to-br from-[#4F22F2] to-[#20183F]">

        <nav id="dashboard-nav" className="w-full bg-[#29156C] rounded-t-xl">
          <ul className="flex justify-between h-full [&>li]:flex [&>li]:items-center [&>li]:px-5 [&>li]:py-2.5 text-[#B8B8B8] [&_a:hover]:text-white  [&_a.active]:text-white font-outfit font-bold">
            <li className="rounded-tl-xl"><NavLink to="/dashboard/overview">Overview</NavLink></li>
            <li className="!block">
              <h6 className="text-center">Student</h6>
              <ul className="flex gap-x-2 justify-around">
                <li><NavLink to="/dashboard/browse-students">Browse</NavLink></li>
                <li><NavLink to="/dashboard/register-student">Register</NavLink></li>
              </ul>
            </li>
            <li className="!block">
              <h6 className="text-center">Teacher</h6>
              <ul className="flex gap-x-2 justify-around">
                <li><NavLink to="/dashboard/browse-teachers">Browse</NavLink></li>
                <li><NavLink to="/dashboard/register-teacher">Register</NavLink></li>
              </ul>
            </li>
            <li><NavLink to="/dashboard/classes">Classes</NavLink></li>
            <li><NavLink to="/dashboard/attendance">Attendance</NavLink></li>
            <li className="rounded-tr-xl"><NavLink to="/dashboard/canteen">Canteen</NavLink></li>
          </ul>
        </nav>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout