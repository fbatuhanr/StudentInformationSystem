import React from "react"
import "./App.css"

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import Layout from "./Layout.jsx"
import Dashboard from "./pages/Dashboard.jsx"

import AuthGuard from "./guards/AuthGuard.jsx"
import GuestGuard from "./guards/GuestGuard.jsx"


function App() {

  return (
    <div className="bg-[rgb(13,13,13)] text-white font-outfit overflow-x-hidden">
      <Router>
        <Header />
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
            <Route path="/login" element={<GuestGuard><Login /></GuestGuard>} />
          </Routes>
        </Layout>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;