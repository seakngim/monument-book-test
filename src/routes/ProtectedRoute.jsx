import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    return localStorage.getItem('token') ? <Outlet/> : <Navigate to="/sign-in" />;
}
export default ProtectedRoute;