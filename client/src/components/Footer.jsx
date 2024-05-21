import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {

    return (
        <footer className="mt-20 md:mt-28 bg-gradient-to-t from-[#6841F2] to-[#0D0D0D1a] min-h-[200px]">
            <div className="max-w-4xl px-12 mx-auto">

                <nav className="pt-16 pb-8 flex flex-col gap-y-12 md:flex-row md:gap-x-8 justify-between">
                    <div>
                        <h6 className="mb-8 text-center md:text-start text-xl md:text-2xl font-semibold">Student Information System</h6>
                        <div className="grid grid-cols-2 grid-rows-2 md:text-start text-center gap-y-4 justify-center md:justify-start">
                            <h5 className="text-lg font-bold"><Link to="/">Home</Link></h5>
                            <h5 className="text-lg font-bold">About</h5>
                            <h5 className="text-lg font-bold"><Link to="/login">Login</Link></h5>
                            <h5 className="text-lg font-bold"><Link to="/signup">Sign up</Link></h5>
                        </div>
                    </div>
                    <div>
                        <h6 className="mb-4 md:mb-16 text-center md:text-end text-2xl md:text-2xl font-semibold">Join Our Newsletter</h6>
                        <div className="relative">
                            <input type="text" className="w-full ps-8 pe-24 py-2 rounded-full bg-[#0D0D0D] text-[#BBBBBB]" placeholder="write your email..." />
                            <button className="absolute right-0 px-4 py-2 rounded-full bg-[#F2D541]">Submit</button>
                        </div>
                    </div>
                </nav>

            </div>
        </footer>
    )
}

export default Footer