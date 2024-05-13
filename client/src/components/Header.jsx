import React from "react";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../redux/features/UserSlice";

const Header = () => {

    const dispatch = useDispatch();

    const user = useSelector(({ UserSlice }) => UserSlice.user);
    console.log(user)

    const handleLogout = async () => {
        dispatch(clearUserData());
    }

    return (
        <header className="bg-gradient-to-b from-[#4F22F2] to-[#0D0D0D1a] h-[140px] md:h-[130px]">
            <div className="max-w-6xl px-12 mx-auto">
                <nav className="flex items-center gap-x-8 py-8">
                    <div className="flex-1 text-xl md:text-3xl font-bold">
                        <Link to="/">Student Information System</Link>
                    </div>
                    {
                        !user.username ?
                            <>
                                <div className="text-2xl font-semibold">
                                    <Link to="/login">Login</Link>
                                </div>
                                <div className="text-2xl font-semibold">
                                    <Link to="/signup">Sign up</Link>
                                </div>
                            </>
                            :
                            <>
                                <div className="text-2xl font-semibold">
                                    <Link to="/dashboard/overview">Dashbord</Link>
                                </div>
                                <div className="relative">
                                    <div className="text-2xl font-semibold text-[#F52525]">
                                        <button type="button" onClick={handleLogout}>Logout</button>
                                    </div>
                                    <span className="absolute -right-2 -top-2 text-[0.7rem] italic text-[#ffffff62]">{user.username}</span>
                                </div>
                            </>
                    }
                </nav>
            </div>
        </header>
    )
}

export default Header