import React from "react";
import ReactDOM from "react-dom/client";

import './style.css';
import App from "./App.jsx"

import { Provider } from "react-redux";
import { persistor, store } from '../src/redux/app/store'
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);