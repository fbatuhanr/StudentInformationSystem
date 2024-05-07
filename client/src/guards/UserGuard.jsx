import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";


const UserGuard = ({ children }) => {

    const user = useAppSelector((state) => state.user)

    if(!user.username){a
        return <Navigate to="/login" />
    }

    return <>{children}</>;
};

export default UserGuard;