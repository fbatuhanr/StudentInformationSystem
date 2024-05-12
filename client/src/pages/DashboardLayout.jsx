import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <form onSubmit={null}>
      <div className="py-8 flex flex-col gap-y-6 justify-center items-center bg-blur-ellipse-small bg-[center_top_-1rem] bg-[length:200px] bg-no-repeat">
        <div>
          <h1 className="text-5xl font-bold">Dashboard</h1>
        </div>
        <div className="relative w-full max-w-4xl h-[400px] rounded-xl bg-gradient-to-br from-[#4F22F2] to-[#20183F]">

          <nav id="dashboard-nav" className="w-full bg-[#29156C] rounded-t-xl">
            <ul className="flex justify-between h-full [&>li]:flex [&>li]:items-center [&>li]:px-4 [&>li]:py-2 text-[#B8B8B8] [&_a:hover]:text-white [&>li:hover]:bg-[#341C8B] [&_a.active]:text-white font-outfit font-bold">
              <li className="rounded-tl-xl"><NavLink to="/dashboard/overview">Overview</NavLink></li>
              <li className="!block">
                <h6 className="text-center">Student</h6>
                <ul className="flex gap-x-2 justify-around">
                  <li><NavLink to="/dashboard/browse-student">Browse</NavLink></li>
                  <li><NavLink to="/dashboard/register-student">Register</NavLink></li>
                </ul>
              </li> 
              <li className="!block">
                <h6 className="text-center">Teacher</h6>
                <ul className="flex gap-x-2 justify-around">
                  <li><NavLink to="/dashboard/browse-teacher">Browse</NavLink></li>
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
    </form>
  )
}

export default DashboardLayout