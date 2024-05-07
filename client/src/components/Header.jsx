import { Link } from "react-router-dom"

const Header = () => {

    // const user = useAppSelector((state) => state.user)
    // console.log(user)
    // const dispatch = useAppDispatch();

    const user = null

    const handleLogout = () => {

        // dispatch(clearUser());
    }

    return (
        <header className="bg-gradient-to-b from-[#4F22F2] to-[#0D0D0D1a] h-[140px] md:h-[130px]">
            <div className="max-w-6xl px-12 mx-auto">
                <nav className="flex items-center gap-x-8 py-8">
                    <div className="flex-1 text-xl md:text-3xl font-bold">
                        <Link to="/">Let's Chat Together</Link>
                    </div>
                    {
                        !user ?
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
                                    <Link to="/chat">Chat</Link>
                                </div>
                                <div className="text-2xl font-semibold">
                                    <Link to="/profile">Profile</Link>
                                </div>
                                <div className="text-2xl font-semibold text-[#F52525]">
                                    <button type="button" onClick={handleLogout}>Logout</button>
                                </div>
                            </>
                    }
                </nav>
            </div>
        </header>
    )
}

export default Header