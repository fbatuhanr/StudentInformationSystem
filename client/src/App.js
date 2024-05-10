import React from "react"
import './App.css';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";


import { Provider } from "react-redux";
import { persistor, store } from '../src/redux/app/store.js'
import { PersistGate } from "redux-persist/es/integration/react.js";

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="bg-[rgb(13,13,13)] text-white font-outfit overflow-x-hidden">
          <Router>
            <Header />
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Layout>
            <Footer />
          </Router>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
