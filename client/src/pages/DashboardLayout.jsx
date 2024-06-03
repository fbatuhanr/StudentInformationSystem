import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import ellipseSmall from "../assets/ellipse-small.png"
import { PiStudent, PiStudentBold } from 'react-icons/pi'
import { FaCalendarCheck, FaRegCalendarCheck, FaUserGraduate, FaUserTie } from 'react-icons/fa'
import { SiGoogleclassroom } from 'react-icons/si'
import { IoFastFoodSharp } from 'react-icons/io5'
import { IoMdAnalytics } from 'react-icons/io'

const DashboardLayout = () => {
  return (
    <div className="py-8 flex flex-col gap-y-4 justify-center items-center bg-blur-ellipse-small bg-[center_top_-1rem] bg-[length:200px] bg-no-repeat">
      <div className="relative">
        <h1 className="text-5xl font-bold relative z-10">Dashboard</h1>
        <img src={ellipseSmall} className="w-72 absolute -top-20 left-0 right-0 mx-auto" />
      </div>
      <div className="relative w-full max-w-4xl rounded-xl bg-gradient-to-br from-[#4F22F2] to-[#20183F]">

        <nav id="dashboard-nav" className="w-full bg-[#29156C] rounded-t-xl">
          <ul className="flex justify-between h-full [&>li]:flex [&>li]:items-center [&>li]:px-5 [&>li]:py-2.5 text-[#B8B8B8] [&_a:hover]:text-white  [&_a.active]:text-white font-outfit font-bold">
            <li className="rounded-tl-xl">
              <NavLink to="/dashboard/overview" className="flex justify-center items-center gap-x-1.5">
                <span><IoMdAnalytics className="text-lg" /></span>
                <span>Overview</span>
              </NavLink>
            </li>
            <li className="!block">
              <h6 className="text-center flex justify-center items-center gap-x-1">
                <span><FaUserGraduate className="text-sm" /></span>
                <span> Student</span>
              </h6>
              <ul className="flex gap-x-2 justify-around">
                <li><NavLink to="/dashboard/browse-students">Browse</NavLink></li>
                <li><NavLink to="/dashboard/register-student">Register</NavLink></li>
              </ul>
            </li>
            <li className="!block">
              <h6 className="text-center flex justify-center items-center gap-x-1">
                <span><FaUserTie className="text-sm" /></span>
                <span>Teacher</span>
              </h6>
              <ul className="flex gap-x-2 justify-around">
                <li><NavLink to="/dashboard/browse-teachers">Browse</NavLink></li>
                <li><NavLink to="/dashboard/register-teacher">Register</NavLink></li>
              </ul>
            </li>
            <li>
              <NavLink to="/dashboard/classes" className="flex justify-center items-center gap-x-1.5">
                <span><SiGoogleclassroom className="text-lg" /></span>
                <span>Classes</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/attendance" className="flex justify-center items-center gap-x-1.5">
                <span><FaRegCalendarCheck className="text-lg" /></span>
                <span>Attendance</span>
              </NavLink>
            </li>
            <li className="rounded-tr-xl">
              <NavLink to="/dashboard/canteen" className="flex justify-center items-center gap-x-1.5">
                <span><IoFastFoodSharp className="text-lg" /></span>
                <span>Canteen</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div id="dashboard-content" className="h-[440px] overflow-x-hidden overflow-y-auto border-l-2 border-b-2 border-r-2 border-[#29156C] rounded-b-xl">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout