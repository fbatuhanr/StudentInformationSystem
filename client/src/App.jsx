import React from "react"
import "./App.css"

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom"

import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import Layout from "./Layout.jsx"

import AuthGuard from "./guards/AuthGuard.jsx"
import GuestGuard from "./guards/GuestGuard.jsx"

import DashboardLayout from "./pages/DashboardLayout.jsx"

import Dashboard from "./pages/Dashboard.jsx"

import BrowseStudent from "./pages/BrowseStudent.jsx"
import RegisterStudent from "./pages/RegisterStudent.jsx"

import BrowseTeacher from "./pages/BrowseTeacher.jsx"
import RegisterTeacher from "./pages/RegisterTeacher.jsx"
import Classes from "./pages/Classes.jsx"
import Attendance from "./pages/Attendance.jsx"
import Canteen from "./pages/Canteen.jsx"


function App() {

  return (
    <div className="bg-[rgb(13,13,13)] text-white font-outfit overflow-x-hidden">
      <HashRouter>
        <Header />
        <Layout>
          <Routes>
            <Route path="/login" element={<GuestGuard><Login /></GuestGuard>} />

            <Route path="/dashboard" element={<AuthGuard><DashboardLayout /></AuthGuard>}>
              <Route path="overview" element={<Dashboard />} />

              <Route path="browse-student" element={<BrowseStudent />} />
              <Route path="register-student" element={<RegisterStudent />} />

              <Route path="browse-teacher" element={<BrowseTeacher />} />
              <Route path="register-teacher" element={<RegisterTeacher />} />

              <Route path="classes" element={<Classes />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="canteen" element={<Canteen />} />
            </Route>

          </Routes>
        </Layout>
        <Footer />
      </HashRouter>
      <ToastContainer />
    </div>
  );
}

export default App;