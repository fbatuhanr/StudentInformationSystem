import React from "react"
import './App.css';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./redux/app/store"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Layout from "./Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import AuthGuard from "./guards/AuthGuard.jsx";
import GuestGuard from "./guards/GuestGuard.jsx";

function App() {

  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}

export default App;
