import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";

const GuestGuard = ({ children }) => {

    const user = useAppSelector((state) => state.user)

    if (user.username) {
        return <Navigate to="/" />
    }

    return <>{children}</>;
};

export default GuestGuard;