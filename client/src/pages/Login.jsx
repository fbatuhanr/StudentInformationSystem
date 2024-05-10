import React, { useState } from 'react'

import axios from 'axios';
import { serverAddress } from '../settings';

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearUserData, setUser } from "../redux/features/UserSlice";
import { toast } from 'react-toastify';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("123");

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(username)
        console.log(password)

        axios.post(`${serverAddress}/login`, {username, password})
             .then((response) => {

                console.log(response.data);
                if(response.data !== true){
                    toast.error("Login failed!");
                }
                else {
                    toast.success("Login successful!");
                    dispatch(setUser({username}));
                }
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="py-8 flex flex-col gap-y-6 justify-center items-center bg-blur-ellipse-small bg-[center_top_-1rem] bg-[length:200px] bg-no-repeat">
                <div>
                    <h1 className="text-5xl font-bold">Principal Login</h1>
                </div>
                <div className="relative w-11/12 md:w-full max-w-3xl h-[400px] px-4 md:px-8 rounded-xl bg-gradient-to-br from-[#4F22F2] to-[#20183F]">
                    <div className="md:ps-24 w-full px-1 md:w-3/4 flex flex-col gap-y-3 h-full justify-center">
                        <div className="flex flex-col gap-y-1">
                            <label htmlFor="username" className="text-2xl font-semibold ps-2">Username</label>
                            <input type="text" className="bg-[#0D0D0D] rounded-2xl px-6 py-4" placeholder="type here..."
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <label htmlFor="password" className="text-2xl font-semibold ps-2">Password</label>
                            <input type="password" className="bg-[#0D0D0D] rounded-2xl px-6 py-4" placeholder="type here..."
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>
                        <button type="submit" className="mt-4 bg-[#DBBA12] rounded-2xl py-3 text-2xl [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-[#0D0D0D]">
                            Submit
                        </button>
                    </div>
                    <div className="absolute top-4 -right-24 mr-2 md:-right-20 md:-mr-0.5">
                        <img src={null} className="w-56" />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Login