import React, { useState } from "react"
import "./App.css"

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom"

import LoadingSpinner from "./components/LoadingSpinner.jsx"

import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import Layout from "./Layout.jsx"

import AuthGuard from "./guards/AuthGuard.jsx"
import GuestGuard from "./guards/GuestGuard.jsx"

import DashboardLayout from "./pages/DashboardLayout.jsx"

import Overview from "./pages/Overview.jsx"

import BrowseStudents from "./pages/Student/BrowseStudents.jsx"
import EditStudent from "./pages/Student/EditStudent.jsx"
import RegisterStudent from "./pages/Student/RegisterStudent.jsx"

import BrowseTeachers from "./pages/Teacher/BrowseTeachers.jsx"
import EditTeacher from "./pages/Teacher/EditTeacher.jsx"
import RegisterTeacher from "./pages/Teacher/RegisterTeacher.jsx"

import Classes from "./pages/Classes.jsx"
import Attendance from "./pages/Attendance.jsx"
import Canteen from "./pages/Canteen.jsx"

import { useSelector } from "react-redux"
import Signup from "./pages/Signup.jsx"

function App() {

  const isLoading = useSelector(({ StatusSlice }) => StatusSlice.isLoading);

  return (
    <div className="bg-[#0D0D0D] text-white font-outfit overflow-x-hidden">
      <HashRouter>
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<GuestGuard><Login /></GuestGuard>} />
            <Route path="/signup" element={<GuestGuard><Signup /></GuestGuard>} />

            <Route path="/dashboard" element={<AuthGuard><DashboardLayout /></AuthGuard>}>
              <Route path="overview" element={<Overview />} />

              <Route path="browse-students" element={<BrowseStudents />} />
              <Route path="register-student" element={<RegisterStudent />} />
              <Route path="edit-student/:id" element={<EditStudent />} />

              <Route path="browse-teachers" element={<BrowseTeachers />} />
              <Route path="register-teacher" element={<RegisterTeacher />} />
              <Route path="edit-teacher/:id" element={<EditTeacher />} />

              <Route path="classes" element={<Classes />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="canteen" element={<Canteen />} />
            </Route>

          </Routes>
        </Layout>
        <Footer />
      </HashRouter>
      <ToastContainer autoClose={3000} pauseOnHover={false} />
      {
        // isLoading && <LoadingSpinner />
      }
    </div>
  );
}

export default App;